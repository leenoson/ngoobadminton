"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import NProgress from "nprogress"

NProgress.configure({
  showSpinner: false,
  trickle: false,
})

export default function TopLoader() {
  const pathname = usePathname()

  useEffect(() => {
    NProgress.done()
  }, [pathname])

  return null
}
