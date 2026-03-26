"use client"

import { useRouter } from "next/navigation"
import NProgress from "nprogress"

function isSamePage(href) {
  const url = new URL(href, window.location.origin)
  return (
    url.pathname === window.location.pathname &&
    url.search === window.location.search
  )
}

export function useProgressRouter() {
  const router = useRouter()

  const push = (href, options) => {
    if (isSamePage(href)) return

    NProgress.set(0.3)
    NProgress.start()
    router.push(href, options)
  }

  return { ...router, push }
}
