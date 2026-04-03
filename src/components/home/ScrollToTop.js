"use client"

import { useEffect, useState } from "react"
import { smoothScrollTo } from "@/lib/smoothScroll"
import Button from "@mui/material/Button"
import clsx from "clsx"

export default function ScrollToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // if (!show) return null

  return (
    <Button
      aria-label="Scroll lên trên cùng"
      onClick={() => smoothScrollTo(0, 600)}
      className={clsx(`scrolltotop`, {
        "is-show": show,
      })}
      sx={{
        "&:hover": {
          backgroundColor: "var(--color-l-2-hover)",
        },
        position: "fixed",
        zIndex: 999,
        width: 48,
        minWidth: 48,
        aspectRatio: "1 / 1",
        borderRadius: "50%",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--color-l-2)",
        color: "var(--color-l-4)",
        transition: "0.6s ease",
        padding: 0,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className=""
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 18.75 7.5-7.5 7.5 7.5"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 12.75 7.5-7.5 7.5 7.5"
        />
      </svg>
    </Button>
  )
}
