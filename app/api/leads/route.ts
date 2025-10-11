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
      photos,
      otherProjectType,
      projectScope,
      squareFootage,
      numberOfRooms,
      specificDate,
      flexibility,
      estimateMethod,
      preferredContactTime,
      additionalDetails,
      address,
      city,
      source,
    } = body

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    const serviceInterest =
      service_interest ||
      (Array.isArray(projectType)
        ? projectType.join(", ") + (otherProjectType ? `, ${otherProjectType}` : "")
        : `${projectType ? `${projectType} - ` : ""}${serviceType || "General enquiry"}`)

    const detailedMessage =
      message ||
      `${projectScope ? `Project Description: ${projectScope}\n\n` : ""}${
        Array.isArray(projectType)
          ? `Services Needed: ${projectType.join(", ")}${otherProjectType ? `, ${otherProjectType}` : ""}\n`
          : `Project Type: ${projectType || "Not specified"}\n`
      }${serviceType ? `Service: ${serviceType}\n` : ""}${squareFootage ? `Square Footage: ${squareFootage}\n` : ""}${numberOfRooms ? `Number of Rooms: ${numberOfRooms}\n` : ""}${propertySize ? `Property Size: ${propertySize}\n` : ""}${timeline ? `Timeline: ${timeline}${specificDate ? ` (${specificDate})` : ""}\n` : ""}${flexibility ? `Scheduling Notes: ${flexibility}\n` : ""}${budget ? `Budget: ${budget}\n` : ""}${estimateMethod ? `Preferred Estimate Method: ${estimateMethod}\n` : ""}${preferredContactTime ? `Best Contact Time: ${preferredContactTime}\n` : ""}${address ? `Project Address: ${address}, ${city || ""}\n` : ""}${photos && photos.length > 0 ? `\nPhotos Uploaded (${photos.length}):\n${photos.map((p: any) => p.url).join("\n")}\n` : ""}${additionalDetails ? `\nAdditional Details:\n${additionalDetails}` : ""}${message ? `\n\nOriginal Message:\n${message}` : ""}`

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
          source: source || "interactive_questionnaire",
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
