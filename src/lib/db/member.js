import { createClient } from "@/lib/supabase/server"
import { extractIdFromSlug } from "@/lib/slugify"
import { cache } from "react"

export const getMember = cache(async (slug) => {
  const id = extractIdFromSlug(slug)
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
