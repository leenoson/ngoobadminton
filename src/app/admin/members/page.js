import { createClient } from "@/lib/supabase/server"
import FilterBar from "./components/FilterBar"
import MemberCard from "../../../components/MemberCard"
import AddMemberButton from "./components/AddMemberButton"
import NoResultSearchMember from "./components/NoResultSearchMember"

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
      <h2 className="title04">Danh sách NGOO dân</h2>
      <AddMemberButton members={members} />
      <ul className="box">
        <li className="box__item">
          <div className="box__box">
            <p>Tổng số NGOO</p>
            <strong className="box__number">{totalMembers}</strong>
          </div>
        </li>
        <li className="box__item">
          <div className="box__box">
            <p>Thành viên mới</p>
            <strong className="box__number">Tên</strong>
          </div>
        </li>
        <li className="box__item">
          <div className="box__box">
            <p>Thành viên hot</p>
            <strong className="box__number">Tên</strong>
          </div>
        </li>
      </ul>
      <FilterBar />
      <div className="result">
        <div>
          {search && `Tìm thấy ${filteredMembers} trong ${totalMembers} NGOO`}
        </div>
      </div>
      <div className="">
        {members && members.length > 0 ? (
          members.map((member) => (
            <div key={member.id} className="">
              <MemberCard member={member} isAdmin />
            </div>
          ))
        ) : (
          <>{search ? <NoResultSearchMember /> : <p>Chưa có NGOO nào</p>}</>
        )}
      </div>
    </div>
  )
}
