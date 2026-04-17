"use server"

import { revalidatePath, unstable_cache } from "next/cache"
import { randomUUID } from "crypto"
import { createAdminClient } from "@/lib/supabase/admin"
import { createClient } from "@/lib/supabase/server"

export const getNewestMember = async () => {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from("members")
    .select("id, name")
    .order("joined_at", { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) {
    console.error(error)
    return []
  }

  return data
}

export const getTopAttendance = unstable_cache(
  async () => {
    const supabase = createAdminClient()

    // Dùng RPC trong supabase
    // const { data, error } = await supabase.rpc("get_top_members")
    // return data

    // Dùng query tại đây
    // const { data, error } = await supabase.from("members").select(
    //   `
    //     id,
    //     name,
    //     avatar,
    //     nickname,
    //     attendance(count)
    //   `,
    // )
    // return data
    //   .map((item) => ({
    //     ...item,
    //     attendance_count: item.attendance?.count || 0,
    //   }))
    //   .sort((a, b) => b.attendance_count - a.attendance_count)
    //   .slice(0, 10)

    // Dùng View trong supabase
    const { data, error } = await supabase
      .from("top_members")
      .select("*")
      .order("attendance_count", { ascending: false })
      .limit(10)

    if (error) {
      console.error(error)
      return []
    }

    return data
  },
  ["top-attendance"],
  {
    tags: ["top-attendance"],
    revalidate: 60,
  },
)

export async function addMember(formData) {
  const supabase = await createClient()

  try {
    const name = formData.get("name")

    const nickname = formData.get("nickname")
    const level = formData.get("level")

    const joined_at = formData.get("joined_at")
    const avatar = formData.get("avatar")

    let avatarUrl = null

    if (avatar && avatar.size > 0) {
      const mimeType = avatar.type || "image/jpeg"
      let fileExt = mimeType.split("/")[1]

      const allowedTypes = ["jpeg", "jpg", "png", "webp"]
      if (!allowedTypes.includes(fileExt)) {
        throw new Error("Ảnh phải là jpg, png hoặc webp")
      }

      const fileName = `${randomUUID()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, avatar, {
          contentType: mimeType,
        })

      if (uploadError) {
        throw new Error("Upload avatar thất bại")
      }

      const { data } = supabase.storage.from("avatars").getPublicUrl(fileName)

      avatarUrl = data.publicUrl
    }

    const { error: insertError } = await supabase.from("members").insert({
      name,
      nickname,
      level,
      joined_at,
      avatar: avatarUrl,
    })

    if (insertError) {
      if (avatarUrl) {
        const path = avatarUrl.split("/avatars/")[1]
        if (path) {
          await supabase.storage.from("avatars").remove([path])
        }
      }

      throw new Error("Thêm thành viên thất bại!")
    }

    revalidatePath("admin/members")

    return { success: true }
  } catch (err) {
    throw err
  }
}

export async function updateMember(formData) {
  const supabase = await createClient()

  try {
    const id = formData.get("id")
    const name = formData.get("name")

    const nickname = formData.get("nickname")
    const level = formData.get("level")

    const joined_at = formData.get("joined_at")
    const avatarFile = formData.get("avatar")

    const isValidFile = avatarFile instanceof File && avatarFile.size > 0

    const { data: oldMember, error: fetchError } = await supabase
      .from("members")
      .select("avatar")
      .eq("id", id)
      .single()

    if (fetchError) {
      throw new Error("Không tìm thấy member")
    }

    let newAvatarUrl = null
    let newFilePath = null

    if (isValidFile) {
      const mimeType = avatarFile.type || "image/jpeg"
      let fileExt = mimeType.split("/")[1]

      const allowedTypes = ["jpeg", "jpg", "png", "webp"]
      if (!allowedTypes.includes(fileExt)) {
        throw new Error("Ảnh phải là jpg, png hoặc webp")
      }

      const fileName = `${randomUUID()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, avatarFile, {
          contentType: mimeType,
        })

      if (uploadError) {
        throw new Error("Upload avatar thất bại")
      }

      const { data } = supabase.storage.from("avatars").getPublicUrl(fileName)

      newAvatarUrl = data.publicUrl
      newFilePath = fileName
    }

    const updateData = {
      name,
      nickname,
      level,
      joined_at,
    }

    if (newAvatarUrl) {
      updateData.avatar = newAvatarUrl
    }

    const { error: updateError } = await supabase
      .from("members")
      .update(updateData)
      .eq("id", id)

    if (updateError) {
      console.error("UPDATE ERROR:", updateError)

      if (newFilePath) {
        await supabase.storage.from("avatars").remove([newFilePath])
      }

      throw new Error("Sửa thông tin thất bại!")
    }

    if (newAvatarUrl && oldMember.avatar) {
      const oldPath = oldMember.avatar.split("/avatars/")[1]
      if (oldPath) {
        await supabase.storage.from("avatars").remove([oldPath])
      }
    }

    revalidatePath("admin/members")

    return { success: true }
  } catch (err) {
    throw err
  }
}

export async function deleteMember(id, avatar, path) {
  try {
    const supabase = await createClient()

    if (avatar) {
      const path = avatar.split("/avatars/")[1]

      if (path) {
        const { error } = await supabase.storage.from("avatars").remove([path])

        if (error) {
          console.warn("Không xóa được avatar:", error.message)
        }
      }
    }

    const { error: deleteError } = await supabase
      .from("members")
      .delete()
      .eq("id", id)

    if (deleteError) {
      throw new Error("Xóa thành viên thất bại")
    }

    revalidatePath(path)

    return { success: true }
  } catch (err) {
    throw err
  }
}
