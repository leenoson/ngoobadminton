"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import NProgress from "nprogress"

NProgress.configure({
  showSpinner: false,
  trickle: false,
})

function isSamePage(href) {
  try {
    const url = new URL(href, window.location.origin)
    return (
      url.pathname === window.location.pathname &&
      url.search === window.location.search
    )
  } catch {
    return false
  }
}

export default function NavigationProgress() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    NProgress.done()
  }, [pathname, searchParams])

  useEffect(() => {
    const handleClick = (e) => {
      const anchor = e.target.closest("a")
      if (!anchor) return

      if (anchor.hasAttribute("data-no-progress")) return
      if (anchor.closest("[data-no-progress]")) return

      const href = anchor.getAttribute("href")
      if (!href) return

      if (
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        href.startsWith("http")
      )
        return

      if (href.startsWith("#")) return

      if (isSamePage(href)) return

      NProgress.set(0.1)
      NProgress.start()
    }

    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [])

  return null
}
