"use client"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center py-20">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Column - Elegant Typography */}
          <div className="flex flex-col space-y-6">
            <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl leading-tight text-white">
              <span className="block text-sky-400">Quality</span>
              <span className="block text-sky-400">Craftsmanship</span>
              <span className="block italic font-light text-white mt-4">meets exquisite</span>
              <span className="block italic font-light text-white">results</span>
            </h1>
          </div>

          {/* Right Column - Large Logo Display */}
          <div className="relative flex items-center justify-center">
            <div className="rounded-3xl overflow-hidden bg-white p-16 shadow-2xl w-full max-w-2xl">
              <Image
                src="/images/design-mode/logo.jpg"
                alt="WildRose Painters Logo"
                width={800}
                height={800}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
