import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Clock, CheckCircle, TrendingUp } from "lucide-react"

interface Lead {
  id: string
  status: string
  created_at: string
}

interface LeadsStatsProps {
  leads: Lead[]
}

export function LeadsStats({ leads }: LeadsStatsProps) {
  const totalLeads = leads.length
  const newLeads = leads.filter((lead) => lead.status === "new").length
  const contactedLeads = leads.filter((lead) => lead.status === "contacted").length

  // Calculate leads from last 7 days
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  const recentLeads = leads.filter((lead) => new Date(lead.created_at) >= sevenDaysAgo).length

  const stats = [
    {
      title: "Total Leads",
      value: totalLeads,
      icon: Users,
      description: "All time",
    },
    {
      title: "New Leads",
      value: newLeads,
      icon: Clock,
      description: "Awaiting contact",
    },
    {
      title: "Contacted",
      value: contactedLeads,
      icon: CheckCircle,
      description: "In progress",
    },
    {
      title: "Last 7 Days",
      value: recentLeads,
      icon: TrendingUp,
      description: "Recent activity",
    },
  ]

  return (
    <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
