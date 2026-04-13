import ImgAvatar from "@/components/ImgAvatar"
import { notFound, redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { slugify, extractIdFromSlug } from "@/lib/slugify"
import { getMember } from "@/lib/db/member"
import Image from "next/image"

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
        <h2 className="title04">Thông tin cơ bản</h2>

        <div className="member">
          <div className="member__content">
            <h1 className="title01">{member.name}</h1>

            <h4 className="title03">
              ({member.nickname || "Cần người đặt tên!"})
            </h4>
            <p className="flex items-center gap-(--spac-xs) mb-(--spac-s)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>
              Ngày tham gia: {joinedDate}
            </p>
            <p className="flex items-center gap-(--spac-xs) mb-(--spac-s)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                />
              </svg>
              Số buổi:{" "}
              {attendanceCount ? (
                <span className="badge">{attendanceCount}</span>
              ) : (
                <span className="badge badge--type01">0</span>
              )}
            </p>
            <p className="flex items-center gap-(--spac-xs) mb-(--spac-s)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                />
              </svg>
              Sdt: {member.phone || "0***"}
            </p>
            <p className="flex items-center gap-(--spac-xs) mb-(--spac-s)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                />
              </svg>
              Email: {member.email || "**@.com"}
            </p>
            <p className="flex items-center gap-(--spac-xs) mb-(--spac-s)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              Địa chỉ: {member.address || "** ** Việt Nam"}
            </p>
            <p className="flex items-center gap-(--spac-xs) mb-(--spac-s)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z"
                />
              </svg>
              Sinh nhật: {member.dob || "**/**/****"}
            </p>
            <p className="flex items-center gap-(--spac-xs) mb-(--spac-s)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                />
              </svg>
              Trình là gì: {member.level || "*"}
            </p>
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
