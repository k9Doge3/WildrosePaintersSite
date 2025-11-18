import nodemailer from "nodemailer"
import { render } from "@react-email/render"
import { LeadAutoReplyTemplate, LeadEmailTemplate } from "@/components/emails/lead-notification"
import { resolveBrandConfig, type BrandConfig, type BrandKey } from "@/lib/brands"

type LeadPayload = {
  name: string
  email: string
  phone?: string | null
  company?: string | null
  service_interest?: string | null
  message?: string | null
  brandKey?: BrandKey | string
}

const smtpEmail = process.env.SMTP_EMAIL
const smtpPassword = process.env.SMTP_PASSWORD
const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com"
const smtpPort = Number(process.env.SMTP_PORT || 465)
const smtpSecure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : smtpPort === 465

const transporter =
  smtpEmail && smtpPassword
    ? nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpEmail,
          pass: smtpPassword,
        },
      })
    : null

const adminRecipient = process.env.CONTACT_FORM_TO || process.env.ADMIN_EMAIL || smtpEmail
const fallbackFromLabel =
  process.env.CONTACT_FORM_FROM || `WildRose Painters <${smtpEmail ?? "no-reply@wildrosepainters.ca"}>`

function ensureTransporter() {
  if (!transporter) {
    throw new Error("SMTP credentials are not configured. Set SMTP_EMAIL and SMTP_PASSWORD in your environment.")
  }
  return transporter
}

function buildLeadPlainText(lead: LeadPayload, brand: BrandConfig) {
  return [
    `${brand.displayName} lead notification`,
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    lead.phone ? `Phone: ${lead.phone}` : null,
    lead.company ? `Company: ${lead.company}` : null,
    lead.service_interest ? `Service Interest: ${lead.service_interest}` : null,
    lead.message ? `\n${lead.message}` : null,
  ]
    .filter(Boolean)
    .join("\n")
}

export async function sendLeadNotification(lead: LeadPayload) {
  try {
    const mailer = ensureTransporter()
    const brand = resolveBrandConfig({ brandHint: lead.brandKey })
    const html = await render(LeadEmailTemplate({ lead, brand }))
    const text = buildLeadPlainText(lead, brand)
    const toAddress = adminRecipient || smtpEmail

    if (!toAddress) {
      throw new Error("No CONTACT_FORM_TO, ADMIN_EMAIL, or SMTP_EMAIL configured for lead routing")
    }

    const data = await mailer.sendMail({
      from: brand.defaultFromLabel || fallbackFromLabel,
      to: toAddress,
      replyTo: lead.email,
      subject: `[${brand.shortName}] New Lead: ${lead.name} - ${lead.service_interest || "General Inquiry"}`,
      html,
      text,
    })

    console.log("[v0] Lead notification sent via SMTP:", data.messageId)
    return { success: true, data }
  } catch (error) {
    console.error("[v0] Email send exception:", error)
    return { success: false, error }
  }
}

export async function sendLeadAutoReply(lead: LeadPayload) {
  try {
    const mailer = ensureTransporter()
    const brand = resolveBrandConfig({ brandHint: lead.brandKey })
    const html = await render(LeadAutoReplyTemplate({ lead, brand }))
    const firstName = lead.name?.split(" ")[0] || "there"
    const serviceLine = lead.service_interest ? ` about ${lead.service_interest}` : ""
    const text = `Hey ${firstName},\n\nThanks for reaching out${serviceLine} to ${brand.displayName}. We'll review the details and reply ${brand.responseTime}. You can reply to this email anytime or call ${brand.supportPhone} for urgent items.\n\n- ${brand.displayName} (${brand.websiteUrl})`

    const data = await mailer.sendMail({
      from: brand.defaultFromLabel || fallbackFromLabel,
      to: lead.email,
      subject: `${brand.displayName} received your request`,
      html,
      text,
    })

    console.log("[v0] Lead auto-reply sent via SMTP:", data.messageId)
    return { success: true, data }
  } catch (error) {
    console.error("[v0] Auto-reply send exception:", error)
    return { success: false, error }
  }
}
