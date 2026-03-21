import { createClient } from "@/lib/supabase/server"
import MemberCard from "../admin/members/components/MemberCard"

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
      <div className="container py-5">
        <section className="c-banner">slide banner</section>
        <section id="member">
          <h2 className="mb-4">Members</h2>

          <div className="row row-cols-xxl-5 row-cols-xl-4 row-cols-md-3 row-cols-sm-2 row-cols-1">
            {members && members.length > 0 ? (
              members.map((member) => (
                <div key={member.id} className="col mb-4">
                  <MemberCard member={member} />
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <h5 className="text-muted">Chưa có members</h5>
              </div>
            )}
          </div>
        </section>

        <section id="about">
          <h2 className="mt-5 mb-4">Về chúng tôi</h2>
          <p>Lý do, thời gian thành lập nhóm, lịch hoạt động</p>
        </section>

        <section id="event">
          <h2 className="mt-5 mb-4">Các hoạt động của nhóm</h2>
          <p>Chơi cầu lông, cà phê ma sói, duck duck goose,...</p>
        </section>

        <section id="rank">
          <h2 className="mt-5 mb-4">Top 10 thành viên năng động</h2>
          <p>10 thành viên có nhiều buổi tham gia nhất</p>
        </section>
      </div>
      <footer>
        <div className="container">copyright of Cactus aka Tarot Reader</div>
      </footer>
    </>
  )
}
