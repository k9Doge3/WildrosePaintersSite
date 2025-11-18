"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { Mail, Phone, Building2, Calendar, Eye } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Lead {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  service_interest: string | null
  message: string | null
  status: string
  source: string
  created_at: string
}

interface LeadsTableProps {
  leads: Lead[]
}

export function LeadsTable({ leads: initialLeads }: LeadsTableProps) {
  const [leads, setLeads] = useState(initialLeads)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    const supabase = getSupabaseBrowserClient()

    const { error } = await supabase
      .from("leads")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", leadId)

    if (!error) {
      setLeads((prevLeads) => prevLeads.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead)))
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      case "contacted":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
      case "qualified":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "converted":
        return "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20"
      case "lost":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const viewLeadDetails = (lead: Lead) => {
    setSelectedLead(lead)
    setIsDialogOpen(true)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>All Leads</CardTitle>
          <CardDescription>View and manage customer inquiries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      No leads yet
                    </TableCell>
                  </TableRow>
                ) : (
                  leads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{lead.name}</p>
                          {lead.company && (
                            <p className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Building2 className="h-3 w-3" />
                              {lead.company}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="flex items-center gap-1 text-sm">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            <a href={`mailto:${lead.email}`} className="hover:underline">
                              {lead.email}
                            </a>
                          </p>
                          {lead.phone && (
                            <p className="flex items-center gap-1 text-sm">
                              <Phone className="h-3 w-3 text-muted-foreground" />
                              <a href={`tel:${lead.phone}`} className="hover:underline">
                                {lead.phone}
                              </a>
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm capitalize">
                          {lead.service_interest?.replace(/-/g, " ") || "Not specified"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Select value={lead.status} onValueChange={(value) => updateLeadStatus(lead.id, value)}>
                          <SelectTrigger className="w-[130px]">
                            <SelectValue>
                              <Badge variant="secondary" className={getStatusColor(lead.status)}>
                                {lead.status}
                              </Badge>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="qualified">Qualified</SelectItem>
                            <SelectItem value="converted">Converted</SelectItem>
                            <SelectItem value="lost">Lost</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {formatDate(lead.created_at)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => viewLeadDetails(lead)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Lead Details</DialogTitle>
            <DialogDescription>Complete information about this lead</DialogDescription>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Name</p>
                  <p className="text-base">{selectedLead.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="text-base">
                    <a href={`mailto:${selectedLead.email}`} className="hover:underline">
                      {selectedLead.email}
                    </a>
                  </p>
                </div>
                {selectedLead.phone && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                    <p className="text-base">
                      <a href={`tel:${selectedLead.phone}`} className="hover:underline">
                        {selectedLead.phone}
                      </a>
                    </p>
                  </div>
                )}
                {selectedLead.company && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Company</p>
                    <p className="text-base">{selectedLead.company}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Service Interest</p>
                  <p className="text-base capitalize">
                    {selectedLead.service_interest?.replace(/-/g, " ") || "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge variant="secondary" className={getStatusColor(selectedLead.status)}>
                    {selectedLead.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Source</p>
                  <p className="text-base capitalize">{selectedLead.source.replace(/_/g, " ")}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Submitted</p>
                  <p className="text-base">{formatDate(selectedLead.created_at)}</p>
                </div>
              </div>
              {selectedLead.message && (
                <div>
                  <p className="mb-2 text-sm font-medium text-muted-foreground">Project Details</p>
                  <div className="rounded-lg bg-muted p-4">
                    <p className="whitespace-pre-wrap leading-relaxed">{selectedLead.message}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
