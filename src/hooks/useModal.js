import { useEffect } from "react"

export default function useModal({ isOpen, onClose, isPending = false }) {
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const body = document.body

    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth

    const originalOverflow = body.style.overflow
    const originalPaddingRight = body.style.paddingRight

    body.style.overflow = "hidden"

    if (scrollBarWidth > 0) {
      body.style.paddingRight = `${scrollBarWidth}px`
    }

    const handleEsc = (e) => {
      if (e.key === "Escape" && !isPending) {
        onClose?.()
      }
    }

    window.addEventListener("keydown", handleEsc)

    return () => {
      body.style.overflow = originalOverflow
      body.style.paddingRight = originalPaddingRight
      window.removeEventListener("keydown", handleEsc)
    }
  }, [isOpen, onClose, isPending])
}
