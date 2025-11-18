import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, Clock, MapPin, Phone } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-32 md:py-40 bg-gradient-to-br from-white via-[#fff6ef] to-[#f4ede5]">
      <div className="container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col">
            <Badge className="mb-6 w-fit glass-card border-primary/20 text-primary bg-white/80">
              <MapPin className="mr-1 h-3 w-3" />
              Serving All of Alberta
            </Badge>

            <h1 className="mb-6 text-balance text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl gradient-text">
              Professional Painting Services Across Alberta
            </h1>

            <p className="mb-6 text-pretty text-xl leading-relaxed text-foreground/80">
              Alberta crews on standby for interior, exterior, deck, and fence projects. A dedicated estimator contacts
              you within 24 hours with a written quote and start date options.
            </p>

            <ul className="mb-8 grid gap-3 text-base text-foreground/80 sm:grid-cols-2">
              {[
                "Interior · exterior · commercial crews",
                "Benjamin Moore, Sherwin-Williams, Cloverdale",
                "Insured, WCB-covered, 3-year workmanship",
                "Serving Calgary, Edmonton, Red Deer, + more",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 rounded-xl border border-primary/10 bg-white/70 px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

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
                className="text-base glass-card border-primary/20 bg-white/80 text-foreground"
              >
                <Link href="tel:587-501-6994">
                  <Phone className="mr-2 h-5 w-5" />
                  587-501-6994
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="glass-card rounded-xl p-4 border border-primary/10">
                <div className="mb-2 flex items-center gap-2 text-primary">
                  <Shield className="h-5 w-5" />
                  <span className="text-3xl font-bold">15+</span>
                </div>
                <p className="text-xs text-muted-foreground">Years Experience</p>
              </div>
              <div className="glass-card rounded-xl p-4 border border-accent/20">
                <div className="mb-2 flex items-center gap-2 text-accent">
                  <Clock className="h-5 w-5" />
                  <span className="text-3xl font-bold">24hr</span>
                </div>
                <p className="text-xs text-muted-foreground">Response Time</p>
              </div>
              <div className="glass-card rounded-xl p-4 border border-primary/10">
                <div className="mb-2 flex items-center gap-2 text-primary">
                  <MapPin className="h-5 w-5" />
                  <span className="text-3xl font-bold">AB</span>
                </div>
                <p className="text-xs text-muted-foreground">Province-Wide</p>
              </div>
            </div>

            <div className="mt-10 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">
                Trusted by local partners
              </p>
              <div className="grid gap-4 rounded-2xl border border-white/60 bg-white/80 p-5 shadow-sm md:grid-cols-3">
                <div className="flex flex-col justify-center gap-2 text-left">
                  <p className="text-xs font-semibold text-muted-foreground">Concierge support</p>
                  <p className="text-sm text-foreground/80">
                    Scheduling + fleet coordination for developers, property managers, and relocation teams across Alberta.
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <Image
                    src="/images/edmonton-cars-logo.svg"
                    alt="Local automotive advisor logo"
                    width={140}
                    height={70}
                    className="rounded-xl border border-black/5 bg-[#11151c] p-3"
                  />
                  <p className="text-xs text-muted-foreground">Regional partner collective</p>
                </div>
                <div className="flex flex-col items-end justify-center gap-2 text-right">
                  <p className="text-xs font-semibold text-muted-foreground">Powered by</p>
                  <div className="flex items-center gap-2">
                    <Image src="/images/logo.png" alt="WildRose Painters mark" width={48} height={48} className="rounded-full" />
                    <span className="text-sm font-semibold text-foreground">WildRose Network</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-10 right-6 z-20 rounded-2xl border border-white/40 bg-white/80 px-4 py-3 text-sm shadow-lg shadow-primary/20">
              <p className="font-semibold text-foreground">Avg quote turnaround</p>
              <p className="text-primary">14 hours · 3 available crews</p>
            </div>
            <div className="glass-card rounded-3xl border border-primary/10 p-8 transition-transform duration-500 hover:scale-105">
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
