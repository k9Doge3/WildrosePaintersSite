import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const { leadId, userId } = body

    if (!leadId) {
      return NextResponse.json({ error: "Lead ID is required" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("leads")
      .update({ assigned_to: userId || null, updated_at: new Date().toISOString() })
      .eq("id", leadId)
      .select()
      .single()

    if (error) {
      console.error("[v0] Error assigning lead:", error)
      return NextResponse.json({ error: "Failed to assign lead" }, { status: 500 })
    }

    return NextResponse.json({ success: true, lead: data }, { status: 200 })
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
