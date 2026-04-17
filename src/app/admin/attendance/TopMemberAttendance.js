import Link from "next/link"
import { Icons } from "@/components/Icons"
import { getTopAttendance } from "@/app/actions/memberActions"
import { createMemberUrl } from "@/lib/slugify"

export default async function TopMemberAttendance() {
  const members = await getTopAttendance()

  return (
    <>
      <h2 className="title03 mb-(--spac)">Top 10 NGOO siêng nhất</h2>
      {members && members.length > 0 ? (
        <ul className="list04 mb-(--spac)">
          {members.map((member) => (
            <li className="list04__item" key={member.id}>
              <Link
                href={`/admin/members/${createMemberUrl(member.id)}`}
                className="list04__link badge"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="list04__text">
                  {member.name} ({member.attendance_count})
                </span>
                <Icons.Blank />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Chưa có NGOO nào siêng nhất</p>
      )}
    </>
  )
}
