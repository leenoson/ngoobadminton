import Link from "next/link"
import { getNewestMember } from "@/app/actions/memberActions"
import { createMemberUrl } from "@/lib/slugify"
import { Icons } from "@/components/Icons"

export default async function NewestMemberBox() {
  const newestMember = await getNewestMember()

  if (!newestMember) {
    return (
      <div className="box__box">
        <p>Thành viên mới</p>
        <span className="box__content">Chưa có thành viên</span>
      </div>
    )
  }

  return (
    <Link
      href={`/admin/members/${createMemberUrl(newestMember?.id)}`}
      className="box__box"
      target="_blank"
      rel="noopener noreferrer"
    >
      <p>Thành viên mới</p>
      <span className="box__content">{newestMember?.name}</span>

      <Icons.Blank />
    </Link>
  )
}
