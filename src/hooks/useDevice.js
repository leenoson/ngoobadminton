"use client"

import { useState, useEffect } from "react"

export function useDevice() {
  const [isMobileDevice, setIsMobileDevice] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const detectMobile = () => {
      const ua = navigator.userAgent || navigator.vendor || window.opera
      return /android|iPhone|iPad|iPod/i.test(ua)
    }

    const checkScreen = () => window.innerWidth <= 768

    const update = () => {
      const mobile = detectMobile()
      const small = checkScreen()

      setIsMobileDevice(mobile)
      setIsSmallScreen(small)

      // 🔥 xử lý class tại đây luôn
      if (mobile || small) {
        document.body.classList.add("is-mobile")
      } else {
        document.body.classList.remove("is-mobile")
      }
    }

    update()

    window.addEventListener("resize", update)

    return () => window.removeEventListener("resize", update)
  }, [])

  return { isMobileDevice, isSmallScreen }
}
