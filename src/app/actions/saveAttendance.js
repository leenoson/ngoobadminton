"use server"

import { revalidateTag } from "next/cache"
import { createClient } from "@/lib/supabase/server"

export async function saveAttendanceAction(date, checked) {
  const supabase = await createClient()

  await supabase.from("attendance").delete().eq("attend_date", date)

  const rows = checked.map((id) => ({
    member_id: id,
    attend_date: date,
  }))

  if (rows.length) {
    await supabase.from("attendance").insert(rows)
  }

  revalidateTag("top-attendance")
}
