import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Gallery } from "@/components/gallery"
import { Testimonials } from "@/components/testimonials"
import { Pricing } from "@/components/pricing"
import { Footer } from "@/components/footer"
import { ProjectShowcase } from "@/components/project-showcase"
import { CTA } from "@/components/cta"
import { InteractiveEstimateForm } from "@/components/interactive-estimate-form"

export const metadata: Metadata = {
  title: "WildRose Painters | Professional Painting Contractors in Calgary, Edmonton & Alberta",
  description:
    "Connect with Alberta's best local painting contractors. Serving Calgary, Edmonton, Red Deer, Lethbridge, Fort McMurray & all Alberta communities. Residential & commercial painting, deck staining, fence painting. Free quotes from trusted local pros.",
  keywords: [
    "painters Calgary",
    "painters Edmonton",
    "painting services Alberta",
    "house painters Calgary",
    "commercial painters Edmonton",
    "residential painting Alberta",
    "deck staining Calgary",
    "fence painting Edmonton",
    "interior painting Red Deer",
    "exterior painting Lethbridge",
    "painting contractors Alberta",
    "local painters near me",
    "painters Fort McMurray",
    "painters Airdrie",
    "painters Okotoks",
    "painters Cochrane",
    "painters Canmore",
    "painters Banff",
    "Alberta painting companies",
    "Rocky Mountain painters",
  ],
  authors: [{ name: "Karim Youssef", url: "https://kygroup.ca" }],
  creator: "Karim Youssef",
  publisher: "WildRose Painters",
  openGraph: {
    title: "WildRose Painters | Alberta's Premier Painting Contractor Network",
    description:
      "Connect with the best local painting contractors in Calgary, Edmonton, Red Deer & across Alberta. Professional residential & commercial painting services.",
    url: "https://wildrosepainters.ca",
    siteName: "WildRose Painters",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "WildRose Painters - Alberta's Trusted Painting Contractor Network",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WildRose Painters | Alberta Painting Contractors",
    description: "Connect with top-rated local painters in Calgary, Edmonton & across Alberta",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://wildrosepainters.ca",
  },
  other: {
    "geo.region": "CA-AB",
    "geo.placename": "Alberta, Canada",
    "geo.position": "53.9333;-116.5765",
  },
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <section className="py-20 md:py-32 bg-background/50">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl gradient-text">See the WildRose Difference</h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Real transformations from homes and businesses across Alberta. Quality work that withstands our harsh
                climate.
              </p>
            </div>
            <div className="grid gap-12 md:grid-cols-2">
              {/* Fence Staining Project */}
              <ProjectShowcase
                title="Fence Staining & Restoration"
                location="Edmonton, AB"
                beforeImage="/images/fence-before-unstained.jpg"
                afterImage="/images/fence-after-stained.jpg"
                beforeAlt="Weathered unstained wooden fence"
                afterAlt="Beautifully stained wooden fence in warm honey tone"
                details={[
                  {
                    title: "Protect Your Fence Investment",
                    content:
                      "Alberta's freeze-thaw cycles destroy untreated wood fences. Professional staining penetrates deep into the wood, creating a moisture barrier that prevents rot, warping, and splitting. A properly stained fence lasts 15-20 years vs 5-7 years untreated.",
                  },
                  {
                    title: "Quality Staining vs Quick Jobs",
                    content:
                      "Cheap fence staining uses watered-down stain applied in one thin coat. Quality work includes power washing, wood brightening, proper drying time, and 2 coats of premium oil-based or solid stain. We ensure even coverage, no drips, and protection that actually lasts through Alberta winters.",
                  },
                  {
                    title: "Why Choose Our Network",
                    content:
                      "Our contractors use only premium stains like Sikkens, Cabot, or Olympic that are specifically rated for Canadian climates. They understand Alberta wood species (cedar, pine, spruce) and apply the right products for maximum longevity. Plus, we coordinate timing around Alberta's unpredictable weather.",
                  },
                ]}
              />

              {/* Deck Staining Project */}
              <ProjectShowcase
                title="Deck Staining & Sealing"
                location="Red Deer, AB"
                beforeImage="/images/deck-before.png"
                afterImage="/images/deck-after.png"
                beforeAlt="Weathered deck before staining"
                afterAlt="Beautiful restored deck after professional staining"
                details={[
                  {
                    title: "Deck Staining Essentials",
                    content:
                      "Your deck faces constant UV exposure, rain, snow, and foot traffic. Professional deck staining restores the wood's natural beauty while creating a protective barrier against moisture and sun damage. Proper staining prevents costly deck replacement and keeps your outdoor space safe and beautiful.",
                  },
                  {
                    title: "The Quality Difference",
                    content:
                      "Low-quality deck work skips sanding, uses cheap stain, and ignores proper prep. High-quality work includes thorough cleaning, sanding, wood conditioning, and 2-3 coats of premium penetrating stain or sealer. Our contractors also inspect for loose boards, protruding nails, and structural issues before staining.",
                  },
                  {
                    title: "Alberta Deck Expertise",
                    content:
                      "Alberta decks need special care due to our extreme temperature swings (-40°C to +35°C). Our network uses only premium deck stains rated for harsh climates, applies them during optimal weather windows (15-25°C, low humidity), and guarantees proper penetration and protection. We also offer maintenance plans to keep your deck looking great year after year.",
                  },
                ]}
              />
            </div>
          </div>
        </section>
        <Features />
        <Gallery />
        <Testimonials />
        <Pricing />
        <section id="contact" className="py-20 md:py-32">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Get Your Free Custom Estimate</h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Answer a few quick questions and we'll connect you with the best local painting contractor in your
                Alberta community
              </p>
            </div>
            <InteractiveEstimateForm />
          </div>
        </section>
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
