"use client"

import { useRouter, usePathname } from "next/navigation"
import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function PageTransitionWrapper({ children }) {
  const router = useRouter()
  const pathname = usePathname()

  const [state, setState] = useState({
    isLoading: false,
    nextHref: null,
    slideOut: false,
  })

  const handleStart = useCallback(
    (e) => {
      const href = e.detail
      if (!href || href === pathname) return

      setState({
        isLoading: true,
        nextHref: href,
        slideOut: false,
      })
    },
    [pathname],
  )

  useEffect(() => {
    window.addEventListener("page-loader-start", handleStart)
    return () => window.removeEventListener("page-loader-start", handleStart)
  }, [handleStart])

  const preventScroll = useCallback((e) => {
    e.preventDefault()
  }, [])

  const preventKey = useCallback((e) => {
    if (
      ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Space"].includes(e.code)
    ) {
      e.preventDefault()
    }
  }, [])

  useEffect(() => {
    if (!state.isLoading) return

    window.addEventListener("wheel", preventScroll, { passive: false })
    window.addEventListener("touchmove", preventScroll, {
      passive: false,
    })
    window.addEventListener("keydown", preventKey)

    return () => {
      window.removeEventListener("wheel", preventScroll)
      window.removeEventListener("touchmove", preventScroll)
      window.removeEventListener("keydown", preventKey)
    }
  }, [state.isLoading, preventScroll, preventKey])

  useEffect(() => {
    if (!state.isLoading || !state.nextHref) return

    const timer = setTimeout(() => {
      router.push(state.nextHref)
      setState((prev) => ({ ...prev, slideOut: true }))
    }, 200)

    return () => clearTimeout(timer)
  }, [state.isLoading, state.nextHref, router])

  const handleDone = useCallback(() => {
    setState({
      isLoading: false,
      nextHref: null,
      slideOut: false,
    })
  }, [])

  return (
    <>
      <AnimatePresence>
        {state.isLoading && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-gradient-to-b from-[#1e3a8a] via-[#9333ea] to-[#f43f5e]"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
            }}
            onAnimationComplete={() => {
              if (state.slideOut) handleDone()
            }}
          />
        )}
      </AnimatePresence>

      {children}
    </>
  )
}
