interface EspoCRMConfig {
  baseUrl: string
  apiKey?: string
  username?: string
  password?: string
}

interface Lead {
  name: string
  email: string
  phone?: string
  company?: string
  service_interest?: string
  message?: string
}

class EspoCRMClient {
  private config: EspoCRMConfig

  constructor(config: EspoCRMConfig) {
    this.config = config
  }

  private async getAuthHeaders(): Promise<HeadersInit> {
    // EspoCRM supports API Key or Basic Auth
    if (this.config.apiKey) {
      return {
        "X-Api-Key": this.config.apiKey,
        "Content-Type": "application/json",
      }
    } else if (this.config.username && this.config.password) {
      const auth = Buffer.from(`${this.config.username}:${this.config.password}`).toString("base64")
      return {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      }
    }
    return {
      "Content-Type": "application/json",
    }
  }

  async createLead(lead: Lead) {
    try {
      const headers = await this.getAuthHeaders()

      // Map our lead data to EspoCRM Lead entity format
      const espoCRMLead = {
        firstName: lead.name.split(" ")[0] || lead.name,
        lastName: lead.name.split(" ").slice(1).join(" ") || "",
        emailAddress: lead.email,
        phoneNumber: lead.phone || "",
        accountName: lead.company || "",
        description: `Service Interest: ${lead.service_interest || "Not specified"}\n\nMessage: ${lead.message || "No message provided"}`,
        status: "New",
        source: "Web Site",
      }

      const response = await fetch(`${this.config.baseUrl}/api/v1/Lead`, {
        method: "POST",
        headers,
        body: JSON.stringify(espoCRMLead),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("[v0] EspoCRM API error:", response.status, errorText)
        throw new Error(`EspoCRM API error: ${response.status}`)
      }

      const data = await response.json()
      console.log("[v0] Lead created in EspoCRM:", data.id)

      await this.sendAutoResponse(lead, data.id)

      return data
    } catch (error) {
      console.error("[v0] Failed to create lead in EspoCRM:", error)
      throw error
    }
  }

  async sendAutoResponse(lead: Lead, leadId: string) {
    try {
      const headers = await this.getAuthHeaders()

      const emailData = {
        to: lead.email,
        subject: "Thank You for Your Quote Request - WildRose Painters",
        body: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0;">WildRose Painters</h1>
            </div>
            
            <div style="padding: 30px; background: #f9fafb;">
              <h2 style="color: #1f2937;">Hi ${lead.name.split(" ")[0]}!</h2>
              
              <p style="color: #4b5563; line-height: 1.6;">
                Thank you for reaching out to WildRose Painters! We've received your quote request and are excited to help transform your space.
              </p>
              
              <div style="background: white; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #1f2937;">What happens next?</h3>
                <ul style="color: #4b5563; line-height: 1.8;">
                  <li>Our team will review your project details</li>
                  <li>We'll prepare a personalized quote for you</li>
                  <li>You'll receive our response within 24 hours</li>
                  <li>We'll schedule a convenient time to discuss your project</li>
                </ul>
              </div>
              
              <p style="color: #4b5563; line-height: 1.6;">
                In the meantime, feel free to check out our <a href="https://wildrosepainters.ca" style="color: #667eea;">portfolio</a> or give us a call at <strong>(587) 501-6994</strong> if you have any immediate questions.
              </p>
              
              <div style="background: #667eea; color: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
                <p style="margin: 0; font-size: 18px; font-weight: bold;">🎨 15+ Years of Excellence</p>
                <p style="margin: 10px 0 0 0;">Trusted by hundreds of satisfied customers</p>
              </div>
              
              <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                Best regards,<br>
                <strong>The WildRose Painters Team</strong><br>
                📧 ky.group.solutions@gmail.com<br>
                📱 (587) 501-6994
              </p>
            </div>
            
            <div style="background: #1f2937; padding: 20px; text-align: center; color: #9ca3af; font-size: 12px;">
              <p style="margin: 0;">© 2025 WildRose Painters. All rights reserved.</p>
              <p style="margin: 10px 0 0 0;">Calgary, Alberta | wildrosepainters.ca</p>
            </div>
          </div>
        `,
        isHtml: true,
        parentType: "Lead",
        parentId: leadId,
      }

      const response = await fetch(`${this.config.baseUrl}/api/v1/Email`, {
        method: "POST",
        headers,
        body: JSON.stringify(emailData),
      })

      if (response.ok) {
        console.log("[v0] Auto-response email sent successfully")
      } else {
        console.error("[v0] Failed to send auto-response:", response.status)
      }
    } catch (error) {
      console.error("[v0] Error sending auto-response:", error)
      // Don't throw - we don't want to fail the lead creation if email fails
    }
  }

  async getLeads(params?: { offset?: number; maxSize?: number }) {
    try {
      const headers = await this.getAuthHeaders()
      const queryParams = new URLSearchParams({
        offset: String(params?.offset || 0),
        maxSize: String(params?.maxSize || 50),
        orderBy: "createdAt",
        order: "desc",
      })

      const response = await fetch(`${this.config.baseUrl}/api/v1/Lead?${queryParams}`, {
        method: "GET",
        headers,
      })

      if (!response.ok) {
        throw new Error(`EspoCRM API error: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("[v0] Failed to fetch leads from EspoCRM:", error)
      throw error
    }
  }
}

export function getEspoCRMClient(): EspoCRMClient {
  const config: EspoCRMConfig = {
    baseUrl: process.env.ESPOCRM_BASE_URL || "http://localhost:8080",
    apiKey: process.env.ESPOCRM_API_KEY,
    username: process.env.ESPOCRM_USERNAME,
    password: process.env.ESPOCRM_PASSWORD,
  }

  return new EspoCRMClient(config)
}
