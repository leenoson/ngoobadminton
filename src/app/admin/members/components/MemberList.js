// components/MemberList.jsx
import MemberCard from "@/components/MemberCard"
import { getMembers } from "@/services/members/getMembers"

export default async function MemberList({ search, sort, order, page, limit }) {
  const { members } = await getMembers({
    search,
    sort,
    order,
    page,
    limit,
  })

  if (!members.length) {
    return <p>Chưa có NGOO nào</p>
  }

  return (
    <ul className="card-list">
      {members.map((member) => (
        <li key={member.id} className="card-item">
          <MemberCard member={member} isAdmin />
        </li>
      ))}
    </ul>
  )
}
