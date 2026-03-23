import ImgAvatar from "./ImgAvatar"
import { getTopAttendance } from "@/app/actions/memberActions"

export default async function TopAttendance() {
  const members = await getTopAttendance()

  return (
    <div className="">
      {members && members.length > 0 ? (
        members.map((member, index) => (
          <div key={member.id} className="">
            <p>Top {index + 1}</p>
            <ImgAvatar src={member.avatar} alt={member.name} classprop="" />
            <p>{member.name}</p>
            <p>{member.attendance_count ?? 0} buổi</p>
          </div>
        ))
      ) : (
        <div className="">
          <h5 className="text-muted">Không có top 10</h5>
        </div>
      )}
    </div>
  )
}
