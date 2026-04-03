import { getTopAttendance } from "@/app/actions/memberActions"
import ImgAvatar from "../ImgAvatar"

export default async function TopAttendance() {
  const members = await getTopAttendance()

  return (
    <section id="rank">
      <div className="container">
        <div className="imgtitle" data-aos="fade-up">
          <ImgAvatar
            src="/images/common/rank.svg"
            alt="NGOO-Nhóm Cầu Lông Lớn Thứ 2 Thủ Dầu Một"
            widthprop={640}
            heightprop={640}
          />
        </div>
        <h2 className="title02" data-aos="fade-up">
          Top 10 NGOO
        </h2>
        <p className="text-center text-(--fs-default)" data-aos="fade-up">
          10 <strong>NGOO</strong> dễ bắt gặp trên sân nhất
        </p>

        {members && members.length > 0 ? (
          <ul className="rank">
            {members.map((member, index) => (
              <li className="rank__item" key={member.id} data-aos="fade-up">
                <span className="rank__number">{index + 1}.</span>
                <figure className="rank__avatar">
                  <ImgAvatar
                    src={member.avatar}
                    alt={member.name}
                    classprop=""
                    widthprop={256}
                    heightprop={256}
                  />
                </figure>
                <div className="">
                  <h3 className="rank__name">{member.name}</h3>
                  {member.nickname && (
                    <span className="rank__nickname">({member.nickname})</span>
                  )}
                </div>
                <span className="rank__attendance">
                  {member.attendance_count ?? 0} buổi
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <em className="text-center block" data-aos="fade-up">
            Không có top 10
          </em>
        )}
      </div>
    </section>
  )
}
