// components/AOSProvider.jsx
"use client"

import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

export default function AOSProvider({ children }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      AOS.init({
        duration: 1000,
        once: true,
        easing: "ease",
        anchorPlacement: "bottom-bottom",
      })

      AOS.refresh()
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return children
}
