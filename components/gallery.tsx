"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"

export function Gallery() {
  return (
    <section id="gallery" className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background to-background/80" />

      <div className="container relative z-10">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-balance text-4xl font-serif font-bold md:text-5xl lg:text-6xl text-primary">
            Our Work Speaks for Itself
          </h2>
          <p className="text-pretty text-xl leading-relaxed text-muted-foreground">
            See the quality and attention to detail that sets WildRose Painters apart
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-[300px]">
          {/* Real Fence Staining - Large featured */}
          <div className="lg:col-span-2 lg:row-span-2">
            <Card className="group relative h-full overflow-hidden border-primary/30 hover:shadow-xl hover:border-primary/50 transition-all bg-card/50 backdrop-blur-sm">
              <Image
                src="/images/fence-after-stained.jpg"
                alt="Professional fence staining in Edmonton"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 66vw"
                priority
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
              <div className="absolute bottom-8 left-8 z-10">
                <div className="inline-block px-4 py-2 rounded-full bg-primary/20 backdrop-blur-xl border border-primary/30 mb-4 text-sm font-semibold">
                  Featured Project
                </div>
                <p className="text-3xl font-bold mb-2">Professional Fence Staining</p>
                <p className="text-lg text-muted-foreground">Edmonton Residential • Premium Protection</p>
              </div>
            </Card>
          </div>

          {/* Other projects */}
          {[
            {
              src: "/images/deck-staining-complete.jpg",
              title: "Deck Staining",
              location: "Red Deer Project",
              span: "",
            },
            {
              src: "/images/exterior-house-painting.jpg",
              title: "Exterior Painting",
              location: "Complete transformation",
              span: "lg:row-span-2",
            },
            {
              src: "/images/fence-before-unstained.jpg",
              title: "Before Restoration",
              location: "Weathered fence",
              span: "",
              badge: "Before",
            },
            {
              src: "/images/commercial-painting.jpg",
              title: "Commercial Project",
              location: "Professional finish",
              span: "",
            },
            {
              src: "/images/interior-room-painted.jpg",
              title: "Interior Painting",
              location: "Flawless finish",
              span: "",
            },
          ].map((project, index) => (
            <div key={index} className={project.span}>
              <Card className="group relative h-full overflow-hidden border-primary/20 hover:shadow-lg hover:border-primary/40 transition-all bg-card/50 backdrop-blur-sm">
                <Image
                  src={project.src || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  unoptimized
                />
                {project.badge && (
                  <div className="absolute top-4 left-4 rounded-full bg-background/90 backdrop-blur-sm border border-primary/10 px-4 py-2 text-sm font-semibold shadow-lg z-10">
                    {project.badge}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-6 left-6">
                    <p className="text-xl font-bold mb-1">{project.title}</p>
                    <p className="text-sm text-muted-foreground">{project.location}</p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
