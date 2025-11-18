import * as React from "react"
import { Body, Container, Head, Heading, Html, Preview, Section, Text, Hr } from "@react-email/components"
import type { BrandConfig } from "@/lib/brands"

interface LeadFields {
  name: string
  email: string
  phone?: string | null
  company?: string | null
  service_interest?: string | null
  message?: string | null
}

interface LeadEmailTemplateProps {
  lead: LeadFields
  brand: BrandConfig
}

export function LeadEmailTemplate({ lead, brand }: LeadEmailTemplateProps) {
  const headingStyle = { ...h1, color: brand.colors.primary }
  const footerText = brand.portalUrl
    ? `View all leads in your portal at ${brand.portalUrl}`
    : `Visit ${brand.websiteUrl.replace(/^https?:\/\//, "")}`

  return (
    <Html>
      <Head />
      <Preview>New lead from {lead.name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={headingStyle}>{brand.displayName} · New Request</Heading>

          <Section style={section}>
            <Text style={label}>Name:</Text>
            <Text style={value}>{lead.name}</Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Email:</Text>
            <Text style={value}>{lead.email}</Text>
          </Section>

          {lead.phone && (
            <Section style={section}>
              <Text style={label}>Phone:</Text>
              <Text style={value}>{lead.phone}</Text>
            </Section>
          )}

          {lead.company && (
            <Section style={section}>
              <Text style={label}>Company:</Text>
              <Text style={value}>{lead.company}</Text>
            </Section>
          )}

          {lead.service_interest && (
            <Section style={section}>
              <Text style={label}>Service Interest:</Text>
              <Text style={value}>{lead.service_interest}</Text>
            </Section>
          )}

          {lead.message && (
            <>
              <Hr style={hr} />
              <Section style={section}>
                <Text style={label}>Message:</Text>
                <Text style={message}>{lead.message}</Text>
              </Section>
            </>
          )}

          <Hr style={hr} />
          <Text style={footer}>{footerText}</Text>
        </Container>
      </Body>
    </Html>
  )
}

interface LeadAutoReplyTemplateProps {
  lead: Pick<LeadFields, "name" | "service_interest" | "message">
  brand: BrandConfig
}

export function LeadAutoReplyTemplate({ lead, brand }: LeadAutoReplyTemplateProps) {
  const primary = brand.colors.primary
  const bodyCopy = lead.service_interest ? ` about ${lead.service_interest}` : ""
  const websiteLabel = brand.websiteUrl.replace(/^https?:\/\//, "")
  return (
    <Html>
      <Head />
      <Preview>We received your request</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={{ ...h1, color: primary }}>Thanks for contacting {brand.displayName}</Heading>

          <Section style={section}>
            <Text style={value}>Hey {lead.name.split(" ")[0] || "there"},</Text>
            <Text style={message}>
              We just received your request{bodyCopy}. A specialist at <a href={brand.websiteUrl}>{websiteLabel}</a> is reviewing the
              details now and will reach out with next steps {brand.responseTime}.
            </Text>
          </Section>

          {lead.message && (
            <Section style={section}>
              <Text style={label}>What you shared:</Text>
              <Text style={message}>{lead.message}</Text>
            </Section>
          )}

          <Section style={section}>
            <Text style={label}>What happens next:</Text>
            <Text style={message}>
              • A specialist will confirm your preferred time to chat about the project.
              {"\n"}• We will prepare a tailored plan based on your scope and timelines.
              {"\n"}• You can always reply directly to this email with photos or updates.
            </Text>
          </Section>

          <Hr style={hr} />
          <Text style={footer}>
            Need immediate help? Call or text {brand.supportPhone} and mention the email you just submitted.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
}

const h1 = {
  color: "#1e3a8a",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0 20px",
  padding: "0 40px",
}

const section = {
  padding: "0 40px",
  marginBottom: "16px",
}

const label = {
  color: "#64748b",
  fontSize: "12px",
  fontWeight: "600",
  textTransform: "uppercase" as const,
  margin: "0 0 4px",
}

const value = {
  color: "#1e293b",
  fontSize: "16px",
  margin: "0 0 16px",
}

const message = {
  color: "#1e293b",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
}

const hr = {
  borderColor: "#e2e8f0",
  margin: "20px 40px",
}

const footer = {
  color: "#64748b",
  fontSize: "12px",
  padding: "0 40px",
  marginTop: "20px",
}
