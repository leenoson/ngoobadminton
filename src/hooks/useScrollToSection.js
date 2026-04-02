"use client"

import { useCallback } from "react"

export default function useScrollToSection() {
  const scrollToSection = useCallback((id, options = {}) => {
    const { duration = 600, offset = 0 } = options

    const el = document.getElementById(id)
    if (!el) return

    const navbar = document.querySelector("#mainnav")
    const navbarHeight = navbar?.offsetHeight || 0

    console.log(navbarHeight)

    const targetY =
      el.getBoundingClientRect().top + window.scrollY - navbarHeight - offset

    const startY = window.scrollY
    const diff = targetY - startY

    let startTime = null

    // easing mượt (easeInOut)
    const easeInOut = (t) => {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
    }

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp

      const progress = (timestamp - startTime) / duration
      const eased = easeInOut(Math.min(progress, 1))

      window.scrollTo(0, startY + diff * eased)

      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }, [])

  return scrollToSection
}
