"use client"

import Link from "next/link"
import NProgress from "nprogress"

function isSamePage(href) {
  if (typeof window === "undefined") return false

  const url = new URL(href, window.location.origin)

  return (
    url.pathname === window.location.pathname &&
    url.search === window.location.search
  )
}

export default function SmartLink({ href, children, ...props }) {
  return (
    <Link
      href={href}
      {...props}
      onClick={() => {
        if (isSamePage(href)) return
        if (NProgress.isStarted && NProgress.status) return
        NProgress.set(0.1)
        NProgress.start()
      }}
    >
      {children}
    </Link>
  )
}
