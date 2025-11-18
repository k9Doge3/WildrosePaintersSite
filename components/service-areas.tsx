import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, House, MapPinned } from "lucide-react"

const serviceAreas = [
  {
    city: "Calgary & Airdrie",
    focus: "Interior repaints, stucco refresh, commercial tenant improvements",
  },
  {
    city: "Edmonton & St. Albert",
    focus: "Heritage restorations, new builds, epoxy floors",
  },
  {
    city: "Red Deer & Central AB",
    focus: "Deck + fence staining, acreage projects, shop painting",
  },
  {
    city: "Fort McMurray & North",
    focus: "Industrial coatings, condos, insurance repaints",
  },
  {
    city: "Lethbridge & South",
    focus: "Exterior weatherproofing, farm buildings, retail",
  },
]

export function ServiceAreas() {
  return (
    <section id="service-areas" className="border-y border-black/5 bg-white/80 py-20">
      <div className="container">
        <div className="mb-12 max-w-3xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-primary">Alberta coverage</p>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Local crews in every major city</h2>
          <p className="text-lg text-muted-foreground">
            We dispatch insured, WCB-covered painting teams from Calgary, Edmonton, Red Deer, Fort McMurray, and Lethbridge hubs.
            Each crew knows the local permitting requirements, winter scheduling quirks, and preferred paint systems.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="glass-card border border-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <MapPinned className="h-5 w-5" />
                Popular Services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>Interior & exterior repaints</p>
              <p>Deck, fence, pergola staining</p>
              <p>Commercial tenant improvements</p>
              <p>Strata & condo maintenance plans</p>
            </CardContent>
          </Card>
          {serviceAreas.map((area) => (
            <Card key={area.city} className="border border-black/5 bg-white/90">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground">{area.city}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>{area.focus}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card className="border border-primary/10 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <House className="h-5 w-5" />
                Residential focus
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>Colour consultations, interior refreshes, exterior curb appeal packages, cabinet refinishing, wallpaper removal.</p>
            </CardContent>
          </Card>
          <Card className="border border-primary/10 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Building2 className="h-5 w-5" />
                Commercial & industrial
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>Office fit-outs, restaurant refreshes, medical & retail spaces, plant maintenance shutdown support.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
