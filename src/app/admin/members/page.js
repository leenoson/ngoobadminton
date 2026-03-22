import { createClient } from "@/lib/supabase/server"
import FilterBar from "./components/FilterBar"
import MemberCard from "../../../components/MemberCard"
import AddMemberButton from "./components/AddMemberButton"

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

  let query = supabase.from("members_with_attendance").select("*")

  if (search) {
    query = query.ilike("name", `%${search}%`)
  }

  const sortMap = {
    name: "name",
    joined: "joined_at",
    attendance: "attendance_count",
  }

  query = query.order(sortMap[sort] ?? "joined_at", { ascending })

  const { data: members } = await query

  const filteredMembers = members?.length || 0

  return (
    <div>
      <h2>Danh sách NGOO dân</h2>
      <AddMemberButton members={members} />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          {search
            ? `Tìm thấy ${filteredMembers} trong ${totalMembers} NGOO`
            : ` Có ${totalMembers} NGOO`}
        </div>
      </div>
      <FilterBar />

      <div className="row row-cols-xxl-4 row-cols-xl-3 row-cols-md-2 row-cols-1">
        {members && members.length > 0 ? (
          members.map((member) => (
            <div key={member.id} className="col mb-4">
              <MemberCard member={member} isAdmin />
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <h5 className="text-muted">
              {search ? "Không tìm thấy NGOO nào" : "Chưa có NGOO nào"}
            </h5>
          </div>
        )}
      </div>
    </div>
  )
}
