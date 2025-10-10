import Image from "next/image"
import { Card } from "@/components/ui/card"

export function Gallery() {
  return (
    <section id="gallery" className="py-20 md:py-32">
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold md:text-5xl">Our Work Speaks for Itself</h2>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            See the quality and attention to detail that sets WildRose Painters apart
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="group relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/interior-painting.jpg"
              alt="Professional interior painting project"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-lg font-semibold">Interior Painting</p>
                <p className="text-sm">Modern residential project</p>
              </div>
            </div>
          </Card>

          <Card className="group relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/team-painting.jpg"
              alt="Professional painting team at work"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-lg font-semibold">Commercial Project</p>
                <p className="text-sm">Expert team in action</p>
              </div>
            </div>
          </Card>

          <Card className="group relative aspect-[4/3] overflow-hidden bg-muted">
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">500+</p>
                <p className="text-sm text-muted-foreground">Completed Projects</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
