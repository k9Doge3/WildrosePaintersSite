import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah M.",
    location: "Edmonton, AB",
    rating: 5,
    text: "Outstanding work on our fence! The team was professional, punctual, and the staining job looks incredible. Our fence went from weathered gray to a beautiful warm tone. Highly recommend!",
    project: "Fence Staining",
  },
  {
    name: "Mike T.",
    location: "Calgary, AB",
    rating: 5,
    text: "We had our entire home's exterior painted and couldn't be happier. The attention to detail was impressive, and they worked around our schedule. The paint has held up beautifully through two Alberta winters.",
    project: "Exterior Painting",
  },
  {
    name: "Jennifer L.",
    location: "Red Deer, AB",
    rating: 5,
    text: "Fantastic deck staining service! They explained the process, recommended the best products for our climate, and the results exceeded our expectations. Our deck looks brand new.",
    project: "Deck Staining",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-32 bg-white/70">
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold md:text-5xl gradient-text">
            Trusted by Alberta Homeowners
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Real reviews from real customers across Edmonton and surrounding areas
          </p>
        </div>

        {/* Customer Reviews */}
        <div className="grid gap-6 md:grid-cols-3 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="glass-card border-primary/20 hover:glow-primary transition-all group">
              <CardContent className="pt-6">
                <div className="mb-4 flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-primary/30 mb-3" />
                <p className="mb-4 leading-relaxed text-foreground/80">{testimonial.text}</p>
                <div className="border-t border-black/5 pt-4">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  <p className="text-xs text-primary mt-1">{testimonial.project}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Before/After Showcase */}
        <div className="mx-auto max-w-4xl">
          <h3 className="text-2xl font-bold text-center mb-8 gradient-text">See the Transformation</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg glass-card border-primary/20">
              <Image
                src="/images/fence-before-unstained.jpg"
                alt="Fence before staining"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />
              <div className="absolute bottom-4 left-4 rounded-full bg-white/90 border border-black/5 px-4 py-2 text-sm font-semibold shadow-lg">
                Before
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg glass-card border-primary/20 hover:glow-primary transition-all">
              <Image
                src="/images/fence-after-stained.jpg"
                alt="Fence after professional staining"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />
              <div className="absolute bottom-4 left-4 rounded-full bg-primary/90 backdrop-blur-sm border border-primary/20 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/50">
                After
              </div>
            </div>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="mt-16 grid gap-6 md:grid-cols-4">
          <Card className="glass-card border-primary/20 text-center">
            <CardContent className="pt-6">
              <p className="text-3xl font-bold gradient-text mb-2">15+</p>
              <p className="text-sm text-muted-foreground">Years Experience</p>
            </CardContent>
          </Card>
          <Card className="glass-card border-primary/20 text-center">
            <CardContent className="pt-6">
              <p className="text-3xl font-bold gradient-text mb-2">500+</p>
              <p className="text-sm text-muted-foreground">Projects Completed</p>
            </CardContent>
          </Card>
          <Card className="glass-card border-primary/20 text-center">
            <CardContent className="pt-6">
              <p className="text-3xl font-bold gradient-text mb-2">100%</p>
              <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
            </CardContent>
          </Card>
          <Card className="glass-card border-primary/20 text-center">
            <CardContent className="pt-6">
              <p className="text-3xl font-bold gradient-text mb-2">24hr</p>
              <p className="text-sm text-muted-foreground">Response Time</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
