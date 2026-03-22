"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { randomUUID } from "crypto"

export async function getTopAttendance() {
  const supabase = await createClient()

  const { data, error } = await supabase.rpc("get_top_members")

  if (error) {
    console.error(error)
    return []
  }

  return data
}

export async function addMember(formData) {
  const supabase = await createClient()

  const name = formData.get("name")
  const joined_at = formData.get("joined_at")
  const avatar = formData.get("avatar")

  let avatarUrl = null

  if (avatar && avatar.size > 0) {
    const mimeType = avatar.type || "image/jpeg"
    let fileExt = mimeType.split("/")[1]

    const allowedTypes = ["jpeg", "jpg", "png", "webp"]
    if (!allowedTypes.includes(fileExt)) {
      fileExt = "jpg"
    }

    const fileName = `${randomUUID()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(fileName, avatar, {
        contentType: mimeType,
      })

    if (uploadError) {
      console.error(uploadError)
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(fileName)

    avatarUrl = data.publicUrl
  }

  await supabase.from("members").insert({
    name,
    joined_at,
    avatar: avatarUrl,
  })

  revalidatePath("admin/members")
}

export async function deleteMember(id, avatar) {
  const supabase = await createClient()

  if (avatar) {
    const path = avatar.split("/avatars/")[1]

    await supabase.storage.from("avatars").remove([path])
  }

  await supabase.from("members").delete().eq("id", id)

  revalidatePath("admin/members")
}

export async function updateMember(formData) {
  const supabase = await createClient()

  const id = formData.get("id")
  const name = formData.get("name")
  const joined_at = formData.get("joined_at")
  const avatarFile = formData.get("avatar")

  const { data: oldMember } = await supabase
    .from("members")
    .select("avatar")
    .eq("id", id)
    .single()

  let avatarUrl = null

  if (avatarFile && avatarFile.size > 0) {
    const mimeType = avatarFile.type || "image/jpeg"
    let fileExt = mimeType.split("/")[1]

    const allowedTypes = ["jpeg", "jpg", "png", "webp"]
    if (!allowedTypes.includes(fileExt)) {
      fileExt = "jpg"
    }

    const fileName = `${randomUUID()}.${fileExt}`

    await supabase.storage.from("avatars").upload(fileName, avatarFile, {
      contentType: mimeType,
    })

    const { data } = supabase.storage.from("avatars").getPublicUrl(fileName)

    avatarUrl = data.publicUrl

    if (oldMember?.avatar) {
      const oldPath = oldMember.avatar.split("/avatars/")[1]

      if (oldPath) {
        await supabase.storage.from("avatars").remove([oldPath])
      }
    }
  }

  const updateData = {
    name,
    joined_at,
  }

  if (avatarUrl) {
    updateData.avatar = avatarUrl
  }

  await supabase.from("members").update(updateData).eq("id", id)

  revalidatePath("admin/members")
}
