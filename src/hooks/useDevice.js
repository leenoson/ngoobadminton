"use client"

import { useState, useEffect } from "react"

export function useDevice() {
  const [isMobileDevice, setIsMobileDevice] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const detectMobile = () => {
      const ua = navigator.userAgent || navigator.vendor || window.opera
      const mobileDevice = /android|iPhone|iPad|iPod/i.test(ua)
      setIsMobileDevice(mobileDevice)
    }

    detectMobile()

    const checkScreen = () => setIsSmallScreen(window.innerWidth <= 768)

    checkScreen()
    window.addEventListener("resize", checkScreen)

    return () => window.removeEventListener("resize", checkScreen)
  }, [])

  return { isMobileDevice, isSmallScreen }
}
