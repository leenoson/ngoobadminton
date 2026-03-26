"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import clsx from "clsx"
import useAuth from "@/hooks/useAuth"
import { smoothScrollTo } from "@/lib/smoothScroll"
import { useDevice } from "@/hooks/useDevice"
// import AnimatedLink from "@/components/AnimatedLink"

export default function Navbar() {
  const { isMobileDevice, isSmallScreen } = useDevice()
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

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY)

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={clsx(
        `fixed z-9 top-0 w-[100%] h-auto px-4 py-3 transition-all ${scrolled && "bg-[var(--color-primary-3)]"}`,
      )}
      ref={navref}
    >
      <div className="flex gap-x-4 items-center">
        <div className="menu-logo">
          <Link href="/">
            <figure className="w-10 h-auto">
              <Image
                src="/images/common/logo.jpg"
                alt="NGOO Badminton"
                width={100}
                height={100}
              />
            </figure>
          </Link>
          {/* <AnimatedLink className="" href="/">
            Logo NGOO
          </AnimatedLink> */}
        </div>
        <ul
          className={clsx(`flex gap-x-4`, {
            "fixed w-full justify-center px-3 py-2 bottom-0 left-0 bg-[var(--color-primary-3)] !gap-x-2":
              isMobileDevice || isSmallScreen,
          })}
        >
          <li className="menu-item">
            {/* <AnimatedLink href="/about">about</AnimatedLink> */}
            <span
              className={clsx(
                `text-[var(--color-primary-2)] cursor-pointer transition-all
                ${scrolled && ""}
                `,
                {
                  "!text-(--color-primary-2) text-sm":
                    isMobileDevice || isSmallScreen,
                },
              )}
              onClick={() => scrollToSection("about")}
            >
              NGOO là gì?
            </span>
          </li>
          <li className="menu-item">
            <span
              className={clsx(
                `text-[var(--color-primary-2)] cursor-pointer transition-all
                ${scrolled && ""}
                `,
                {
                  "!text-(--color-primary-2) text-sm":
                    isMobileDevice || isSmallScreen,
                },
              )}
              onClick={() => scrollToSection("event")}
            >
              NGOO vui lắm
            </span>
          </li>
          <li className="menu-item">
            <span
              className={clsx(
                `text-[var(--color-primary-2)] cursor-pointer transition-all
                ${scrolled && ""}
                `,
                {
                  "!text-(--color-primary-2) text-sm":
                    isMobileDevice || isSmallScreen,
                },
              )}
              onClick={() => scrollToSection("contact")}
            >
              NGOO ở đây
            </span>
          </li>
        </ul>

        {isLoggedIn ? (
          <Link
            className="text-[12px] ml-auto w-30 h-auto py-2 px-3 bg-[var(--color-primary-4)] text-[#fff] uppercase text-center"
            href="/admin"
            data-no-progress
          >
            Admin
          </Link>
        ) : (
          <Link
            data-no-progress
            className="text-[12px] ml-auto w-30 h-auto py-2 px-3 bg-[var(--color-primary-4)] text-[#fff] uppercase text-center"
            href="/login"
          >
            Bí mật?
          </Link>
        )}
      </div>
    </nav>
  )
}
