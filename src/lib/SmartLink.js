"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import NProgress from "nprogress"

const normalize = (path = "") => path.replace(/\/$/, "")

const getPath = (href) =>
  typeof href === "string" ? href.split("?")[0] : href?.pathname || ""

export default function SmartLink({ href, children, ...props }) {
  const pathname = normalize(usePathname())
  const targetPath = normalize(getPath(href))

  const handleClick = (e) => {
    console.log("pathname === targetPath", pathname === targetPath)
    // if (pathname === targetPath) {
    //   e.preventDefault()
    //   NProgress.done()
    //   console.log("NProgress.status", NProgress.status)
    //   return
    // }

    // if (!NProgress.status) NProgress.start()
  }

  return (
    <Link href={href} {...props} onClick={handleClick}>
      {children}
    </Link>
  )
}
