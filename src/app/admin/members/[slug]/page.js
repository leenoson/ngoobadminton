import ImgAvatar from '@/components/ImgAvatar'
import { notFound } from 'next/navigation'
import { slugify } from '@/lib/slugify'
import { createClient } from "@/lib/supabase/server"
import { extractIdFromSlug } from '@/lib/slugify'

export async function generateMetadata({ params }) {
  const id = extractIdFromSlug(params.slug)
  const supabase = await createClient()

  if (!id) {
    return {
      title: 'Member | NGOO Badminton'
    }
  }

  const { data: member } = await supabase
    .from('members')
    .select('name, avatar')
    .eq('id', id)
    .single()

  if (!member) {
    return {
      title: 'Member not found | NGOO Badminton'
    }
  }

  return {
    title: `${member.name}`,
    description: `Thông tin chi tiết thành viên ${member.name} của CLB NGOO Badminton`,

    openGraph: {
      title: member.name,
      description: `Profile ${member.name}`,
      images: [member.avatar],
    },

    twitter: {
      card: 'summary_large_image',
      title: member.name,
      images: [member.avatar],
    }
  }
}

export default async function MemberDetail({ params }) {
  const { slug } = params
  const parts = slug.split('--')
  const id = parts[1]
  const supabase = await createClient()

  const { data: member, error } = await supabase
    .from('members')
    .select(`
      id,
      name,
      avatar,
      joined_at,
      attendance (
        count
      )
    `)
    .eq('id', id)
    .single()

  const attendanceCount = member.attendance[0].count ?? 0;

  if (error || !member) return notFound()

  const correctSlug = `${slugify(member.name)}--${member.id}`
  if (slug !== correctSlug) {
    redirect(`/members/${correctSlug}`)
  }

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
        Số ngày tham gia: {attendanceCount}
      </div>
    </div>
  )
}