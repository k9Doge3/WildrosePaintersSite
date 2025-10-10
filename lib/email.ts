import { Resend } from "resend"
import { LeadEmailTemplate } from "@/components/emails/lead-notification"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendLeadNotification(lead: {
  name: string
  email: string
  phone?: string | null
  company?: string | null
  service_interest?: string | null
  message?: string | null
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: "WildRose Painters <leads@wildrosepainters.ca>",
      to: process.env.ADMIN_EMAIL || "admin@wildrosepainters.ca",
      subject: `New Lead: ${lead.name} - ${lead.service_interest || "General Inquiry"}`,
      react: LeadEmailTemplate({ lead }),
      replyTo: lead.email,
    })

    if (error) {
      console.error("[v0] Email send error:", error)
      return { success: false, error }
    }

    console.log("[v0] Email sent successfully:", data)
    return { success: true, data }
  } catch (error) {
    console.error("[v0] Email send exception:", error)
    return { success: false, error }
  }
}
