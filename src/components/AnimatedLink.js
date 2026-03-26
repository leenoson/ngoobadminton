"use client"

import { usePathname } from "next/navigation"

export default function AnimatedLink({ href, children, className }) {
  const pathname = usePathname()

  const handleClick = (e) => {
    e.preventDefault()
    if (href === pathname) return
    window.dispatchEvent(new CustomEvent("page-loader-start", { detail: href }))
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}
