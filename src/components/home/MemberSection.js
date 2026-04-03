import MemberCard from "../MemberCard"
import { createClient } from "@/lib/supabase/server"

async function MemberSection() {
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
    <section id="member">
      <h2 className="font-bold text-[22px] bg-[#bada55] hover:underline">
        Thành viên
      </h2>
      <div className="btn-primary text-primary-1">btn cuson</div>
      <div className="btn-primary text-primary-1 bg-primary-2">btn cuson</div>

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
  )
}

export default MemberSection
