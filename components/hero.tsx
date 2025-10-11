import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, Clock, MapPin, Phone } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-32 md:py-40 bg-slate-950">
      <div className="container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col">
            <Badge className="mb-6 w-fit glass-card glow-primary border-primary/30 text-primary bg-slate-900/50 backdrop-blur-xl">
              <MapPin className="mr-1 h-3 w-3" />
              Serving All of Alberta
            </Badge>

            <h1 className="mb-6 text-balance text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl gradient-text">
              Professional Painting Services Across Alberta
            </h1>

            <p className="mb-8 text-pretty text-xl leading-relaxed text-foreground/80">
              Expert painting contractors for residential and commercial projects in Edmonton, Calgary, and throughout
              Alberta. Quality workmanship, reliable service, and competitive pricing.
            </p>

            <div className="mb-10 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild className="text-base glow-primary hover:scale-105 transition-transform">
                <Link href="#contact">
                  Get Free Estimate <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-base glass-card border-primary/30 bg-transparent"
              >
                <Link href="tel:587-501-6994">
                  <Phone className="mr-2 h-5 w-5" />
                  587-501-6994
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="glass-card rounded-xl p-4 glow-primary bg-slate-900/50 backdrop-blur-xl border border-primary/20">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Shield className="h-5 w-5" />
                  <span className="text-3xl font-bold">15+</span>
                </div>
                <p className="text-xs text-muted-foreground">Years Experience</p>
              </div>
              <div className="glass-card rounded-xl p-4 glow-primary bg-slate-900/50 backdrop-blur-xl border border-accent/20">
                <div className="flex items-center gap-2 text-accent mb-2">
                  <Clock className="h-5 w-5" />
                  <span className="text-3xl font-bold">24hr</span>
                </div>
                <p className="text-xs text-muted-foreground">Response Time</p>
              </div>
              <div className="glass-card rounded-xl p-4 glow-primary bg-slate-900/50 backdrop-blur-xl border border-primary/20">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <MapPin className="h-5 w-5" />
                  <span className="text-3xl font-bold">AB</span>
                </div>
                <p className="text-xs text-muted-foreground">Province-Wide</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="glass-card rounded-3xl p-8 glow-primary hover:scale-105 transition-transform duration-500 bg-slate-900/50 backdrop-blur-xl border border-primary/20">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-p2VwnqhuOeU1mMtq4E6D01rJ6EOAmb.jpg"
                alt="WildRose Painters"
                width={500}
                height={500}
                className="rounded-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
