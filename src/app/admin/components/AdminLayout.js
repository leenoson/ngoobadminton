"use client"

import { useState, useEffect } from "react"
import Navbar from "./NavbarAdmin"
import clsx from "clsx"
import ImgAvatar from "@/components/ImgAvatar"

function AdminLayout({ children }) {
  const [isClose, setIsClose] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("sidebarClose")
    const handleSetClose = () => setIsClose(saved === "true")
    if (saved !== null) handleSetClose()
  }, [])

  useEffect(() => {
    localStorage.setItem("sidebarClose", isClose)
  }, [isClose])

  return (
    <>
      <div
        className={clsx(`admin`, {
          "is-collapsed": isClose,
        })}
      >
        <aside
          className={clsx(`admin__sidebar`, {
            "is-collapsed": isClose,
          })}
        >
          <Navbar onToggle={() => setIsClose(!isClose)} />
          <div className="admin__bg" onClick={() => setIsClose(!isClose)}></div>
        </aside>

        <main className="admin__main">
          <header className="admin__header">
            <button
              role="button"
              className="button-collapsed"
              onClick={() => setIsClose(!isClose)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={clsx(`size-10 icon-collapsed`, {
                  // hidden: isClose,
                })}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={clsx(`size-10 icon-uncollapsed`, {
                  // hidden: !isClose,
                })}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                />
              </svg>
            </button>
            <button className="button-notice">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>
            </button>
            <div className="admin__info">
              <figure className="admin__avatar">
                <ImgAvatar
                  src="/images/ngoo_04.jpg"
                  alt="Ảnh đại điện của admin"
                  widthprop={200}
                  heightprop={200}
                  classprop=""
                />
              </figure>
            </div>
          </header>
          <div className="admin__content">{children}</div>
          <footer className="admin__footer">
            &copy; All rights reserved by Cactus aka Tarot Reader.
          </footer>
        </main>
      </div>
    </>
  )
}

export default AdminLayout
