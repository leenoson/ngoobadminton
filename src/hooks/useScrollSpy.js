"use client"

import { useEffect } from "react"

export default function useScrollSpy({
  sectionIds = [],
  activeClass = "is-active",
  offset = 0,
} = {}) {
  useEffect(() => {
    if (!sectionIds.length) return

    const handleScroll = () => {
      const navbar = document.querySelector("#mainnav")
      const navbarHeight = navbar?.offsetHeight || 0

      const scrollPosition = window.scrollY + navbarHeight + offset

      let currentId = null

      sectionIds.forEach((id) => {
        const el = document.getElementById(id)
        if (!el) return

        const top = el.offsetTop
        const height = el.offsetHeight

        if (scrollPosition >= top && scrollPosition < top + height) {
          currentId = id
        }
      })

      // 👉 remove tất cả active
      document.querySelectorAll("[data-scroll]").forEach((el) => {
        el.classList.remove(activeClass)
      })

      // 👉 add active đúng cái
      if (currentId) {
        const activeEl = document.querySelector(`[data-scroll="${currentId}"]`)
        activeEl?.classList.add(activeClass)
      }
    }

    window.addEventListener("scroll", handleScroll)

    // 👉 chạy lần đầu (khi load)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [sectionIds, activeClass, offset])
}
