import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"
import Link from "next/link"

export function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-32 bg-muted/30">
      <div className="container">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold md:text-5xl">Custom Estimates for Every Project</h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Every home and project is unique. We don't believe in one-size-fits-all packages. Tell us what you need, and
            we'll provide a detailed, transparent estimate tailored to your specific requirements and timeline.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <Card className="border-2 border-primary/20 shadow-xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl md:text-3xl mb-4">How Our Custom Estimates Work</CardTitle>
              <p className="text-muted-foreground text-balance">
                We take the time to understand your project, assess your space, and provide a fair, detailed quote based
                on your needs—not a cookie-cutter package.
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center space-y-3">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="font-semibold">Tell Us Your Vision</h3>
                  <p className="text-sm text-muted-foreground">
                    Share details about your project—interior, exterior, fence, deck, or custom work.
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="font-semibold">We Assess & Quote</h3>
                  <p className="text-sm text-muted-foreground">
                    Our team evaluates your space, materials needed, and timeline to create a detailed estimate.
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="font-semibold">You Decide When</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose your preferred timeline, and we'll work around your schedule.
                  </p>
                </div>
              </div>

              <div className="border-t pt-8">
                <h3 className="text-xl font-semibold mb-4 text-center">What's Included in Every Estimate</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Detailed Scope of Work</p>
                      <p className="text-sm text-muted-foreground">
                        Clear breakdown of what we'll do, materials used, and timeline
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Premium Materials</p>
                      <p className="text-sm text-muted-foreground">
                        Benjamin Moore, Sherwin-Williams, or equivalent quality paints
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Surface Preparation</p>
                      <p className="text-sm text-muted-foreground">
                        Proper cleaning, sanding, priming, and repairs as needed
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Warranty & Guarantee</p>
                      <p className="text-sm text-muted-foreground">
                        Quality workmanship backed by our satisfaction guarantee
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-6 text-center space-y-4">
                <p className="text-lg font-semibold">Ready to Get Your Custom Estimate?</p>
                <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                  Fill out our quick questionnaire below, or give us a call. We'll get back to you within 24 hours with
                  a detailed, no-obligation quote.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button asChild size="lg" className="rounded-full">
                    <Link href="#contact">Get Free Estimate</Link>
                  </Button>
                  <a
                    href="tel:+14035551234"
                    className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    (403) 555-1234
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
