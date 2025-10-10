import { Card, CardContent } from "@/components/ui/card"
import { BeforeAfterSlider } from "@/components/before-after-slider"

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-muted/50 py-20 md:py-32">
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold md:text-5xl">See The Transformation</h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Real projects from our network of Alberta painting contractors
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <BeforeAfterSlider
            beforeImage="/old-worn-painted-wall-before.jpg"
            afterImage="/freshly-painted-modern-wall-after.jpg"
            beforeAlt="Living room with old worn paint before renovation"
            afterAlt="Living room with fresh modern paint after professional painting"
          />
          <BeforeAfterSlider
            beforeImage="/exterior-house-old-paint-peeling.jpg"
            afterImage="/exterior-house-fresh-new-paint.jpg"
            beforeAlt="House exterior with old peeling paint"
            afterAlt="House exterior with fresh new paint job"
          />
          <BeforeAfterSlider
            beforeImage="/commercial-office-space-before-painting.jpg"
            afterImage="/commercial-office-space-modern-painted.jpg"
            beforeAlt="Commercial office space before painting"
            afterAlt="Commercial office space with modern professional paint"
          />
        </div>

        <div className="mt-12 text-center">
          <Card className="glass-card mx-auto max-w-2xl">
            <CardContent className="pt-6">
              <p className="text-lg leading-relaxed text-muted-foreground">
                <strong className="text-foreground">We connect you with the best.</strong> Our network includes verified
                painting contractors across Alberta who have proven track records of quality work and customer
                satisfaction.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
