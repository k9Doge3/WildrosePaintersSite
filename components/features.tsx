import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Paintbrush, Home, Building2, Fence, CheckCircle } from "lucide-react"

const features = [
  {
    icon: Home,
    title: "Residential Painting",
    description:
      "Interior and exterior painting for homes across Alberta. From single rooms to complete home transformations, we deliver exceptional results that last.",
    benefits: ["Colour consultation", "Premium paints", "Clean, professional work"],
    color: "primary",
  },
  {
    icon: Building2,
    title: "Commercial Painting",
    description:
      "Professional painting for offices, retail spaces, and commercial buildings. We work efficiently to minimize disruption to your business operations.",
    benefits: ["Flexible scheduling", "Fast turnaround", "Minimal disruption"],
    color: "accent",
  },
  {
    icon: Fence,
    title: "Deck & Fence Staining",
    description:
      "Protect and beautify your outdoor spaces with professional staining services. We use premium products designed for Alberta's harsh climate.",
    benefits: ["Weather-resistant stains", "Proper surface prep", "Long-lasting protection"],
    color: "primary",
  },
  {
    icon: Paintbrush,
    title: "Cabinet Refinishing",
    description:
      "Transform your kitchen or bathroom with professional cabinet painting and refinishing. A cost-effective alternative to full replacement.",
    benefits: ["Custom colours", "Durable finishes", "Expert application"],
    color: "accent",
  },
]

export function Features() {
  return (
    <section id="services" className="py-20 md:py-32">
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-balance text-4xl font-bold md:text-5xl gradient-text">
            Complete Painting Solutions
          </h2>
          <p className="text-pretty text-xl leading-relaxed text-foreground/70">
            Professional services for residential and commercial properties throughout Alberta
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="glass-card border-primary/20 transition-all duration-300 hover:scale-105 hover:glow-primary group"
            >
              <CardHeader>
                <div
                  className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${
                    feature.color === "primary" ? "bg-primary/20 glow-primary" : "bg-accent/20 glow-accent"
                  } group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className={`h-8 w-8 ${feature.color === "primary" ? "text-primary" : "text-accent"}`} />
                </div>
                <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed text-foreground/60">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                      <CheckCircle
                        className={`h-4 w-4 flex-shrink-0 ${feature.color === "primary" ? "text-primary" : "text-accent"}`}
                      />
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
