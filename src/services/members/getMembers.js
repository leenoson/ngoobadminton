import { createClient } from "@/lib/supabase/server"

export async function getMembers({ search, sort, order, page, limit }) {
  const supabase = await createClient()

  const ascending = order === "asc"

  const sortMap = {
    name: "name",
    joined: "joined_at",
    attendance: "attendance_count",
  }

  const sortColumn = sortMap[sort] ?? "joined_at"

  // 👉 query base (có filter)
  let query = supabase
    .from("members_with_attendance")
    .select("*", { count: "exact" })

  if (search) {
    query = query.ilike("name", `%${search}%`)
  }

  // 👉 fetch data + count cùng lúc
  const { data: members, count: filteredMembers } = await query
    .order(sortColumn, { ascending })
    .range((page - 1) * limit, page * limit - 1)

  // 👉 total DB (không filter)
  const { count: totalMembers } = await supabase
    .from("members")
    .select("id", { count: "exact", head: true })

  // ✅ FIX QUAN TRỌNG
  const totalPages = Math.ceil((filteredMembers || 0) / limit)

  return {
    members,
    totalMembers,
    filteredMembers,
    totalPages,
  }
}
