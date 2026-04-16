"use client"

import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import clsx from "clsx"
import { createClient } from "@/lib/supabase/client"
import SmartLink from "@/lib/SmartLink"
import Link from "next/link"
import Image from "next/image"
import { Icons } from "@/components/Icons"
import ButtonRipple from "@/components/ButtonRipple"

export default function Navbar({ onToggle }) {
  const supabase = createClient()
  const router = useRouter()
  const pathname = usePathname()

  async function logout() {
    await supabase.auth.signOut()
    router.refresh()
  }
  return (
    <nav className="admin__navbar">
      <button className="closemenu" onClick={onToggle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
      <Link href="/admin">
        <h3 className="title03">Admin</h3>
      </Link>

      <ul className="admin__menu">
        <li>
          <ButtonRipple
            href="/admin/members"
            className={clsx(`admin__link`, {
              "is-active":
                pathname === "/admin/members" ||
                pathname.startsWith("/admin/members/"),
            })}
          >
            <Icons.Group />
            <span className="admin__text">NGOO dân</span>
          </ButtonRipple>
        </li>
        <li>
          <ButtonRipple
            href="/admin/attendance"
            className={clsx(`admin__link`, {
              "is-active":
                pathname === "/admin/attendance" ||
                pathname.startsWith("/admin/attendance/"),
            })}
          >
            <Icons.Attendance size="size-10" />
            <span className="admin__text"> Điểm danh</span>
          </ButtonRipple>
        </li>
      </ul>
      <div className="admin__bottom">
        <ButtonRipple className="button01" onClick={logout}>
          <Icons.Power />
          <span className="button01__text">Khắc xuất</span>
        </ButtonRipple>
        <Link href="/" className="admin__logo" data-no-progress>
          <figure>
            <Image
              src={"/images/common/logo.webp"}
              width={200}
              height={200}
              alt="Logo của nhóm cầu lông NGOO"
            />
          </figure>
        </Link>
      </div>
    </nav>
  )
}
