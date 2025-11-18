"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import type { LucideIcon } from "lucide-react"
import {
  Calendar,
  CalendarDays,
  ClipboardList,
  Clock3,
  Image,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
  Upload,
  UserRoundCheck,
  Video,
  CheckCircle2,
  X,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface UploadedPhoto {
  url: string
  filename: string
  size: number
}

export function InteractiveEstimateForm() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedPhoto[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  // Form data
  const [formData, setFormData] = useState({
    // Contact Info
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",

    // Project Details
    projectType: [] as string[],
    otherProjectType: "",
    projectScope: "",
    squareFootage: "",
    numberOfRooms: "",

    // Timeline
    timeline: "",
    specificDate: "",
    flexibility: "",

    // Preferences
    estimateMethod: "",
    preferredContactTime: "",
    additionalDetails: "",
  })

  const projectTypes = [
    { id: "interior", label: "Interior Painting" },
    { id: "exterior", label: "Exterior Painting" },
    { id: "fence", label: "Fence Staining" },
    { id: "deck", label: "Deck Staining" },
    { id: "cabinet", label: "Cabinet Refinishing" },
    { id: "commercial", label: "Commercial Project" },
    { id: "other", label: "Other" },
  ]

  const stepConfig: { title: string; short: string; description: string; icon: LucideIcon }[] = [
    {
      title: "Project Details",
      short: "Project",
      description: "Scope, size, and goals",
      icon: ClipboardList,
    },
    {
      title: "Timeline",
      short: "Timeline",
      description: "When you need us",
      icon: CalendarDays,
    },
    {
      title: "Photos",
      short: "Photos",
      description: "Visual references",
      icon: Image,
    },
    {
      title: "Estimate Style",
      short: "Preferences",
      description: "How you want the quote",
      icon: MessageCircle,
    },
    {
      title: "Contact",
      short: "Contact",
      description: "How we reach you",
      icon: UserRoundCheck,
    },
  ]

  const totalSteps = stepConfig.length
  const currentStepIndex = step - 1
  const progress = (step / totalSteps) * 100

  const projectTypeLabels = projectTypes.reduce<Record<string, string>>((acc, type) => {
    acc[type.id] = type.label
    return acc
  }, {})

  const timelineLabels: Record<string, string> = {
    asap: "As soon as possible",
    "1-2weeks": "1-2 weeks",
    "1month": "Within a month",
    flexible: "Flexible",
    specific: formData.specificDate ? `Specific date (${formData.specificDate})` : "Specific date in mind",
  }

  const estimateLabels: Record<string, string> = {
    email: "Detailed email estimate",
    virtual: "Virtual meeting",
    phone: "Phone consultation",
    onsite: "On-site walkthrough",
  }

  const selectedProjectTypes = formData.projectType
    .map((id) => projectTypeLabels[id])
    .filter((label): label is string => Boolean(label))

  const timelineSummary = formData.timeline ? timelineLabels[formData.timeline] ?? "Custom timeline" : "Add your ideal schedule"
  const estimateSummary = formData.estimateMethod
    ? estimateLabels[formData.estimateMethod] ?? "Custom estimate format"
    : "Choose how you'd like to receive the quote"
  const locationSummary = formData.city || "Any Alberta community"
  const contactReady = Boolean(formData.name && formData.email && formData.phone)

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData()
        formData.append("file", file)

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) throw new Error("Upload failed")

        const data = await response.json()
        setUploadedPhotos((prev) => [...prev, data])
      }

      toast({
        title: "Photos uploaded successfully!",
        description: "Your photos have been added to your estimate request.",
      })
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your photos. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const removePhoto = (url: string) => {
    setUploadedPhotos((prev) => prev.filter((photo) => photo.url !== url))
  }

  const handleProjectTypeChange = (typeId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      projectType: checked ? [...prev.projectType, typeId] : prev.projectType.filter((id) => id !== typeId),
    }))
  }

  const handleSubmit = async () => {
    console.log("[v0] Starting form submission...")
    console.log("[v0] Form data:", formData)
    console.log("[v0] Uploaded photos:", uploadedPhotos.length)

    setIsSubmitting(true)

    try {
      const payload = {
        ...formData,
        photos: uploadedPhotos,
        source: "Interactive Estimate Form",
      }

      console.log("[v0] Sending payload to /api/leads:", payload)

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      console.log("[v0] Response status:", response.status)

      if (!response.ok) {
        const errorData = await response.json()
        console.error("[v0] API error response:", errorData)
        throw new Error(errorData.error || "Submission failed")
      }

      const result = await response.json()
      console.log("[v0] Submission successful:", result)

      toast({
        title: "Estimate request submitted!",
        description: "We'll get back to you within 24 hours with your custom estimate.",
      })

      // Reset form
      setStep(1)
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        projectType: [],
        otherProjectType: "",
        projectScope: "",
        squareFootage: "",
        numberOfRooms: "",
        timeline: "",
        specificDate: "",
        flexibility: "",
        estimateMethod: "",
        preferredContactTime: "",
        additionalDetails: "",
      })
      setUploadedPhotos([])
    } catch (error) {
      console.error("[v0] Submission error:", error)
      toast({
        title: "Submission failed",
        description:
          error instanceof Error ? error.message : "There was an error submitting your request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-xl font-semibold gradient-text">What type of project do you need?</h3>
              <div className="space-y-3">
                {projectTypes.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={type.id}
                      checked={formData.projectType.includes(type.id)}
                      onCheckedChange={(checked) => handleProjectTypeChange(type.id, checked as boolean)}
                    />
                    <Label htmlFor={type.id} className="cursor-pointer font-normal">
                      {type.label}
                    </Label>
                  </div>
                ))}
              </div>
              {formData.projectType.includes("other") && (
                <Input
                  placeholder="Please specify..."
                  value={formData.otherProjectType}
                  onChange={(e) => setFormData({ ...formData, otherProjectType: e.target.value })}
                  className="mt-3"
                />
              )}
            </div>

            <div>
              <Label htmlFor="projectScope">Tell us about your project</Label>
              <Textarea
                id="projectScope"
                placeholder="Describe what you'd like painted or stained, any specific colours you have in mind, current condition, etc."
                value={formData.projectScope}
                onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                rows={4}
                className="mt-2"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="squareFootage">Approximate Square Footage (optional)</Label>
                <Input
                  id="squareFootage"
                  type="text"
                  placeholder="e.g., 1500 sq ft"
                  value={formData.squareFootage}
                  onChange={(e) => setFormData({ ...formData, squareFootage: e.target.value })}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="numberOfRooms">Number of Rooms (if applicable)</Label>
                <Input
                  id="numberOfRooms"
                  type="text"
                  placeholder="e.g., 3 bedrooms"
                  value={formData.numberOfRooms}
                  onChange={(e) => setFormData({ ...formData, numberOfRooms: e.target.value })}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-xl font-semibold">When would you like this done?</h3>
              <RadioGroup
                value={formData.timeline}
                onValueChange={(value) => setFormData({ ...formData, timeline: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="asap" id="asap" />
                  <Label htmlFor="asap" className="cursor-pointer font-normal">
                    As soon as possible
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1-2weeks" id="1-2weeks" />
                  <Label htmlFor="1-2weeks" className="cursor-pointer font-normal">
                    Within 1-2 weeks
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1month" id="1month" />
                  <Label htmlFor="1month" className="cursor-pointer font-normal">
                    Within a month
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="flexible" id="flexible" />
                  <Label htmlFor="flexible" className="cursor-pointer font-normal">
                    I'm flexible
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="specific" id="specific" />
                  <Label htmlFor="specific" className="cursor-pointer font-normal">
                    Specific date in mind
                  </Label>
                </div>
              </RadioGroup>

              {formData.timeline === "specific" && (
                <div className="mt-4">
                  <Label htmlFor="specificDate">Preferred Start Date</Label>
                  <Input
                    id="specificDate"
                    type="date"
                    value={formData.specificDate}
                    onChange={(e) => setFormData({ ...formData, specificDate: e.target.value })}
                    className="mt-2"
                  />
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="flexibility">Are your dates flexible?</Label>
              <Textarea
                id="flexibility"
                placeholder="Let us know if you have any scheduling constraints or preferences..."
                value={formData.flexibility}
                onChange={(e) => setFormData({ ...formData, flexibility: e.target.value })}
                rows={3}
                className="mt-2"
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-xl font-semibold">Upload photos of your project</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Photos help us provide a more accurate estimate. Upload images of the areas you'd like painted or
                stained.
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-black/10 bg-white/70 p-8 transition-colors hover:border-primary/40 hover:bg-white">
                  <Label htmlFor="photo-upload" className="flex cursor-pointer flex-col items-center gap-2">
                    <Upload className="h-8 w-8 text-primary" />
                    <span className="text-sm font-medium">Click to upload photos</span>
                    <span className="text-xs text-muted-foreground">PNG, JPG up to 10MB each</span>
                    <Input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                  </Label>
                </div>

                {isUploading && (
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    Uploading photos...
                  </div>
                )}

                {uploadedPhotos.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Uploaded Photos ({uploadedPhotos.length})</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {uploadedPhotos.map((photo) => (
                        <div key={photo.url} className="group relative overflow-hidden rounded-lg border">
                          <img
                            src={photo.url || "/placeholder.svg"}
                            alt={photo.filename}
                            className="h-32 w-full object-cover"
                          />
                          <Button
                            size="icon"
                            variant="destructive"
                            className="absolute right-2 top-2 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                            onClick={() => removePhoto(photo.url)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          <div className="bg-background/95 p-2">
                            <p className="truncate text-xs">{photo.filename}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-xl font-semibold gradient-text">How would you like to receive your estimate?</h3>
              <RadioGroup
                value={formData.estimateMethod}
                onValueChange={(value) => setFormData({ ...formData, estimateMethod: value })}
              >
                <div className="flex items-start space-x-3 rounded-lg border border-black/5 bg-white/80 p-4 transition-all hover:bg-white hover:border-primary/40 hover:shadow-lg hover:shadow-primary/20">
                  <RadioGroupItem value="email" id="email-estimate" className="mt-1" />
                  <Label htmlFor="email-estimate" className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-primary" />
                      <span className="font-semibold">Email Estimate</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Receive a detailed written estimate via email within 24 hours
                    </p>
                  </Label>
                </div>

                <div className="flex items-start space-x-3 rounded-lg border border-black/5 bg-white/80 p-4 transition-all hover:bg-white hover:border-primary/40 hover:shadow-lg hover:shadow-primary/20">
                  <RadioGroupItem value="virtual" id="virtual-estimate" className="mt-1" />
                  <Label htmlFor="virtual-estimate" className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Video className="h-5 w-5 text-primary" />
                      <span className="font-semibold">Virtual Meeting</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Schedule a video call to discuss your project and get a personalized estimate
                    </p>
                  </Label>
                </div>

                <div className="flex items-start space-x-3 rounded-lg border border-black/5 bg-white/80 p-4 transition-all hover:bg-white hover:border-primary/40 hover:shadow-lg hover:shadow-primary/20">
                  <RadioGroupItem value="phone" id="phone-estimate" className="mt-1" />
                  <Label htmlFor="phone-estimate" className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-primary" />
                      <span className="font-semibold">Phone Call</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      We'll call you to discuss details and provide an estimate over the phone
                    </p>
                  </Label>
                </div>

                <div className="flex items-start space-x-3 rounded-lg border border-black/5 bg-white/80 p-4 transition-all hover:bg-white hover:border-primary/40 hover:shadow-lg hover:shadow-primary/20">
                  <RadioGroupItem value="onsite" id="onsite-estimate" className="mt-1" />
                  <Label htmlFor="onsite-estimate" className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span className="font-semibold">On-Site Visit</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Schedule an in-person visit for the most accurate estimate (recommended for larger projects)
                    </p>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="preferredContactTime">Best time to contact you</Label>
              <Input
                id="preferredContactTime"
                type="text"
                placeholder="e.g., Weekday mornings, after 5pm, etc."
                value={formData.preferredContactTime}
                onChange={(e) => setFormData({ ...formData, preferredContactTime: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="additionalDetails">Additional details or questions</Label>
              <Textarea
                id="additionalDetails"
                placeholder="Anything else you'd like us to know?"
                value={formData.additionalDetails}
                onChange={(e) => setFormData({ ...formData, additionalDetails: e.target.value })}
                rows={3}
                className="mt-2"
              />
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-xl font-semibold gradient-text">Your contact information</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-2"
                    required
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-2"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="587-XXX-XXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-2"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Project Address *</Label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="123 Main Street"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    type="text"
                    placeholder="Edmonton"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="mt-2"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.projectType.length > 0 && formData.projectScope.trim() !== ""
      case 2:
        return formData.timeline !== ""
      case 3:
        return true // Photos are optional
      case 4:
        return formData.estimateMethod !== ""
      case 5:
        return (
          formData.name.trim() !== "" &&
          formData.email.trim() !== "" &&
          formData.phone.trim() !== "" &&
          formData.address.trim() !== "" &&
          formData.city.trim() !== ""
        )
      default:
        return false
    }
  }

  return (
    <Card className="mx-auto w-full max-w-3xl glass-card">
      <CardHeader>
        <CardTitle className="text-2xl gradient-text">Get Your Custom Estimate</CardTitle>
        <CardDescription className="text-muted-foreground">
          Answer a few questions to help us understand your project and provide an accurate estimate
        </CardDescription>
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Step {step} · {stepConfig[currentStepIndex].title}
            </span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="flex items-center gap-2">
            {stepConfig.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  index + 1 <= step ? "bg-gradient-to-r from-primary via-primary/80 to-primary/60" : "bg-muted"
                }`}
              />
            ))}
          </div>
          <div className="grid gap-3 text-xs font-medium md:grid-cols-5">
            {stepConfig.map((config, index) => (
              <div key={config.title} className="relative flex items-center gap-3 md:flex-col md:items-start md:text-left">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border text-sm transition-all ${
                    index + 1 <= step
                      ? "border-primary/40 bg-primary text-white"
                      : "border-black/5 bg-white text-muted-foreground"
                  }`}
                >
                  <config.icon className="h-4 w-4" />
                </div>
                <div className="space-y-0.5">
                  <p className={`${index + 1 === step ? "text-foreground" : "text-muted-foreground"}`}>{config.short}</p>
                  <p className="text-[11px] text-muted-foreground/80 hidden md:block">{config.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-8 lg:grid-cols-[1.8fr_1fr]">
          <div className="space-y-6">
            {renderStep()}

            <div className="flex flex-wrap justify-between gap-4 pt-4">
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  Back
                </Button>
              )}
              {step < totalSteps ? (
                <Button onClick={() => setStep(step + 1)} disabled={!isStepValid()} className="ml-auto">
                  Continue
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={!isStepValid() || isSubmitting} className="ml-auto">
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Submit Request
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-white via-white to-primary/5 p-6 shadow-lg shadow-primary/10">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary">White Glove Intake</p>
                  <p className="text-xs text-muted-foreground">Estimator follow-up in under 24 hours</p>
                </div>
              </div>

              <div className="mt-5 space-y-3 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Project Types</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedProjectTypes.length > 0 ? (
                      selectedProjectTypes.map((label) => (
                        <span key={label} className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                          {label}
                        </span>
                      ))
                    ) : (
                      <span className="text-muted-foreground">Select at least one service</span>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock3 className="mt-0.5 h-4 w-4 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Timeline</p>
                    <p className="text-muted-foreground">{timelineSummary}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="mt-0.5 h-4 w-4 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Estimate Delivery</p>
                    <p className="text-muted-foreground">{estimateSummary}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Location</p>
                    <p className="text-muted-foreground">{locationSummary}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-dashed border-primary/30 bg-white/80 p-4 text-xs text-muted-foreground">
                <p>Need help? Call <a href="tel:587-501-6994" className="font-semibold text-primary">587-501-6994</a> and mention this intake.</p>
              </div>
            </div>

            <div className="rounded-2xl border border-black/5 bg-white/90 p-6">
              <p className="text-sm font-semibold text-foreground">You're {contactReady ? "submission-ready" : "almost there"}</p>
              <p className="text-xs text-muted-foreground">
                {contactReady ? "Hit submit whenever you're ready." : "Add your contact details so our estimator can respond."}
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className={`h-4 w-4 ${selectedProjectTypes.length ? "text-primary" : "text-muted-foreground"}`} />
                  Project scope
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className={`h-4 w-4 ${formData.timeline ? "text-primary" : "text-muted-foreground"}`} />
                  Timeline preference
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className={`h-4 w-4 ${formData.estimateMethod ? "text-primary" : "text-muted-foreground"}`} />
                  Estimate method
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className={`h-4 w-4 ${contactReady ? "text-primary" : "text-muted-foreground"}`} />
                  Contact details
                </li>
              </ul>

              <div className="mt-5 rounded-xl bg-secondary/20 p-4 text-xs">
                <p className="font-semibold">What happens next?</p>
                <p className="text-muted-foreground">Our estimator reviews your info, calls if anything is missing, and sends a written quote with optional booking times.</p>
              </div>
            </div>
          </aside>
        </div>
      </CardContent>
    </Card>
  )
}
