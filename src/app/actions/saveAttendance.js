"use server"

import { revalidateTag } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function saveAttendanceAction(date, checked) {
  const supabase = createAdminClient()

  const { error: deleteError } = await supabase
    .from("attendance")
    .delete()
    .eq("attend_date", date)

  if (deleteError) {
    console.error("DELETE ERROR:", deleteError)
    throw deleteError
  }

  const rows = checked.map((id) => ({
    member_id: id,
    attend_date: date,
  }))

  if (rows.length) {
    const { error: insertError } = await supabase
      .from("attendance")
      .insert(rows)

    if (insertError) {
      console.error("INSERT ERROR:", insertError)
      throw insertError
    }
  }

  revalidateTag("top-attendance")
}
