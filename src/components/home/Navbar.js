"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import clsx from "clsx"
import Button from "@mui/material/Button"
import useAuth from "@/hooks/useAuth"
import { useDevice } from "@/hooks/useDevice"
import useScrollToSection from "@/hooks/useScrollToSection"
import useScrollSpy from "@/hooks/useScrollSpy"
import Logo from "./Logo"
import ThemeToggle from "../ThemeToggle"
import useElementCssVar from "@/hooks/useElementCssVar"
// import AnimatedLink from "@/components/AnimatedLink"

export default function Navbar() {
  const { isMobileDevice, isSmallScreen } = useDevice()
  const { isLoggedIn } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const scrollTo = useScrollToSection()
  const isDevelopment = process.env.NODE_ENV

  // const navbarRef = useRef(null)
  // const menuRef = useRef(null)
  // useElementCssVar(navbarRef, "navbar")
  // useElementCssVar(menuRef, "navbarmenu")

  const customStyledButtonAdmin = {
    backgroundColor: "var(--color-l-2)",
    color: "var(--color-l-4)",
    "&:hover": {
      backgroundColor: "var(--color-l-2-hover)",
    },
    border: "1px solid var(--color-l-4)",
    transition: "0.3s ease",
    borderRadius: "var(--radius-m)",
    width: "40px",
    minWidth: "40px",
    padding: "3px 0",
    textTransform: "uppercase",
    textAlign: "center",
    fontWeight: 500,
    zIndex: 2,
  }

  useScrollSpy({
    sectionIds: ["about", "event", "contact"],
  })

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={clsx(`header__navbar`)}>
      <div
        id="mainnav"
        className={clsx(`header__container ${scrolled && "is-scrolled"}`)}
      >
        <div className="menu__logo">
          <Logo />
        </div>

        <ul
          className={clsx(`header__menu`, {
            "is-mobile": isMobileDevice || isSmallScreen,
          })}
        >
          <li className="menu-item">
            {/* <AnimatedLink href="/about">about</AnimatedLink> */}
            <span
              className={clsx(
                `menu__text
                ${scrolled && ""}
                `,
                {
                  "": isMobileDevice || isSmallScreen,
                },
              )}
              onClick={() => scrollTo("about", { duration: 1000 })}
              data-scroll="about"
            >
              NGOO là gì?
            </span>
          </li>
          <li className="menu-item">
            <span
              className={clsx(
                `menu__text
                ${scrolled && ""}
                `,
                {
                  "": isMobileDevice || isSmallScreen,
                },
              )}
              onClick={() => scrollTo("event", { duration: 1000 })}
              data-scroll="event"
            >
              NGOO vui lắm
            </span>
          </li>
          <li className="menu-item">
            <span
              className={clsx(
                `menu__text
                ${scrolled && ""}
                `,
                {
                  "": isMobileDevice || isSmallScreen,
                },
              )}
              onClick={() => scrollTo("contact", { duration: 1000 })}
              data-scroll="contact"
            >
              NGOO ở đây
            </span>
          </li>
        </ul>

        <ThemeToggle />

        {isDevelopment === "development" && (
          <Button
            aria-label="Truy cập admin"
            data-no-progress
            component={Link}
            href={isLoggedIn ? "/admin" : "/login"}
            sx={customStyledButtonAdmin}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </Button>
        )}
      </div>
    </nav>
  )
}
