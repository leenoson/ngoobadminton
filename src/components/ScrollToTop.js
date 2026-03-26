"use client"
import { useEffect, useState } from "react"
import { smoothScrollTo } from "@/lib/smoothScroll"

export default function ScrollToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!show) return null

  return (
    <button
      onClick={() => smoothScrollTo(0, 600)}
      className="fixed bottom-5 right-5 px-3 py-2 bg-black text-white rounded"
    >
      ↑ Top
    </button>
  )
}
