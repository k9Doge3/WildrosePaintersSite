"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface User {
  id: string
  full_name: string
  email: string
}

interface LeadAssignmentProps {
  leadId: string
  currentAssignee?: string
  onAssigned?: () => void
}

export function LeadAssignment({ leadId, currentAssignee, onAssigned }: LeadAssignmentProps) {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<string>(currentAssignee || "unassigned")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users")
      const data = await response.json()
      setUsers(data.users || [])
    } catch (error) {
      console.error("[v0] Error fetching users:", error)
    }
  }

  const handleAssign = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/leads/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId,
          userId: selectedUser || null,
        }),
      })

      if (response.ok) {
        onAssigned?.()
      }
    } catch (error) {
      console.error("[v0] Error assigning lead:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex gap-2">
      <Select value={selectedUser} onValueChange={setSelectedUser}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Assign to..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="unassigned">Unassigned</SelectItem>
          {users.map((user) => (
            <SelectItem key={user.id} value={user.id}>
              {user.full_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={handleAssign} disabled={loading} size="sm">
        Assign
      </Button>
    </div>
  )
}
