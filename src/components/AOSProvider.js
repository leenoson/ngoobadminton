// components/AOSProvider.jsx
"use client"

import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

export default function AOSProvider({ children }) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out-quart",
      anchorPlacement: "center-bottom",
    })
  }, [])

  return children
}
