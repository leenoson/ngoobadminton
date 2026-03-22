import ImgAvatar from "./ImgAvatar"
import { getTopAttendance } from "@/app/actions/memberActions"

export default async function TopAttendance() {
  const members = await getTopAttendance()

  return (
    <div className="row row-cols-xxl-5 row-cols-xl-4 row-cols-md-3 row-cols-sm-2 row-cols-1">
      {members && members.length > 0 ? (
        members.map((member, index) => (
          <div key={member.id} className="col">
            <p>Top {index + 1}</p>
            <ImgAvatar
              src={member.avatar}
              alt={member.name}
              classprop="card-img"
            />
            <p>{member.name}</p>
            <p>{member.attendance_count ?? 0} buổi</p>
          </div>
        ))
      ) : (
        <div className="col-12 text-center py-5">
          <h5 className="text-muted">Không có top 10</h5>
        </div>
      )}
    </div>
  )
}
