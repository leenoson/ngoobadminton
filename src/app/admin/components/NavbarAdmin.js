"use client"

import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import clsx from "clsx"
import { createClient } from "@/lib/supabase/client"
import SmartLink from "@/lib/SmartLink"
import styles from "./NavBarAdmin.module.scss"

export default function Navbar() {
  const supabase = createClient()
  const router = useRouter()
  const pathname = usePathname()

  async function logout() {
    await supabase.auth.signOut()
    router.refresh()
  }
  return (
    <nav>
      <div className="">
        <SmartLink href="/admin">
          <h4>Admin</h4>
        </SmartLink>

        <ul className="">
          <li className="">
            <SmartLink
              href="/admin/members"
              className={clsx({
                [styles.active]:
                  pathname === "/admin/members" ||
                  pathname.startsWith("/admin/members/"),
              })}
            >
              NGOO dân
            </SmartLink>
          </li>
          <li className="">
            <SmartLink
              href="/admin/attendance"
              className={clsx({
                "text-red-600":
                  pathname === "/admin/attendance" ||
                  pathname.startsWith("/admin/attendance/"),
              })}
            >
              Điểm danh
            </SmartLink>
          </li>
          <li className="">
            <div className="btn btn-outline-danger" onClick={logout}>
              Khắc xuất
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}
