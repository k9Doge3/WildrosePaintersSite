"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="bg-primary py-20 text-primary-foreground md:py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-balance text-3xl font-bold md:text-5xl">Ready to Transform Your Space?</h2>
          <p className="mb-8 text-pretty text-lg opacity-90 md:text-xl">
            Get your free, no-obligation quote today. Our team is ready to bring your vision to life with professional
            painting services you can trust.
          </p>
          <Button size="lg" variant="secondary" onClick={scrollToContact}>
            Get Your Free Quote <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
