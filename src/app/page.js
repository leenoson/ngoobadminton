import { createClient } from "@/lib/supabase/server";
import MemberCard from "./admin/members/components/MemberCard";

export default async function Home() {

  const supabase = await createClient();

  const { data: members } = await supabase
    .from("members")
    .select(`
      id,
      name,
      avatar,
      joined_at,
      attendance (
        count
      )
    `)
    .order("name")
    .limit(12);
const handleClick = () => {
  window.gtag("event", "register_click", {
    event_category: "engagement",
    event_label: "register button",
  })
}
  return (

    <div className="container py-5">
<button onClick={handleClick}>
  test GA
</button>
      <h2 className="mb-4">Members</h2>

      <div className="row">

       {members && members.length > 0 ? (
          members.map(member => (

            <div key={member.id} className="col-md-3 mb-4">
              <MemberCard member={member} />
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">

            <h5 className="text-muted">
              Chưa có members
            </h5>

          </div>
        )}
      </div>

      <h2 className="mt-5 mb-4">Latest Blog</h2>

      <div className="row">

      viết gì đó

      </div>

    </div>

  );
}