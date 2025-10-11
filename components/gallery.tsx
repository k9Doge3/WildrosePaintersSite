import Image from "next/image"
import { Card } from "@/components/ui/card"

export function Gallery() {
  return (
    <section id="gallery" className="py-20 md:py-32 bg-slate-900/30">
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold md:text-5xl gradient-text">Our Work Speaks for Itself</h2>
          <p className="text-pretty text-lg leading-relaxed text-slate-400">
            See the quality and attention to detail that sets WildRose Painters apart
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Real Fence Staining Project */}
          <Card className="glass-card group relative aspect-[4/3] overflow-hidden border-primary/20 hover:glow-primary transition-all">
            <Image
              src="/images/fence-after-stained.jpg"
              alt="Professional fence staining in Edmonton"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-xl font-bold mb-1">Fence Staining</p>
                <p className="text-sm text-slate-300">Edmonton Residential</p>
              </div>
            </div>
          </Card>

          <Card className="glass-card group relative aspect-[4/3] overflow-hidden border-primary/20 hover:glow-primary transition-all">
            <Image
              src="/images/deck-staining-complete.jpg"
              alt="Professional deck staining project"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-xl font-bold mb-1">Deck Staining</p>
                <p className="text-sm text-slate-300">Red Deer Project</p>
              </div>
            </div>
          </Card>

          <Card className="glass-card group relative aspect-[4/3] overflow-hidden border-primary/20 hover:glow-primary transition-all">
            <Image
              src="/images/exterior-house-painting.jpg"
              alt="Professional exterior house painting"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-xl font-bold mb-1">Exterior Painting</p>
                <p className="text-sm text-slate-300">Complete home transformation</p>
              </div>
            </div>
          </Card>

          {/* Before Fence */}
          <Card className="glass-card group relative aspect-[4/3] overflow-hidden border-primary/20 hover:glow-primary transition-all">
            <Image
              src="/images/fence-before-unstained.jpg"
              alt="Fence before professional staining"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized
            />
            <div className="absolute top-4 left-4 rounded-full bg-slate-900/90 backdrop-blur-sm border border-white/10 px-4 py-2 text-sm font-semibold shadow-lg">
              Before
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-xl font-bold mb-1">Weathered Fence</p>
                <p className="text-sm text-slate-300">Before restoration</p>
              </div>
            </div>
          </Card>

          <Card className="glass-card group relative aspect-[4/3] overflow-hidden border-primary/20 hover:glow-primary transition-all">
            <Image
              src="/images/commercial-painting.jpg"
              alt="Commercial painting project"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-xl font-bold mb-1">Commercial Project</p>
                <p className="text-sm text-slate-300">Professional finish</p>
              </div>
            </div>
          </Card>

          <Card className="glass-card group relative aspect-[4/3] overflow-hidden border-primary/20 hover:glow-primary transition-all">
            <Image
              src="/images/interior-room-painted.jpg"
              alt="Professional interior room painting"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-xl font-bold mb-1">Interior Painting</p>
                <p className="text-sm text-slate-300">Flawless finish</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
