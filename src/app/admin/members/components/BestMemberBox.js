import Link from "next/link"
import { getTopAttendance } from "@/app/actions/memberActions"
import { createMemberUrl } from "@/lib/slugify"
import { Icons } from "@/components/Icons"

export default async function BestMemberBox() {
  const bestMember = await getTopAttendance()

  const member = bestMember?.[0]

  if (!member) {
    return (
      <div className="box__box">
        <p>Thành viên hot</p>
        <span className="box__content">Chưa có ai hot</span>
      </div>
    )
  }

  return (
    <Link
      className="box__box"
      href={`/admin/members/${createMemberUrl(member?.id)}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <p>Thành viên hot</p>
      <span className="box__content">{member.name}</span>
      <Icons.Blank />
    </Link>
  )
}
