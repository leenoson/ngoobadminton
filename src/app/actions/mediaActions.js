// app/actions/mediaActions.js
"use server"

import { createAdminClient } from "@/lib/supabase/admin"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getMedia() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("media")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error

  return data
}

export async function uploadMedia(formData) {
  const supabase = await createClient()

  const files = formData.getAll("files")

  if (files.length > 10) {
    throw new Error("Max 10 files per upload")
  }

  const results = []

  for (const file of files) {
    const ext = file.name.split(".").pop()
    const fileName = `${crypto.randomUUID()}.${ext}`
    const path = `media/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from("media")
      .upload(path, file)

    if (uploadError) throw uploadError

    const { data: publicUrl } = supabase.storage
      .from("media")
      .getPublicUrl(path)

    const type = file.type.startsWith("video") ? "video" : "image"

    const { data, error } = await supabase
      .from("media")
      .insert({
        name: file.name,
        url: publicUrl.publicUrl,
        type,
      })
      .select()
      .single()

    if (error) throw error

    results.push(data)
  }

  return results
}

export async function deleteMedia(ids) {
  const supabase = createAdminClient()

  // get files
  const { data } = await supabase.from("media").select("url").in("id", ids)

  // delete DB
  const { error } = await supabase.from("media").delete().in("id", ids)

  if (error) throw error

  // delete storage
  const paths =
    data?.map((m) => m.url.split("/media/")[1]).filter(Boolean) || []

  if (paths.length) {
    await supabase.storage.from("media").remove(paths)
  }

  revalidatePath("/admin/gallery")

  return { success: true }
}

// export async function deleteMedia(ids) {
//   const supabase = createAdminClient()

//   const { data, error } = await supabase
//     .from("media")
//     .select("url")
//     .in("id", ids)

//   if (error) throw error

//   const paths = data.map(
//     (item) => item.url.split("/storage/v1/object/public/media/")[1],
//   )

//   if (paths.length) {
//     const { error: storageError } = await supabase.storage
//       .from("media")
//       .remove(paths)

//     if (storageError) throw storageError
//   }

//   const { error: deleteError } = await supabase
//     .from("media")
//     .delete()
//     .in("id", ids)

//   if (deleteError) throw deleteError
// }

export async function updateCaption(id, caption) {
  const supabase = await createClient()

  await supabase.from("media").update({ caption }).eq("id", id)
}
