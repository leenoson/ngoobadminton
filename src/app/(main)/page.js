import { createClient } from "@/lib/supabase/server"
import MemberCard from "../../components/MemberCard"
import TopAttendance from "@/components/TopAttendance"
import BannerTop from "@/components/BannerTop"

export default async function Home() {
  const supabase = await createClient()

  const { data: members } = await supabase
    .from("members")
    .select(
      `
			id,
			name,
			avatar,
			joined_at,
			attendance (
				count
			)
		`,
    )
    .order("name")
    .limit(12)

  return (
    <>
      <div className="">
        <section className="">
          <BannerTop />
        </section>
        <section id="member">
          <h2 className="font-bold text-[22px] bg-[#bada55] hover:underline">
            Thành viên
          </h2>
          <div className="btn-primary text-primary-1">btn cuson</div>
          <div className="btn-primary text-primary-1 bg-primary-2">
            btn cuson
          </div>

          <div className="">
            {members && members.length > 0 ? (
              members.map((member) => (
                <div key={member.id} className="">
                  <MemberCard member={member} />
                </div>
              ))
            ) : (
              <div className="">
                <h5 className="">Chưa có members</h5>
              </div>
            )}
          </div>
        </section>

        <section id="about">
          <h2 className="">Về chúng tôi</h2>
          <p>Lý do, thời gian thành lập nhóm, lịch hoạt động</p>
        </section>

        <section id="event">
          <h2 className="">Các hoạt động của nhóm</h2>
          <p>Chơi cầu lông, cà phê ma sói, duck duck goose,...</p>
        </section>

        <section id="rank">
          <h2 className="">Top 10 thành viên năng động</h2>
          <p>10 thành viên có nhiều buổi tham gia nhất</p>
          <TopAttendance />
        </section>
      </div>
      <section className="">
        <div className="">
          <div className="">
            <h2>NGOO BADMINTON</h2>
            <p>Sdt(Zalo): 03521xx1xx</p>
            <p>Email: ngoobadminton@cl.com</p>
            <p>
              Địa chỉ: Sân cầu lông Thắng Lợi - 210 Thích Quảng Đức, Phú Cường,
              Thủ Dầu Một, Bình Dương
            </p>
          </div>
          <div className="">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.814828029157!2d106.66024977577777!3d10.977345355454124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d16e3752f507%3A0xcb356352c4d812d2!2zU8OibiBD4bqndSBMw7RuZyBUaOG6r25nIEzhu6Np!5e0!3m2!1svi!2s!4v1774169945302!5m2!1svi!2s"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  )
}
