"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="container flex h-24 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 glow-on-hover transition-all">
          <Image
            src="/images/logo.png"
            alt="WildRose Painters"
            width={80}
            height={80}
            className="h-20 w-20 rounded-full"
          />
          <span className="text-2xl font-bold gradient-text">WildRose Painters</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="#services" className="text-sm font-medium transition-colors hover:text-primary">
            Services
          </Link>
          <Link href="#gallery" className="text-sm font-medium transition-colors hover:text-primary">
            Gallery
          </Link>
          <Link href="#testimonials" className="text-sm font-medium transition-colors hover:text-primary">
            Projects
          </Link>
          <Link href="#pricing" className="text-sm font-medium transition-colors hover:text-primary">
            Estimates
          </Link>
          <Link href="/contractor-portal" className="text-sm font-medium transition-colors hover:text-primary">
            Contractor Portal
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:+15875016994"
            className="hidden items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80 lg:flex"
          >
            <Phone className="h-4 w-4" />
            (587) 501-6994
          </a>
          <Button
            asChild
            size="lg"
            className="hidden md:inline-flex rounded-full bg-gradient-to-r from-[#c46b3c] to-[#e8a86d] text-white shadow-lg"
          >
            <Link href="#contact">Free Estimate</Link>
          </Button>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-black/5 md:hidden bg-white">
          <nav className="container flex flex-col gap-4 py-4">
            <Link
              href="#services"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="#gallery"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Estimates
            </Link>
            <Link
              href="/contractor-portal"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contractor Portal
            </Link>
            <a
              href="tel:+15875016994"
              className="flex items-center gap-2 text-sm font-semibold text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Phone className="h-4 w-4" />
              (587) 501-6994
            </a>
            <Button asChild className="w-full rounded-full bg-gradient-to-r from-[#c46b3c] to-[#e8a86d]" size="lg">
              <Link href="#contact" onClick={() => setMobileMenuOpen(false)}>
                Free Estimate
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
