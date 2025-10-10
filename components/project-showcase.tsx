"use client"

import { useState } from "react"
import { BeforeAfterSlider } from "./before-after-slider"
import { Card } from "./ui/card"
import { ChevronDown } from "lucide-react"

interface ProjectShowcaseProps {
  title: string
  location: string
  beforeImage: string
  afterImage: string
  beforeAlt: string
  afterAlt: string
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
  beforeAlt,
  afterAlt,
  details,
}: ProjectShowcaseProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      <BeforeAfterSlider beforeImage={beforeImage} afterImage={afterImage} beforeAlt={beforeAlt} afterAlt={afterAlt} />
      <p className="text-center text-sm text-muted-foreground">
        {title} - {location}
      </p>

      <div className="space-y-2">
        {details.map((detail, index) => (
          <Card key={index} className="glass-card overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-muted/50"
            >
              <span className="font-semibold text-sm">{detail.title}</span>
              <ChevronDown className={`h-5 w-5 transition-transform ${openIndex === index ? "rotate-180" : ""}`} />
            </button>
            {openIndex === index && (
              <div className="border-t px-4 py-3 text-sm text-muted-foreground leading-relaxed">{detail.content}</div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
