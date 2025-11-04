"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur-xl bg-background/80">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 transition-all hover:opacity-80">
          <Image
            src="/images/logo.png"
            alt="WildRose Painters"
            width={50}
            height={50}
            className="h-12 w-12 rounded-full"
          />
          <span className="text-xl font-semibold text-white">Wildrose Painters</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="#services" className="font-medium text-white/90 transition-colors hover:text-white text-lg">
            Services
          </Link>
          <Link href="#gallery" className="font-medium text-white/90 transition-colors hover:text-white text-lg">
            Gallery
          </Link>
          <Link href="#testimonials" className="font-medium text-white/90 transition-colors hover:text-white text-lg">
            Projects
          </Link>
          <Link href="#pricing" className="font-medium text-white/90 transition-colors hover:text-white text-lg">
            Estimates
          </Link>
          <Link
            href="/contractor-portal"
            className="font-medium text-white/90 transition-colors hover:text-white text-lg"
          >
            Contractor Portal
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="tel:+15875016994"
            className="hidden items-center gap-2 transition-colors hover:text-rose-300 lg:flex font-semibold text-rose-400 text-lg"
          >
            <Phone className="h-5 w-5" />
            (587) 501-6994
          </a>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-border/50 md:hidden backdrop-blur-xl bg-background/95">
          <nav className="container flex flex-col gap-4 py-4">
            <Link
              href="#services"
              className="text-sm font-medium text-white/80 transition-colors hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="#gallery"
              className="text-sm font-medium text-white/80 transition-colors hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-white/80 transition-colors hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-white/80 transition-colors hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Estimates
            </Link>
            <Link
              href="/contractor-portal"
              className="text-sm font-medium text-white/80 transition-colors hover:text-white"
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
            <Button asChild className="w-full rounded-full bg-primary hover:bg-primary/90" size="lg">
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
