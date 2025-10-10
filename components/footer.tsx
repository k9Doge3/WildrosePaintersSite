import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, ExternalLink } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
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
              <span className="text-lg font-bold">WildRose Painters</span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground mb-4">
              Connecting you with Alberta's best painting contractors. Professional service across Edmonton, Calgary,
              and beyond.
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
            <h3 className="mb-4 font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#features" className="text-muted-foreground transition-colors hover:text-primary">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="text-muted-foreground transition-colors hover:text-primary">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-muted-foreground transition-colors hover:text-primary">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-muted-foreground transition-colors hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 font-semibold">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <a href="tel:+15875016994" className="text-muted-foreground hover:text-primary transition-colors">
                  (587) 501-6994
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <a
                  href="mailto:ky.group.solutions@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  ky.group.solutions@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="text-muted-foreground">Edmonton & All of Alberta 🌹</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="mb-4 font-semibold">Follow Us</h3>
            <div className="flex gap-4">
              <Link
                href="https://facebook.com/wildrosepainters"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} WildRose Painters. A KY Group Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
