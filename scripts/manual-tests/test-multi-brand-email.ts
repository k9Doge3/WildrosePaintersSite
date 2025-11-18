import nodemailer, { type TestAccount } from "nodemailer"
import type { BrandKey } from "../../lib/brands"

const brandsToTest: BrandKey[] = ["wildrose", "kylife", "kygroup", "edmontoncars"]

async function configureTestMailer(): Promise<TestAccount> {
  const testAccount = await nodemailer.createTestAccount()

  process.env.SMTP_EMAIL = testAccount.user
  process.env.SMTP_PASSWORD = testAccount.pass
  process.env.SMTP_HOST = testAccount.smtp.host
  process.env.SMTP_PORT = String(testAccount.smtp.port)
  process.env.SMTP_SECURE = String(Boolean(testAccount.smtp.secure))
  process.env.CONTACT_FORM_TO = testAccount.user
  process.env.CONTACT_FORM_FROM = `QA Harness <${testAccount.user}>`

  return testAccount
}

async function sendForBrand(brandKey: BrandKey, leadOverrides: Partial<{ service_interest: string; company: string }>, testAccount: nodemailer.TestAccount) {
  const { sendLeadNotification, sendLeadAutoReply } = await import("../../lib/email")

  const lead = {
    name: `${brandKey.toUpperCase()} Test Lead`,
    email: testAccount.user,
    phone: "(555) 111-2222",
    company: leadOverrides.company ?? `${brandKey} QA Inc.`,
    service_interest: leadOverrides.service_interest ?? "General inquiry",
    message: `Checking notification + auto-reply rendering for the ${brandKey} brand configuration.`,
    brandKey,
  }

  const [notification, autoReply] = await Promise.all([sendLeadNotification(lead), sendLeadAutoReply(lead)])

  return { notification, autoReply }
}

async function main() {
  const testAccount = await configureTestMailer()

  for (const brandKey of brandsToTest) {
    console.log(`\n=== Testing ${brandKey} brand ===`)
    const result = await sendForBrand(brandKey, {}, testAccount)

    const cases = [
      { label: "Admin notification", outcome: result.notification },
      { label: "Lead auto-reply", outcome: result.autoReply },
    ]

    for (const current of cases) {
      if (current.outcome.success) {
        const previewUrl = nodemailer.getTestMessageUrl(current.outcome.data)
        console.log(`✔ ${current.label} sent (messageId: ${current.outcome.data.messageId})`)
        console.log(`   Preview: ${previewUrl}`)
      } else {
        console.error(`✖ ${current.label} failed`, current.outcome.error)
      }
    }
  }
}

main().catch((error) => {
  console.error("Email verification script failed", error)
  process.exit(1)
})
