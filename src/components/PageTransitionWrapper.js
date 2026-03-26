"use client"

import { useRouter, usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function PageTransitionWrapper({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const [nextHref, setNextHref] = useState(null)
  const [slideOut, setSlideOut] = useState(false)

  // Trigger overlay khi click link
  useEffect(() => {
    const startLoader = (e) => {
      const href = e.detail
      if (!href) return
      // Nếu href đang ở page hiện tại → bỏ qua
      if (href === pathname) return
      setNextHref(href)
      setIsLoading(true)
    }
    window.addEventListener("page-loader-start", startLoader)
    return () => window.removeEventListener("page-loader-start", startLoader)
  }, [pathname])

  // Chặn scroll nhưng vẫn hiển thị scrollbar
  useEffect(() => {
    if (!isLoading) return
    const prevent = (e) => e.preventDefault()
    window.addEventListener("wheel", prevent, { passive: false })
    window.addEventListener("touchmove", prevent, { passive: false })
    window.addEventListener("keydown", (e) => {
      if (
        ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Space"].includes(e.code)
      )
        e.preventDefault()
    })
    return () => {
      window.removeEventListener("wheel", prevent)
      window.removeEventListener("touchmove", prevent)
      window.removeEventListener("keydown", prevent)
    }
  }, [isLoading])

  // Khi overlay full screen, push page
  useEffect(() => {
    if (!isLoading || !nextHref) return
    const timer = setTimeout(() => {
      router.push(nextHref)
      setSlideOut(true) // overlay bắt đầu slide ra
    }, 200) // 200ms delay trước khi bắt đầu
    return () => clearTimeout(timer)
  }, [isLoading, nextHref, router])

  // Khi slideOut xong, remove overlay
  const handleSlideOutComplete = () => {
    setIsLoading(false)
    setNextHref(null)
    setSlideOut(false)
  }

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-gradient-to-b from-[#1e3a8a] via-[#9333ea] to-[#f43f5e] shadow-xl"
            initial={{ y: "-100%", scale: 1.05, filter: "blur(8px)" }}
            animate={{ y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ y: "100%", scale: 1.1, filter: "blur(6px)" }}
            transition={{
              duration: 0.7,
              // delay: 0.2,
              ease: [0.6, 0.15, 0.1, 0.55],
            }}
            onAnimationComplete={() => {
              if (slideOut) handleSlideOutComplete()
            }}
          />
        )}
      </AnimatePresence>
      {children}
    </>
  )
}
