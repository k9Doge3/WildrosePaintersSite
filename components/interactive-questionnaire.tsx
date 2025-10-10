"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Home,
  Building2,
  Paintbrush,
  Calendar,
  MessageSquare,
  Loader2,
} from "lucide-react"

interface QuestionnaireData {
  name: string
  email: string
  phone: string
  projectType: "residential" | "commercial" | ""
  serviceType: string
  propertySize: string
  timeline: string
  budget: string
  message: string
}

const steps = [
  { id: 1, title: "Let's get to know you", icon: MessageSquare },
  { id: 2, title: "About your project", icon: Home },
  { id: 3, title: "Service details", icon: Paintbrush },
  { id: 4, title: "Timeline & budget", icon: Calendar },
  { id: 5, title: "Final details", icon: CheckCircle2 },
]

export function InteractiveQuestionnaire() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [formData, setFormData] = useState<QuestionnaireData>({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    serviceType: "",
    propertySize: "",
    timeline: "",
    budget: "",
    message: "",
  })

  const progress = (currentStep / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to submit")

      setIsComplete(true)
    } catch (error) {
      console.error("Error submitting questionnaire:", error)
      alert("There was an error submitting your request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateField = (field: keyof QuestionnaireData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.email && formData.phone
      case 2:
        return formData.projectType
      case 3:
        return formData.serviceType
      case 4:
        return formData.timeline && formData.budget
      case 5:
        return true
      default:
        return false
    }
  }

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-[600px] flex-col items-center justify-center text-center"
      >
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="h-10 w-10 text-primary" />
        </div>
        <h2 className="mb-4 text-3xl font-bold">Thank You, {formData.name.split(" ")[0]}!</h2>
        <p className="mb-2 max-w-md text-lg text-muted-foreground">
          We've received your project details and will send you a personalized quote within 24 hours.
        </p>
        <p className="mb-8 text-sm text-muted-foreground">
          Check your email at <span className="font-semibold">{formData.email}</span> for confirmation.
        </p>
        <Button onClick={() => window.location.reload()} size="lg">
          Submit Another Request
        </Button>
      </motion.div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium">
            Step {currentStep} of {steps.length}
          </span>
          <span className="text-muted-foreground">{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Indicators */}
      <div className="mb-8 flex justify-between">
        {steps.map((step) => {
          const Icon = step.icon
          const isActive = currentStep === step.id
          const isCompleted = currentStep > step.id

          return (
            <div
              key={step.id}
              className={`flex flex-col items-center gap-2 ${
                isActive ? "text-primary" : isCompleted ? "text-primary/60" : "text-muted-foreground"
              }`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors ${
                  isActive
                    ? "border-primary bg-primary/10"
                    : isCompleted
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground/20"
                }`}
              >
                {isCompleted ? <CheckCircle2 className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
              </div>
              <span className="hidden text-xs font-medium md:block">{step.title}</span>
            </div>
          )
        })}
      </div>

      {/* Question Cards */}
      <Card className="border-2">
        <CardContent className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step 1: Personal Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-2 text-2xl font-bold">Hi there! What's your name?</h3>
                    <p className="text-muted-foreground">
                      Let's start with the basics so we can personalize your experience.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium">Full Name *</label>
                      <Input
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        className="text-lg"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">Email Address *</label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        className="text-lg"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">Phone Number *</label>
                      <Input
                        type="tel"
                        placeholder="(403) 555-0123"
                        value={formData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        className="text-lg"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Project Type */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-2 text-2xl font-bold">Great to meet you, {formData.name.split(" ")[0]}!</h3>
                    <p className="text-muted-foreground">What type of property are we painting?</p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <button
                      onClick={() => updateField("projectType", "residential")}
                      className={`flex flex-col items-center gap-4 rounded-lg border-2 p-6 transition-all hover:border-primary ${
                        formData.projectType === "residential" ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <Home className="h-12 w-12 text-primary" />
                      <div className="text-center">
                        <h4 className="mb-1 font-semibold">Residential</h4>
                        <p className="text-sm text-muted-foreground">Home, condo, or apartment</p>
                      </div>
                    </button>

                    <button
                      onClick={() => updateField("projectType", "commercial")}
                      className={`flex flex-col items-center gap-4 rounded-lg border-2 p-6 transition-all hover:border-primary ${
                        formData.projectType === "commercial" ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <Building2 className="h-12 w-12 text-primary" />
                      <div className="text-center">
                        <h4 className="mb-1 font-semibold">Commercial</h4>
                        <p className="text-sm text-muted-foreground">Office, retail, or industrial</p>
                      </div>
                    </button>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">Property Size (optional)</label>
                    <Input
                      placeholder="e.g., 2000 sq ft, 3 bedroom home"
                      value={formData.propertySize}
                      onChange={(e) => updateField("propertySize", e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Service Type */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-2 text-2xl font-bold">What service do you need?</h3>
                    <p className="text-muted-foreground">Select the painting service you're interested in.</p>
                  </div>

                  <div className="grid gap-3">
                    {[
                      { value: "interior", label: "Interior Painting", desc: "Walls, ceilings, trim" },
                      { value: "exterior", label: "Exterior Painting", desc: "Siding, doors, windows" },
                      { value: "both", label: "Interior & Exterior", desc: "Complete transformation" },
                      { value: "cabinet", label: "Cabinet Refinishing", desc: "Kitchen & bathroom cabinets" },
                      { value: "deck", label: "Deck & Fence Staining", desc: "Outdoor wood surfaces" },
                      { value: "custom", label: "Custom Finishes", desc: "Specialty techniques" },
                    ].map((service) => (
                      <button
                        key={service.value}
                        onClick={() => updateField("serviceType", service.value)}
                        className={`flex items-center gap-4 rounded-lg border-2 p-4 text-left transition-all hover:border-primary ${
                          formData.serviceType === service.value ? "border-primary bg-primary/5" : "border-border"
                        }`}
                      >
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full ${
                            formData.serviceType === service.value ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <Paintbrush className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{service.label}</h4>
                          <p className="text-sm text-muted-foreground">{service.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Timeline & Budget */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-2 text-2xl font-bold">When do you want to start?</h3>
                    <p className="text-muted-foreground">This helps us schedule your project efficiently.</p>
                  </div>

                  <div className="grid gap-3">
                    {[
                      { value: "asap", label: "As soon as possible", icon: "🚀" },
                      { value: "1-2weeks", label: "Within 1-2 weeks", icon: "📅" },
                      { value: "1month", label: "Within a month", icon: "🗓️" },
                      { value: "flexible", label: "I'm flexible", icon: "✨" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => updateField("timeline", option.value)}
                        className={`flex items-center gap-4 rounded-lg border-2 p-4 text-left transition-all hover:border-primary ${
                          formData.timeline === option.value ? "border-primary bg-primary/5" : "border-border"
                        }`}
                      >
                        <span className="text-2xl">{option.icon}</span>
                        <span className="font-medium">{option.label}</span>
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">What's your budget range? *</label>
                    <div className="grid gap-3">
                      {[
                        { value: "under-2k", label: "Under $2,000" },
                        { value: "2k-5k", label: "$2,000 - $5,000" },
                        { value: "5k-10k", label: "$5,000 - $10,000" },
                        { value: "10k-plus", label: "$10,000+" },
                        { value: "not-sure", label: "Not sure yet" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => updateField("budget", option.value)}
                          className={`rounded-lg border-2 p-3 text-left transition-all hover:border-primary ${
                            formData.budget === option.value
                              ? "border-primary bg-primary/5 font-medium"
                              : "border-border"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Final Details */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-2 text-2xl font-bold">Almost done!</h3>
                    <p className="text-muted-foreground">Any additional details you'd like to share?</p>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">Project Details (optional)</label>
                    <Textarea
                      placeholder="Tell us more about your project, specific colors, concerns, or questions..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      className="resize-none"
                    />
                  </div>

                  <div className="rounded-lg bg-muted p-4">
                    <h4 className="mb-2 font-semibold">Your Project Summary:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>
                        • <span className="font-medium">Type:</span>{" "}
                        {formData.projectType === "residential" ? "Residential" : "Commercial"}
                      </li>
                      <li>
                        • <span className="font-medium">Service:</span> {formData.serviceType}
                      </li>
                      <li>
                        • <span className="font-medium">Timeline:</span> {formData.timeline}
                      </li>
                      <li>
                        • <span className="font-medium">Budget:</span> {formData.budget}
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-8 flex items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="gap-2 bg-transparent"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            {currentStep < steps.length ? (
              <Button onClick={handleNext} disabled={!isStepValid()} className="gap-2" size="lg">
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isSubmitting} className="gap-2" size="lg">
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Get My Quote
                    <CheckCircle2 className="h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
