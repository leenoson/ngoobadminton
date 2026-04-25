// hooks/useElementCssVar.js
"use client"

import { useEffect } from "react"

export default function useElementCssVar(ref, key) {
  useEffect(() => {
    if (!ref?.current) return

    const element = ref.current

    const updateSize = () => {
      const rect = element.getBoundingClientRect()

      document.documentElement.style.setProperty(
        `--${key}-height`,
        `${rect.height}px`,
      )
    }

    updateSize()

    const observer = new ResizeObserver(() => {
      updateSize()
    })

    observer.observe(element)

    if (document.fonts) {
      document.fonts.ready.then(updateSize)
    }

    return () => observer.disconnect()
  }, [ref, key])
}
