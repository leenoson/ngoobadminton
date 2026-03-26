"use client"

import Link from "next/link"
import useAuth from "@/hooks/useAuth"
import { smoothScrollTo } from "@/lib/smoothScroll"
import { useEffect, useRef, useState } from "react"
import AnimatedLink from "@/components/AnimatedLink"

export default function Navbar() {
  const { isLoggedIn } = useAuth()
  const navref = useRef()
  const [navH, setNavH] = useState("0")

  useEffect(() => {
    setNavH(navref.current.getBoundingClientRect().height)
  }, [])

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (!el) return

    const y = el.getBoundingClientRect().top + window.scrollY - navH

    smoothScrollTo(y, 600)
  }

  return (
    <nav className="fixed z-9 top-0 w-[100%] h-auto bg-[#ccc]" ref={navref}>
      <div className="container flex gap-x-4">
        <ul className="flex gap-x-4">
          <li className="menu-item">
            <AnimatedLink href="/about">about</AnimatedLink>
            {/* <span onClick={() => scrollToSection("about")}>NGOO là gì?</span> */}
          </li>
          <li className="menu-item">
            <span onClick={() => scrollToSection("rank")}>Top 10 NGOO</span>
          </li>
          <li className="menu-item">
            <span onClick={() => scrollToSection("event")}>NGOO có gì</span>
          </li>
          <li className="menu-item">
            <span onClick={() => scrollToSection("contact")}>Liên hệ NGOO</span>
          </li>
        </ul>
        <div className="menu-logo">
          <AnimatedLink className="" href="/">
            Logo NGOO
          </AnimatedLink>
        </div>
        {isLoggedIn ? (
          <Link className="btn btn-outline-danger ms-3" href="/admin">
            Admin
          </Link>
        ) : (
          <Link className="btn btn-primary btn-sm" href="/login">
            Bí mật?
          </Link>
        )}
      </div>
    </nav>
  )
}
