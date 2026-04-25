import AutoScrollTop from "@/components/AutoScrollTop"
import BackButton from "@/components/ButtonBack"
import { getMember } from "@/lib/db/member"

export async function generateMetadata({ params }) {
  const { id } = await params
  const member = await getMember(id)

  if (!member) {
    return {
      title: "Không tìm thấy thành viên NGOO này!",
    }
  }

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

  const avatarUrl = member?.avatar?.startsWith("http")
    ? member?.avatar
    : member?.avatar
      ? `${BASE_URL}${member?.avatar}`
      : `${BASE_URL}/opg.png`

  return {
    title: `${member?.name} | NGOO Badminton`,
    description: `Thông tin chi tiết thành viên ${member?.name} của CLB NGOO Badminton. Xem thông tin, lịch sử tham gia và hoạt động.`,
    alternates: {
      canonical: `${BASE_URL}/admin/members/${id}`,
    },
    openGraph: {
      title: `${member?.name} | NGOO BADMINTON`,
      description: `Thông tin chi tiết thành viên ${member?.name} của CLB NGOO Badminton. Xem thông tin, lịch sử tham gia và hoạt động.`,
      type: "profile",
      url: `${BASE_URL}/admin/members/${id}`,
      images: [
        {
          url: avatarUrl,
          width: 1200,
          height: 630,
          alt: `${member?.name} | NGOO BADMINTON`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${member?.name} | NGOO BADMINTON`,
      description: `Thông tin chi tiết thành viên ${member?.name} của CLB NGOO Badminton. Xem thông tin, lịch sử tham gia và hoạt động.`,
      images: [avatarUrl],
    },

    robots: {
      index: false,
      follow: true,
    },
  }
}

export default function AdminMemberLayout({ children }) {
  return (
    <>
      <AutoScrollTop />
      <BackButton href="/admin/members" title="Danh sách NGOO dân" />
      {children}
    </>
  )
}
