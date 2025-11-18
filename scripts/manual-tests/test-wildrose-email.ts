import nodemailer from "nodemailer"

async function run() {
  const testAccount = await nodemailer.createTestAccount()

  process.env.SMTP_EMAIL = testAccount.user
  process.env.SMTP_PASSWORD = testAccount.pass
  process.env.SMTP_HOST = testAccount.smtp.host
  process.env.SMTP_PORT = String(testAccount.smtp.port)
  process.env.SMTP_SECURE = String(Boolean(testAccount.smtp.secure))
  process.env.CONTACT_FORM_TO = testAccount.user
  process.env.CONTACT_FORM_FROM = `WildRose QA <${testAccount.user}>`

  const { sendLeadNotification, sendLeadAutoReply } = await import("../../lib/email")

  const testLead = {
    name: "Casey Wildrose",
    email: testAccount.user,
    phone: "(555) 111-2222",
    company: "Wild QA Co",
    service_interest: "Exterior repaint",
    message: "Testing automated notifications for the WildRose brand.",
    brandKey: "wildrose" as const,
  }

  const notification = await sendLeadNotification(testLead)
  const autoReply = await sendLeadAutoReply(testLead)

  const cases = [
    { label: "Admin notification", result: notification },
    { label: "Lead auto-reply", result: autoReply },
  ]

  for (const current of cases) {
    if (current.result.success) {
      const previewUrl = nodemailer.getTestMessageUrl(current.result.data)
      console.log(`✔ ${current.label} sent (messageId: ${current.result.data.messageId})`)
      console.log(`   Preview: ${previewUrl}`)
    } else {
      console.error(`✖ ${current.label} failed`, current.result.error)
    }
  }
}

run().catch((error) => {
  console.error("Test harness crashed", error)
  process.exit(1)
})
