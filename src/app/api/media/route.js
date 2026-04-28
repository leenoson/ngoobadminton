import { createClient } from "@/lib/supabase/client"

export async function POST(req) {
  console.log("API HIT")
  const supabase = await createClient()
  const body = await req.json()

  const { error } = await supabase.from("media").insert(body)

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ ok: true })
}
