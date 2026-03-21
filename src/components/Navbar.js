"use client"

import Link from "next/link"
import useAuth from "@/hooks/useAuth"

export default function Navbar() {
  const { isLoggedIn } = useAuth()

  return (
    <nav className="navbar-custom">
      <div className="navbar-container">
        <ul className="menu">
          <li className="menu-item">
            <a href="#about">NGOO là gì?</a>
          </li>
          <li className="menu-item">
            <a href="#join">Top 10 NGOO</a>
          </li>
          <li className="menu-item">
            <a href="#contact">Liên hệ NGOO</a>
          </li>
        </ul>
        <div className="menu-logo">
          <Link className="navbar-brand" href="/">
            Logo NGOO
          </Link>
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
