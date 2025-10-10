import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Paintbrush, Home, Building2, Sparkles, CheckCircle } from "lucide-react"

const features = [
  {
    icon: Home,
    title: "Residential Painting",
    description:
      "Interior and exterior painting for homes of all sizes. From single rooms to complete home makeovers, we deliver stunning results.",
    benefits: ["Color consultation", "Furniture protection", "Clean workspace"],
  },
  {
    icon: Building2,
    title: "Commercial Painting",
    description:
      "Professional painting for offices, retail, and commercial buildings. We work around your schedule to minimize disruption.",
    benefits: ["After-hours service", "Fast turnaround", "Minimal disruption"],
  },
  {
    icon: Paintbrush,
    title: "Specialty Finishes",
    description:
      "Custom textures, faux finishes, and decorative painting. Bring your unique vision to life with our expert techniques.",
    benefits: ["Custom colors", "Unique textures", "Expert application"],
  },
  {
    icon: Sparkles,
    title: "Premium Quality",
    description:
      "We use only top-tier paints and materials from trusted brands. Every project includes our satisfaction guarantee.",
    benefits: ["Premium materials", "Warranty included", "Quality guaranteed"],
  },
]

export function Features() {
  return (
    <section id="services" className="bg-muted/30 py-20 md:py-32">
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold md:text-5xl">Complete Painting Solutions</h2>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            Professional services tailored to residential and commercial needs across Alberta
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 bg-card transition-all hover:border-primary hover:shadow-xl">
              <CardHeader>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-2xl">{feature.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
