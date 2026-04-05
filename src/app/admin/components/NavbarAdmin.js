"use client"

import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import clsx from "clsx"
import { createClient } from "@/lib/supabase/client"
import SmartLink from "@/lib/SmartLink"
import styles from "./NavBarAdmin.module.scss"
import Link from "next/link"

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
          <h4 className="title03">Admin</h4>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                />
              </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                />
              </svg>
              Điểm danh
            </SmartLink>
          </li>
          <li className="">
            <button role="button" className="cursor-pointer" onClick={logout}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
                />
              </svg>
              Khắc xuất
            </button>
          </li>
        </ul>
        <Link href="/" data-no-progress>
          Logo NGOO
        </Link>
      </div>
    </nav>
  )
}
