"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"

export default function TestCRMPage() {
  const [formData, setFormData] = useState({
    name: "Test Customer",
    email: "test@example.com",
    phone: "403-555-0199",
    projectType: "Interior Painting",
    message: "This is a test lead from the CRM testing page",
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setResult({
          success: true,
          message: `✅ Lead successfully created! Check your EspoCRM at ${process.env.NEXT_PUBLIC_ESPOCRM_BASE_URL || "http://localhost:8080"}`,
        })
      } else {
        setResult({
          success: false,
          message: `❌ Error: ${data.error || "Failed to create lead"}`,
        })
      }
    } catch (error) {
      setResult({
        success: false,
        message: `❌ Network error: ${error instanceof Error ? error.message : "Unknown error"}`,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-12">
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>EspoCRM Lead Tracking Test</CardTitle>
          <CardDescription>
            Test the integration between your website and EspoCRM. Submit this form to create a test lead.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="projectType">Project Type</Label>
              <Input
                id="projectType"
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing CRM Integration...
                </>
              ) : (
                "Submit Test Lead"
              )}
            </Button>
          </form>

          {result && (
            <Alert className={`mt-6 ${result.success ? "border-green-500" : "border-red-500"}`}>
              {result.success ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
              <AlertDescription>{result.message}</AlertDescription>
            </Alert>
          )}

          <div className="mt-6 rounded-lg bg-muted p-4 text-sm">
            <p className="font-semibold mb-2">How to verify:</p>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
              <li>Submit the test form above</li>
              <li>
                Open EspoCRM at <code className="text-xs bg-background px-1 py-0.5 rounded">http://localhost:8080</code>
              </li>
              <li>Navigate to Leads section</li>
              <li>Look for the test lead with the name "Test Customer"</li>
              <li>Verify all fields are populated correctly</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
