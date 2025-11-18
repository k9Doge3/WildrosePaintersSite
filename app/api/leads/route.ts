import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getEspoCRMClient } from "@/lib/espocrm"
import { sendLeadNotification, sendLeadAutoReply } from "@/lib/email"
import { resolveBrandConfig } from "@/lib/brands"

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
      brand,
      brandKey,
    } = body

    const hostHeader = request.headers.get("x-forwarded-host") ?? request.headers.get("host")
    const refererHeader = request.headers.get("referer") ?? request.headers.get("origin")
    const brandConfig = resolveBrandConfig({ brandHint: brand || brandKey, host: hostHeader, referer: refererHeader, source })
    const resolvedBrandKey = brandConfig.key
    console.log("[v0] Resolved brand context:", brandConfig.displayName)

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

    let savedLeadId: string | null = null
    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (supabaseUrl && supabaseAnonKey) {
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
      } else {
        savedLeadId = data[0]?.id ?? null
        console.log("[v0] Lead saved to Supabase successfully:", savedLeadId)
      }
    } else {
      console.warn("[v0] Supabase credentials missing, skipping Supabase insert")
    }

    try {
      console.log("[v0] Sending email notification + auto-reply...")
      const [notificationResult, autoReplyResult] = await Promise.allSettled([
        sendLeadNotification({
          name,
          email,
          phone,
          company,
          service_interest: serviceInterest,
          message: detailedMessage,
          brandKey: resolvedBrandKey,
        }),
        sendLeadAutoReply({
          name,
          email,
          service_interest: serviceInterest,
          message: detailedMessage,
          brandKey: resolvedBrandKey,
        }),
      ])

      if (notificationResult.status === "fulfilled" && notificationResult.value.success) {
        console.log("[v0] Admin notification sent successfully")
      } else {
        console.error("[v0] Admin notification failed:", notificationResult)
      }

      if (autoReplyResult.status === "fulfilled" && autoReplyResult.value.success) {
        console.log("[v0] Auto-reply sent successfully")
      } else {
        console.error("[v0] Auto-reply failed:", autoReplyResult)
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
        brandKey: resolvedBrandKey,
      })
      console.log("[v0] Lead synced to EspoCRM successfully:", crmResult.id)
    } catch (espoCRMError) {
      console.error("[v0] EspoCRM sync failed (non-fatal):", espoCRMError)
    }

    console.log("[v0] Lead submission completed successfully")
    return NextResponse.json({ success: true, leadId: savedLeadId }, { status: 201 })
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
    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn("[v0] Supabase credentials missing, cannot fetch leads")
      return NextResponse.json(
        { error: "Supabase is not configured on this environment" },
        { status: 503 },
      )
    }

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
