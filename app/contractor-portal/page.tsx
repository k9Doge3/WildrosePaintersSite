import type { Metadata } from "next"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { LeadsTable } from "@/components/admin/leads-table"
import { LeadsStats } from "@/components/admin/leads-stats"

export const metadata: Metadata = {
  title: "Contractor Portal | WildRose Painters",
  description: "Manage leads and customer enquiries",
  robots: {
    index: false,
    follow: false,
  },
}

export default async function ContractorPortalPage() {
  const supabase = await getSupabaseServerClient()

  const { data: leads, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching leads:", error)
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">WR</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">WildRose Painters</h1>
              <p className="text-xs text-muted-foreground">Contractor Portal</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold">Lead Management</h2>
          <p className="text-muted-foreground">Track and manage customer enquiries</p>
        </div>

        <LeadsStats leads={leads || []} />
        <LeadsTable leads={leads || []} />
      </main>
    </div>
  )
}
