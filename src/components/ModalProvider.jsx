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

      {/* Modal UI */}
      {content && (
        <div className="fixed p-4 inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          />

          <div className="relative z-10 bg-white rounded-2xl p-6 shadow-2xl min-w-[300px] max-h-[80vh] overflow-y-auto">
            <button onClick={closeModal}>Close</button>

            {content}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)
