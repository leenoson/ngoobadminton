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
    .select("id", { count: "exact", head: true })

  let query = supabase
    .from("members_with_attendance")
    .select("*")

  if (search) {
    query = query.ilike("name", `%${search}%`)
  }

  const sortMap = {
    name: "name",
    joined: "joined_at",
    attendance: "attendance_count"
  }

  query = query.order(sortMap[sort] ?? "joined_at", { ascending })

  const { data: members } = await query

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