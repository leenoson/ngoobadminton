"use client"

import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const supabase = createClient()
  const router = useRouter()

  async function logout() {
    await supabase.auth.signOut()
    router.refresh()
  }
  return (
    <>
      <div className="">
        <Link href="/admin">
          <h4>Admin</h4>
        </Link>

        <ul className="">
          <li className="">
            <Link href="/admin/members">Members</Link>
          </li>
          <li className="">
            <Link href="/admin/attendance">Điểm danh</Link>
          </li>
          <li className="">
            <div className="btn btn-outline-danger" onClick={logout}>
              Đăng xuất
            </div>
          </li>
        </ul>
      </div>
    </>
  )
}
