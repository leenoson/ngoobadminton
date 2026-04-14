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

  let query = supabase
    .from("members_with_attendance")
    .select("*", { count: "exact" })

  if (search) {
    query = query.ilike("name", `%${search}%`)
  }

  const { data: members, count: filteredMembers } = await query
    .order(sortColumn, { ascending })
    .range((page - 1) * limit, page * limit - 1)

  const { count: totalMembers } = await supabase
    .from("members")
    .select("id", { count: "exact", head: true })

  const totalPages = Math.ceil((filteredMembers || 0) / limit)

  return {
    members,
    totalMembers,
    filteredMembers,
    totalPages,
  }
}
