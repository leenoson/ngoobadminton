import ImgAvatar from "@/components/ImgAvatar"
import { notFound, redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { slugify, extractIdFromSlug } from "@/lib/slugify"
import { getMember } from "@/lib/db/member"

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
    <div>
      <div>
        <ImgAvatar
          src={member.avatar}
          alt={member.name}
          classprop="card-img-top"
        />

        <h1>Tên thật: {member.name}</h1>
        <h2>Tên thân mật: {member.nickname || "Cần người đặt tên!"}</h2>
      </div>

      <div className="mb-[4px]">
        <p>
          <strong>Ngày tham gia:</strong> {joinedDate}
        </p>
      </div>
      <div>Số buổi tham gia: {attendanceCount}</div>

      <div className="mb-4">
        <h3>Lịch sử tham gia</h3>

        {sortedYears.length > 0 ? (
          sortedYears.map((year) => {
            const months = Object.keys(grouped[year]).sort((a, b) => b - a)

            return (
              <div key={year}>
                <h4>{year}</h4>

                {months.map((month) => {
                  const items = grouped[year][month]

                  return (
                    <div key={month}>
                      <h5>
                        Tháng {month} ({items.length} buổi)
                      </h5>

                      <div>
                        {items.map((item, index) => (
                          <span key={index}>
                            {new Date(item.attend_date).toLocaleDateString(
                              "vi-VN",
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })
        ) : (
          <p>Chưa tham gia buổi nào</p>
        )}
      </div>
    </div>
  )
}
