import { redirect } from "next/navigation"
import FilterBar from "./components/FilterBar"
import MemberCard from "../../../components/MemberCard"
import AddMemberButton from "./components/AddMemberButton"
import NoResultSearchMember from "./components/NoResultSearchMember"
import { getMembers } from "@/services/members/getMembers"
import Pagination from "@/components/Pagination"
import { getNewestMember, getTopAttendance } from "@/app/actions/memberActions"
import Link from "next/link"
import { createMemberUrl } from "@/lib/slugify"
import { Icons } from "@/components/Icons"
import AutoScrollTop from "@/components/AutoScrollTop"
import ButtonDeleteAllMembers from "@/components/admin/ButtonDeleteAllMembers"
import NoMember from "./components/NoMember"

export const metadata = {
  title: "Admin quản lý member",
}

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
    <section>
      <AutoScrollTop />

      <h1 className="title04">Danh sách NGOO dân</h1>

      <AddMemberButton />

      <div className="mb-(--spac)">
        <ButtonDeleteAllMembers />
      </div>

      <ul className="box">
        <li className="box__item">
          <div className="box__box">
            <p>Tổng số NGOO</p>
            <strong className="box__content">{totalMembers}</strong>
          </div>
        </li>
        <li className="box__item">
          {newestMember ? (
            <Link
              href={`/admin/members/${createMemberUrl(newestMember.id)}`}
              className="box__box"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>Thành viên mới</p>
              {newestMember ? (
                <span className="box__content">{newestMember?.name}</span>
              ) : (
                "Chưa có thành viên"
              )}
              <Icons.Blank />
            </Link>
          ) : (
            <div className="box__box">
              <p>Thành viên mới</p>
              <span className="box__content">Chưa có thành viên</span>
            </div>
          )}
        </li>
        <li className="box__item">
          {bestMember.length > 0 ? (
            <Link
              className="box__box"
              href={`/admin/members/${createMemberUrl(bestMember[0]?.id)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>Thành viên hot</p>
              {bestMember.length ? (
                <span className="box__content">{bestMember[0]?.name}</span>
              ) : (
                "Chưa có ai hot"
              )}
              <Icons.Blank />
            </Link>
          ) : (
            <div className="box__box">
              <p>Thành viên hot</p>
              <span className="box__content">Chưa có ai hot</span>
            </div>
          )}
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
        <>
          {search ? (
            <NoResultSearchMember
              text="Không tìm thấy NGOO nào"
              isAddMemberButton
            />
          ) : (
            <NoMember />
          )}
        </>
      )}
      <Pagination totalPages={totalPages} currentPage={page} />
    </section>
  )
}
