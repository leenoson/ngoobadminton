import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req) {
  const supabase = await createClient()

  const formData = await req.formData()
  const files = formData.getAll("files")

  const results = []

  for (const file of files) {
    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${fileExt}`

    const filePath = `media/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from("media") // tên bucket
      .upload(filePath, file, {
        contentType: file.type,
      })

    if (uploadError) {
      console.error(uploadError)
      continue
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("media").getPublicUrl(filePath)

    const type = file.type.startsWith("video") ? "video" : "image"

    const { error: dbError } = await supabase.from("media").insert({
      name: file.name,
      url: publicUrl,
      type,
      caption: "",
    })

    if (dbError) {
      console.error(dbError)
    }

    results.push(publicUrl)
  }

  return NextResponse.json({ success: true, results })
}
