"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { lockScroll, unlockScroll } from "@/lib/scrollLock"
import { Icons } from "./Icons"
import clsx from "clsx"

const ModalContext = createContext()

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(null)

  const openModal = ({
    content,
    title,
    className = "",
    hideFooter = false,
  }) => {
    setModal({ content, title, className, hideFooter })
  }

  const closeModal = () => {
    setModal(null)
  }

  useEffect(() => {
    if (!modal) {
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
  }, [modal])

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {modal && (
        <div
          className={clsx(`modal ${modal.className}`)}
          role="dialog"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeModal()
            }
          }}
        >
          <div className="modal__dialog" onClick={(e) => e.stopPropagation()}>
            <button className="modal__close" onClick={closeModal}>
              <Icons.Close />
            </button>
            <div className="modal__content">
              {modal.title && (
                <div className="modal__header">
                  <p className="modal__title">{modal.title}</p>
                </div>
              )}
              <div className="modal01__body">{modal.content}</div>
              {!modal.hideFooter && (
                <div className="modal__footer">
                  <button
                    className="button01 button01--info"
                    onClick={closeModal}
                  >
                    <Icons.Info />
                    Đã hiểu
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)
