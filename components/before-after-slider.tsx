"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  beforeAlt?: string
  afterAlt?: string
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt = "Before painting",
  afterAlt = "After painting",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100))
    setSliderPosition(percent)
  }

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const rect = e.currentTarget.getBoundingClientRect()
    handleMove(e.clientX, rect)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    handleMove(e.touches[0].clientX, rect)
  }

  return (
    <Card
      className="relative aspect-[4/3] w-full cursor-col-resize select-none overflow-hidden rounded-3xl glass-card glow-on-hover"
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0">
        <Image
          src={afterImage || "/placeholder.svg"}
          alt={afterAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          unoptimized
        />
        <div className="absolute bottom-4 right-4 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg">
          After
        </div>
      </div>

      {/* Before Image (Clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
        <Image
          src={beforeImage || "/placeholder.svg"}
          alt={beforeAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          unoptimized
        />
        <div className="absolute bottom-4 left-4 rounded-full bg-muted px-4 py-2 text-sm font-semibold shadow-lg">
          Before
        </div>
      </div>

      {/* Slider Line */}
      <div className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl" style={{ left: `${sliderPosition}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-xl">
          <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </div>
      </div>
    </Card>
  )
}
