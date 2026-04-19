"use client"

import clsx from "clsx"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const handleMounted = () => setMounted(true)
    handleMounted()
  }, [])

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"

  return (
    <div
      className={clsx("buttonTheme", {
        "is-dark": isDark,
      })}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <span>{isDark ? "Tối" : "Sáng"}</span>
    </div>
  )
}
