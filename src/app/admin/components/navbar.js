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
      <div className="navbar-admin">
        <Link href="/admin">
          <h4>Admin</h4>
        </Link>

        <ul className="menu-admin">
          <li className="menu-admin-item">
            <Link href="/admin/members">Members</Link>
          </li>
          <li className="menu-admin-item">
            <Link href="/admin/attendance">Điểm danh</Link>
          </li>
          <li className="menu-admin-item">
            <div className="btn btn-outline-danger" onClick={logout}>
              Đăng xuất
            </div>
          </li>
        </ul>
      </div>
    </>
  )
}
