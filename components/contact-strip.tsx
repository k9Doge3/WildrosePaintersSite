import { Phone, Clock3, MapPin } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function ContactStrip() {
  return (
    <section className="border-y border-black/5 bg-gradient-to-r from-white via-primary/5 to-white py-4 text-sm">
      <div className="container grid gap-4 text-center sm:text-left md:grid-cols-4">
        <div className="flex items-center justify-center gap-2 text-foreground md:justify-start">
          <Phone className="h-4 w-4 text-primary" />
          <p>
            Talk to an estimator: <Link href="tel:587-501-6994" className="font-semibold text-primary">587-501-6994</Link>
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 text-muted-foreground md:justify-start">
          <Clock3 className="h-4 w-4 text-primary" />
          <p>Quotes delivered in under 24 hours · 7 days a week</p>
        </div>
        <div className="flex items-center justify-center gap-2 text-muted-foreground md:justify-start">
          <MapPin className="h-4 w-4 text-primary" />
          <p>Calgary · Edmonton · Red Deer · Fort McMurray · Lethbridge</p>
        </div>
        <div className="flex items-center justify-center gap-2 md:justify-end">
          <Button asChild size="sm" className="glow-primary text-xs">
            <Link href="#contact">Book a Quote</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
