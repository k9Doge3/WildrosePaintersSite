"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle2, Clock4, ShieldCheck } from "lucide-react"

export function CTA() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  const highlights = [
    {
      icon: CheckCircle2,
      title: "2,500+ Alberta Projects",
      description: "Residential & commercial work completed since 2010",
    },
    {
      icon: Clock4,
      title: "Quotes in 24 Hours",
      description: "Same-day estimator follow-up for every inquiry",
    },
    {
      icon: ShieldCheck,
      title: "3-Year Craft Warranty",
      description: "Labour + premium paint coverage on every project",
    },
  ]

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-[#fcdcc6] via-[#f5c5a8] to-[#d89c7a]" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-white/20 blur-3xl" aria-hidden />
      <div className="absolute -right-10 bottom-10 h-32 w-32 rounded-full bg-primary/30 blur-3xl" aria-hidden />
      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-6 border border-white/60 bg-white/80 text-primary">
            Alberta's Most Responsive Painter Network
          </Badge>
          <h2 className="mb-6 text-balance text-3xl font-bold md:text-5xl text-white drop-shadow-xl">
            Ready to Transform Your Space?
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-pretty text-lg text-white/90 md:text-xl">
            Tell us about your home or business once and we coordinate the rest—dedicated estimator, curated contractor
            match, and a written quote in under a day.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" variant="secondary" onClick={scrollToContact} className="glow-on-hover text-base">
              Get Your Free Quote <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="ghost" asChild className="text-white hover:text-primary bg-white/10">
              <a href="tel:587-501-6994">Or Call 587-501-6994</a>
            </Button>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.title} className="glass-card border border-white/40 bg-white/80 p-6 text-left">
              <item.icon className="mb-4 h-8 w-8 text-primary" />
              <p className="text-lg font-semibold text-foreground">{item.title}</p>
              <p className="text-sm text-foreground/70">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
