import path from "node:path"
import { config } from "dotenv"

config({ path: path.resolve(process.cwd(), ".env.local") })

async function main() {
  const { sendLeadNotification, sendLeadAutoReply } = await import("../../lib/email")

  const brandKey = (process.argv[2] as "wildrose" | "kylife" | "kygroup" | "edmontoncars") || "wildrose"

  const lead = {
    name: `${brandKey.toUpperCase()} System Check`,
    email: "kyoussef6994@gmail.com",
    phone: "(587) 501-6994",
    company: `${brandKey.toUpperCase()} QA`,
    service_interest: "Brand verification",
    message: `Confirming Gmail delivery for the ${brandKey} brand via production credentials.`,
    brandKey,
  }

  console.log(`[live-check] Sending notification + auto-reply for ${brandKey} brand using configured SMTP credentials...`)
  const [notification, autoReply] = await Promise.all([sendLeadNotification(lead), sendLeadAutoReply(lead)])

  console.log(`[live-check] Notification result (${brandKey}):`, notification)
  console.log(`[live-check] Auto-reply result (${brandKey}):`, autoReply)
}

main().catch((error) => {
  console.error("[live-check] Failed to send live test lead", error)
  process.exit(1)
})
