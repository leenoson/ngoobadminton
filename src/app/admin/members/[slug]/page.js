import ImgAvatar from '@/components/ImgAvatar'
import { notFound } from 'next/navigation'
import { createClient } from "@/lib/supabase/server"
import { slugify, extractIdFromSlug } from '@/lib/slugify'
import { getMember } from "@/lib/db/member"

export async function generateMetadata({ params }) {
  const member = await getMember(params.slug)
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

  const avatarUrl = member.avatar?.startsWith('http')
    ? (member.avatar.startsWith('http')
      ? member.avatar
      : `${process.env.NEXT_PUBLIC_BASE_URL}${member.avatar}`)
    : `${process.env.NEXT_PUBLIC_BASE_URL}/opg.png`

  return {
    title: `${member.name} | NGOO Badminton`,
    description: `Thông tin chi tiết thành viên ${member.name} của CLB NGOO Badminton. Xem thông tin, lịch sử tham gia và hoạt động.`,
    alternates: {
      canonical: `${BASE_URL}/admin/members/${params.slug}`,
    },
    openGraph: {
      title: `${member.name} | NGOO BADMINTON`,
      description: `Thông tin chi tiết thành viên ${member.name} của CLB NGOO Badminton. Xem thông tin, lịch sử tham gia và hoạt động.`,
      type: "profile",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/admin/members/${params.slug}`,
      images: [
        {
          url: avatarUrl,
          width: 1200,
          height: 630,
          alt: `${member.name} | NGOO BADMINTON`
        }
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${member.name} | NGOO BADMINTON`,
      description: `Thông tin chi tiết thành viên ${member.name} của CLB NGOO Badminton. Xem thông tin, lịch sử tham gia và hoạt động.`,
      images: [avatarUrl],
    },

    robots: {
      index: false,
      follow: true,
    }
  }
}

export default async function MemberDetail({ params }) {
  const supabase = await createClient()
  const id = extractIdFromSlug(params.slug)

  if (!id) return notFound()

  // 👉 fetch member
  const { data: member, error } = await supabase
    .from('members')
    .select('id, name, avatar, joined_at')
    .eq('id', id)
    .single()

  if (error || !member) return notFound()

  // 👉 slug chuẩn
  const correctSlug = `${slugify(member.name)}--${member.id}`
  if (params.slug !== correctSlug) {
    redirect(`/members/${correctSlug}`)
  }

  // 👉 fetch attendance list
  const { data: attendanceList = [] } = await supabase
    .from('attendance')
    .select('attend_date')
    .eq('member_id', member.id)
    .order('attend_date', { ascending: false })

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
    <div style={{ padding: '40px', maxWidth: '600px', margin: 'auto' }}>
      <div style={{ textAlign: 'center' }}>
        <ImgAvatar
					src={member.avatar}
					alt={member.name}
					classprop="card-img-top"
				/>

        <h1>{member.name}</h1>
      </div>

      <div style={{ marginTop: '20px' }}>
        <p><strong>Ngày tham gia:</strong> {joinedDate}</p>
      </div>
      <div>
        Số buổi tham gia: {attendanceCount}
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3>Lịch sử tham gia</h3>

        {sortedYears.length > 0 ? (
          sortedYears.map((year) => {
            const months = Object.keys(grouped[year]).sort((a, b) => b - a)

            return (
              <div key={year} style={{ marginBottom: '20px' }}>
                <h4 style={{ borderBottom: '1px solid #ddd' }}>{year}</h4>

                {months.map((month) => {
                  const items = grouped[year][month]

                  return (
                    <div key={month} style={{ paddingLeft: '10px', marginTop: '10px' }}>
                      <h5>
                        Tháng {month} ({items.length} buổi)
                      </h5>

                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px'
                      }}>
                        {items.map((item, index) => (
                          <span
                            key={index}
                            style={{
                              padding: '6px 10px',
                              borderRadius: '8px',
                              background: '#f1f5f9',
                              fontSize: '14px'
                            }}
                          >
                            {new Date(item.attend_date).toLocaleDateString('vi-VN')}
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