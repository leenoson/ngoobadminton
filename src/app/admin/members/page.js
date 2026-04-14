import { redirect } from "next/navigation"
import FilterBar from "./components/FilterBar"
import MemberCard from "../../../components/MemberCard"
import AddMemberButton from "./components/AddMemberButton"
import NoResultSearchMember from "./components/NoResultSearchMember"
import { getMembers } from "@/services/members/getMembers"
import Pagination from "@/components/Pagination"
import { getNewestMember, getTopAttendance } from "@/app/actions/memberActions"

export default async function MembersPage({ searchParams }) {
  const params = await searchParams

  const search = params?.search || ""
  const sort = params?.sort || "joined"
  const order = params?.order || "desc"

  const page = Math.max(1, Number(params.page) || 1)

  const limit = Math.max(1, Number(params?.limit) || 10)

  const { members, totalMembers, filteredMembers, totalPages } =
    await getMembers({
      search,
      sort,
      order,
      page,
      limit,
    })

  if (page > totalPages && totalPages > 0) {
    const newParams = new URLSearchParams(params)
    newParams.set("page", "1")

    redirect(`/admin/members?${newParams.toString()}`)
  }

  const newestMember = await getNewestMember()
  const bestMember = await getTopAttendance()

  return (
    <div>
      <h1 className="title04">Danh sách NGOO dân</h1>

      <AddMemberButton />

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
            {newestMember ? (
              <span className="box__number">{newestMember?.name}</span>
            ) : (
              "Chưa có thành viên"
            )}
          </div>
        </li>
        <li className="box__item">
          <div className="box__box">
            <p>Thành viên hot</p>
            <strong className="box__number">
              {bestMember.length ? bestMember[0]?.name : "Chưa có ai hot"}
            </strong>
          </div>
        </li>
      </ul>

      <FilterBar />

      <div className="result">
        <div>
          {search && `Tìm thấy ${filteredMembers} trong ${totalMembers} NGOO`}
        </div>
      </div>
      {members && members.length > 0 ? (
        <ul className="card-list">
          {members.map((member) => (
            <li key={member.id} className="card-item">
              <MemberCard member={member} isAdmin />
            </li>
          ))}
        </ul>
      ) : (
        <>{search ? <NoResultSearchMember /> : <p>Chưa có NGOO nào</p>}</>
      )}
      <Pagination totalPages={totalPages} currentPage={page} />
    </div>
  )
}
