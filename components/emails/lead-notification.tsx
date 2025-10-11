import { Body, Container, Head, Heading, Html, Preview, Section, Text, Hr } from "@react-email/components"

interface LeadEmailTemplateProps {
  lead: {
    name: string
    email: string
    phone?: string | null
    company?: string | null
    service_interest?: string | null
    message?: string | null
  }
}

export function LeadEmailTemplate({ lead }: LeadEmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>New lead from {lead.name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Estimate Request</Heading>

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
          <Text style={footer}>View all leads in your contractor portal at wildrosepainters.ca/contractor-portal</Text>
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
