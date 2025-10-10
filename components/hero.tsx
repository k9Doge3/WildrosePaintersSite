import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, Clock, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-rose-500/20 to-pink-500/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-gradient-to-br from-purple-500/20 to-rose-500/20 blur-3xl" />

      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div className="flex flex-col">
            <Badge className="mb-6 w-fit rounded-full bg-gradient-to-r from-rose-500/10 to-pink-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400 hover:glow-on-hover">
              🌹 Alberta's Trusted Painting Network
            </Badge>

            <h1 className="mb-6 text-balance text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl gradient-text">
              Connect With Alberta's Best Local Painting Contractors
            </h1>

            <p className="mb-8 text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
              We coordinate you with the best local painting contractors in your area. From Calgary to Edmonton, get
              matched with verified professionals who deliver exceptional results.
            </p>

            <div className="mb-10 flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                asChild
                className="text-base shadow-lg shadow-rose-500/25 glow-on-hover bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 rounded-full"
              >
                <Link href="#contact">
                  Get Free Estimate <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-base glass-card glow-on-hover bg-transparent rounded-full"
              >
                <Link href="tel:+14035551234">Call (403) 555-1234</Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 border-t border-border/50 pt-8">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-rose-500">
                  <Users className="h-5 w-5" />
                  <span className="text-2xl font-bold">50+</span>
                </div>
                <p className="text-sm text-muted-foreground">Local Contractors</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-rose-500">
                  <Shield className="h-5 w-5" />
                  <span className="text-2xl font-bold">100%</span>
                </div>
                <p className="text-sm text-muted-foreground">Verified Pros</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-rose-500">
                  <Clock className="h-5 w-5" />
                  <span className="text-2xl font-bold">24hr</span>
                </div>
                <p className="text-sm text-muted-foreground">Response Time</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] shadow-2xl glass-card glow-on-hover blob-shape">
              <Image
                src="/images/interior-painting.jpg"
                alt="Professional painter transforming interior space"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-3xl glass-card p-6 shadow-xl glow-on-hover flex items-center gap-4">
              <Image
                src="/images/logo.png"
                alt="WildRose Painters Logo"
                width={60}
                height={60}
                className="rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Serving Alberta</p>
                <p className="text-2xl font-bold gradient-text">Since 2010</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
