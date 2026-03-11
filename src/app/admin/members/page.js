import { createClient } from "@/lib/supabase/server"
import MembersClient from "./components/MembersClient"
import FilterBar from "./components/FilterBar"
import MemberCard from "./components/MemberCard"

export default async function MembersPage({ searchParams }) {
  const params = await searchParams
  const supabase = await createClient()

  const search = params?.search || ""
  const sort = params?.sort || "joined"
  const order = params?.order || "desc"

  const ascending = order === "asc"

  const { count: totalMembers } = await supabase
    .from("members")
    .select("*", { count: "exact", head: true })

  let query = supabase
    .from("members")
    .select(`
      id,
      name,
      avatar,
      joined_at,
      attendance(count)
    `)

  if (search) {
    query = query.ilike("name", `%${search}%`)
  }

  if (sort === "name") {
    query = query.order("name", { ascending })
  }

  if (sort === "joined") {
    query = query.order("joined_at", { ascending })
  }

  const { data: members } = await query

  if (sort === "attendance" && members) {

    members.sort((a, b) => {
      const aCount = a.attendance?.[0]?.count || 0
      const bCount = b.attendance?.[0]?.count || 0
      return ascending
        ? aCount - bCount
        : bCount - aCount
    })
  }

  const filteredMembers = members?.length || 0

  return (

    <div className="container py-5">
      <MembersClient members={members} />
      <div className="d-flex justify-content-between align-items-center mb-3">

        <div className="text-muted">

          {search
            ? `Found ${filteredMembers} of ${totalMembers} members`
            : `${totalMembers} members`
          }

        </div>

      </div>
      <FilterBar />

      <div className="row">

        {members && members.length > 0 ? (

          members.map(member => (

            <div key={member.id} className="col-md-3 mb-4">
              <MemberCard member={member} isAdmin/>
            </div>

          ))

        ) : (

          <div className="col-12 text-center py-5">

            <h5 className="text-muted">
              {search
                ? "Không tìm thấy member nào"
                : "Chưa có members"
              }
            </h5>

          </div>

        )}

      </div>

    </div>

  )
}