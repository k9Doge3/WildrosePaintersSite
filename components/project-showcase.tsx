"use client"

import { useState } from "react"
import { Card } from "./ui/card"
import { ChevronDown } from "lucide-react"
import Image from "next/image"

interface ProjectShowcaseProps {
  title: string
  location: string
  beforeImage?: string
  afterImage?: string
  beforeAlt?: string
  afterAlt?: string
  details: {
    title: string
    content: string
  }[]
}

export function ProjectShowcase({
  title,
  location,
  beforeImage,
  afterImage,
  beforeAlt = "Before",
  afterAlt = "After",
  details,
}: ProjectShowcaseProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-4 glass-card rounded-3xl p-8 transition-all duration-500 hover:scale-105 hover:glow-primary group">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold gradient-text mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
          {location}
        </p>
      </div>

      {beforeImage && afterImage && (
        <div className="grid gap-4 md:grid-cols-2 mb-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-primary/20">
            <Image
              src={beforeImage || "/placeholder.svg"}
              alt={beforeAlt}
              fill
              className="object-cover transition-transform duration-500 hover:scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute bottom-3 left-3 rounded-full border border-black/5 bg-white/90 px-3 py-1.5 text-xs font-semibold">
              Before
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-primary/20">
            <Image
              src={afterImage || "/placeholder.svg"}
              alt={afterAlt}
              fill
              className="object-cover transition-transform duration-500 hover:scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute bottom-3 left-3 rounded-full bg-gradient-to-r from-primary to-amber-300/80 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
              After
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {details.map((detail, index) => (
          <Card
            key={index}
            className="glass-card overflow-hidden transition-all duration-300 hover:glow-primary hover:border-primary/40 hover:scale-[1.02] border-primary/20"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-primary/10"
            >
              <span className="font-semibold text-base text-foreground">{detail.title}</span>
              <ChevronDown
                className={`h-5 w-5 text-primary transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
              />
            </button>
            {openIndex === index && (
              <div className="border-t border-primary/20 px-5 py-4 text-sm text-foreground/70 leading-relaxed animate-in slide-in-from-top-2">
                {detail.content}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
