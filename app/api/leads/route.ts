import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getEspoCRMClient } from "@/lib/espocrm"
import { sendLeadNotification } from "@/lib/email"

export async function POST(request: Request) {
  try {
    console.log("[v0] Lead submission started")
    const body = await request.json()
    console.log("[v0] Request body received:", { ...body, photos: body.photos?.length || 0 })

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
      console.log("[v0] Validation failed: missing name or email")
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

    console.log("[v0] Saving to Supabase...")
    const supabase = await createClient()

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
      console.error("[v0] Supabase error:", error)
      return NextResponse.json({ error: "Failed to submit lead: " + error.message }, { status: 500 })
    }

    console.log("[v0] Lead saved to Supabase successfully:", data[0]?.id)

    try {
      console.log("[v0] Sending email notification...")
      const emailResult = await sendLeadNotification({
        name,
        email,
        phone,
        company,
        service_interest: serviceInterest,
        message: detailedMessage,
      })

      if (emailResult.success) {
        console.log("[v0] Email sent successfully")
      } else {
        console.error("[v0] Email failed:", emailResult.error)
      }
    } catch (emailError) {
      console.error("[v0] Email send exception:", emailError)
    }

    try {
      console.log("[v0] Syncing to EspoCRM...")
      const espoCRM = getEspoCRMClient()
      const crmResult = await espoCRM.createLead({
        name,
        email,
        phone,
        company,
        service_interest: serviceInterest,
        message: detailedMessage,
      })
      console.log("[v0] Lead synced to EspoCRM successfully:", crmResult.id)
    } catch (espoCRMError) {
      console.error("[v0] EspoCRM sync failed (non-fatal):", espoCRMError)
    }

    console.log("[v0] Lead submission completed successfully")
    return NextResponse.json({ success: true, data: data[0] }, { status: 201 })
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json(
      { error: "Internal server error: " + (error instanceof Error ? error.message : "Unknown error") },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    const supabase = await createClient()

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
