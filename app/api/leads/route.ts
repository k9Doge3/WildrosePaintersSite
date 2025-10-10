import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { getEspoCRMClient } from "@/lib/espocrm"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      phone,
      company,
      projectType,
      serviceType,
      propertySize,
      timeline,
      budget,
      service_interest,
      message,
    } = body

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    const serviceInterest =
      service_interest || `${projectType ? `${projectType} - ` : ""}${serviceType || "General inquiry"}`

    const detailedMessage =
      message ||
      `Project Type: ${projectType || "Not specified"}
Service: ${serviceType || "Not specified"}
Property Size: ${propertySize || "Not specified"}
Timeline: ${timeline || "Not specified"}
Budget: ${budget || "Not specified"}

Additional Notes: ${message || "None"}`

    const supabase = await getSupabaseServerClient()

    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          name,
          email,
          phone: phone || null,
          company: company || null,
          service_interest: serviceInterest,
          message: detailedMessage,
          source: "interactive_questionnaire",
          status: "new",
        },
      ])
      .select()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to submit lead" }, { status: 500 })
    }

    try {
      const espoCRM = getEspoCRMClient()
      await espoCRM.createLead({
        name,
        email,
        phone,
        company,
        service_interest: serviceInterest,
        message: detailedMessage,
      })
      console.log("[v0] Lead synced to EspoCRM with auto-response sent")
    } catch (espoCRMError) {
      console.error("[v0] EspoCRM sync failed:", espoCRMError)
    }

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const supabase = await getSupabaseServerClient()

    const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 })
    }

    return NextResponse.json({ leads: data }, { status: 200 })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
