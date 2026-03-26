import { createClient } from "@/lib/supabase/server"
import MemberCard from "../../components/MemberCard"
import TopAttendance from "@/components/TopAttendance"
import BannerParallax from "@/components/BannerParallax"
import SectionContact from "@/components/SectionContact"

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
        <BannerParallax image="/images/common/hero.jpg" />
        <section id="member">
          {/* <h2 className="font-bold text-[22px] bg-[#bada55] hover:underline">
            Thành viên
          </h2>
          <div className="btn-primary text-primary-1">btn cuson</div>
          <div className="btn-primary text-primary-1 bg-primary-2">
            btn cuson
          </div> */}

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
      <SectionContact />
    </>
  )
}
