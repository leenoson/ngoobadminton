import ImgAvatar from "@/components/ImgAvatar"
import { notFound, redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { slugify, extractIdFromSlug } from "@/lib/slugify"
import { getMember } from "@/lib/db/member"
import Image from "next/image"
import { Icons } from "@/components/Icons"
import ButtonEditMember from "@/components/ButtonEditMember"
import ButtonDeleteMember from "@/components/ButtonDeleteMember"

export default async function MemberDetail({ params }) {
  const { slug } = await params
  const supabase = await createClient()
  const id = extractIdFromSlug(slug)

  if (!id) return notFound()

  const member = await getMember(slug)

  if (!member) return notFound()

  const correctSlug = `${slugify(member.name)}--${member.id}`
  if (slug !== correctSlug) {
    redirect(`/members/${correctSlug}`)
  }

  const { data: attendanceList = [] } = await supabase
    .from("attendance")
    .select("attend_date")
    .eq("member_id", member.id)
    .order("attend_date", { ascending: false })

  const attendanceCount = attendanceList.length

  const grouped = attendanceList.reduce((acc, item) => {
    const d = new Date(item.attend_date)
    const year = d.getFullYear()
    const month = d.getMonth() + 1

    if (!acc[year]) acc[year] = {}
    if (!acc[year][month]) acc[year][month] = []

    acc[year][month].push(item)
    return acc
  }, {})

  const sortedYears = Object.keys(grouped).sort((a, b) => b - a)

  const joinedDate = member.joined_at
    ? new Date(member.joined_at).toLocaleDateString("vi-VN")
    : "N/A"

  return (
    <section>
      <article className="mb-(--spac-l)">
        <h2 className="title04">Thông tin chi tiết</h2>

        <div className="member">
          <div className="member__content">
            <h1 className="title01">{member.name}</h1>
            <h4 className="title03">
              ({member.nickname || "Chưa có nickname"})
            </h4>
            <p className="flex items-center gap-(--spac-xs) mb-(--spac-s)">
              <Icons.Join />
              Ngày tham gia: {joinedDate}
            </p>
            <p className="flex items-center gap-(--spac-xs) mb-(--spac-s)">
              <Icons.Attendance />
              Số buổi:{" "}
              {attendanceCount ? (
                <span className="badge">{attendanceCount}</span>
              ) : (
                <span className="badge badge--type01">0</span>
              )}
            </p>
            <p className="flex items-center gap-(--spac-xs) mb-(--spac-s)">
              <Icons.Phone />
              Sdt: {member.phone || "0***"}
            </p>
            <p className="flex items-center gap-(--spac-xs) mb-(--spac-s)">
              <Icons.Email />
              Email: {member.email || "**@.com"}
            </p>
            <p className="flex items-center gap-(--spac-xs) mb-(--spac-s)">
              <Icons.Address />
              Địa chỉ: {member.address || "** ** Việt Nam"}
            </p>
            <p className="flex items-center gap-(--spac-xs) mb-(--spac-s)">
              <Icons.Dob />
              Sinh nhật: {member.dob || "**/**/****"}
            </p>
            <p className="flex items-center gap-(--spac-xs) mb-(--spac-s)">
              <Icons.Level />
              Trình là gì: {member.level || "*"}
            </p>
            <div className="member__action">
              <ButtonEditMember member={member} />
              <ButtonDeleteMember
                member={member}
                redirectAfterDelete="/admin/members"
              />
            </div>
          </div>
          <figure className="member__avatar">
            <ImgAvatar src={member.avatar} alt={member.name} />
            <figcaption>
              <em>Hình ảnh do chính chủ cung cấp</em>
            </figcaption>
          </figure>
        </div>
      </article>

      <article className="member__history">
        <h2 className="title04">Lịch sử tham gia</h2>

        <div className="flex justify-center">
          {sortedYears.length > 0 ? (
            <ul className="list02">
              {sortedYears.map((year) => {
                const months = Object.keys(grouped[year]).sort((a, b) => b - a)

                const yearTotals = {}

                for (const year in grouped) {
                  yearTotals[year] = Object.values(grouped[year]).reduce(
                    (total, items) => total + items.length,
                    0,
                  )
                }

                return (
                  <li className="list02__item" key={year}>
                    <h5 className="list02__year">
                      {year} ({yearTotals[year]} buổi)
                    </h5>

                    <ul className="list02">
                      {months.map((month) => {
                        const items = grouped[year][month]

                        return (
                          <li className="list02__item" key={month}>
                            <h6 className="list02__month">
                              Tháng {month}: ({items.length} buổi)
                            </h6>

                            <ul className="list03">
                              {items.map((item, index) => (
                                <li key={index} className="badge">
                                  {new Date(
                                    item.attend_date,
                                  ).toLocaleDateString("vi-VN")}
                                </li>
                              ))}
                            </ul>
                          </li>
                        )
                      })}
                    </ul>
                  </li>
                )
              })}
            </ul>
          ) : (
            <figure className="flex w-full items-center flex-col">
              <Image
                src={"/images/common/no.svg"}
                width={512}
                height={512}
                alt="Chưa tham gia buổi nào"
                className="w-[20vw]"
              />
              <figcaption>Chưa tham gia buổi nào</figcaption>
            </figure>
          )}
        </div>
      </article>
    </section>
  )
}
