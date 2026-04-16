import { createClient } from "@/lib/supabase/server"
import { cache } from "react"

export const getMember = cache(async (id) => {
  if (!id) return null

  const supabase = await createClient()

  const { data, error } = await supabase
    .from("members")
    .select("*")
    .eq("id", id)
    .single()

  if (error) return null

  return data
})
