import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, ExternalLink } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50 backdrop-blur-xl">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="WildRose Painters Logo"
                width={48}
                height={48}
                className="rounded-full"
              />
              <span className="text-lg font-bold text-white">WildRose Painters</span>
            </div>
            <p className="text-sm leading-relaxed text-white/70 mb-4">
              Connecting you with Alberta&#39;s best painting contractors. Professional service across Edmonton, and
              beyond.
            </p>
            <Link
              href="https://kygroup.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-rose-500 hover:text-rose-600 transition-colors"
            >
              Part of KY Group <ExternalLink className="h-3 w-3" />
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#features" className="text-white/70 transition-colors hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="text-white/70 transition-colors hover:text-white">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-white/70 transition-colors hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-white/70 transition-colors hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href="tel:+15875016994" className="text-white/70 hover:text-white transition-colors">
                  (587) 501-6994
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a
                  href="mailto:ky.group.solutions@gmail.com"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  ky.group.solutions@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-white/70">Edmonton & All of Alberta 🌹</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Follow Us</h3>
            <div className="flex gap-4">
              <Link
                href="https://facebook.com/wildrosepainters"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all hover:border-primary hover:bg-primary/20 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all hover:border-primary hover:bg-primary/20 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all hover:border-primary hover:bg-primary/20 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border/50 pt-8 text-center text-sm text-white/60">
          <p>&copy; {new Date().getFullYear()} WildRose Painters. A KY Group Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
