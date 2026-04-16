"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { lockScroll, unlockScroll } from "@/lib/scrollLock"

const ModalContext = createContext()

export function ModalProvider({ children }) {
  const [content, setContent] = useState(null)

  const openModal = (modalContent) => {
    setContent(modalContent)
  }

  const closeModal = () => {
    setContent(null)
  }

  useEffect(() => {
    if (!content) {
      unlockScroll()
      return
    }

    lockScroll()

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        closeModal()
      }
    }

    window.addEventListener("keydown", handleEsc)

    return () => {
      window.removeEventListener("keydown", handleEsc)
      unlockScroll()
    }
  }, [content])

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {content && (
        <div
          className="modal"
          role="dialog"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeModal()
            }
          }}
        >
          <div className="modal__dialog" onClick={(e) => e.stopPropagation()}>
            <button className="modal__close" onClick={closeModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="modal__content">
              <div className="modal01__body">{content}</div>
            </div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)
