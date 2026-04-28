"use client"

import { useState, useCallback, useEffect, useRef } from "react"

export function useAccordion(data = [], { multiple = false } = {}) {
  const [openItems, setOpenItems] = useState(multiple ? [] : null)

  const initializedRef = useRef(false)

  useEffect(() => {
    if (!data?.length) return

    const initialOpen = data.filter((item) => item.open).map((item) => item.id)

    const handleSetOpenItems = () => {
      setOpenItems(multiple ? initialOpen : (initialOpen[0] ?? null))
      initializedRef.current = true
    }

    if (!initializedRef.current) {
      handleSetOpenItems()
    }
  }, [data, multiple])

  const toggle = useCallback(
    (id) => {
      setOpenItems((prev) => {
        if (multiple) {
          return prev.includes(id)
            ? prev.filter((i) => i !== id)
            : [...prev, id]
        }
        return prev === id ? null : id
      })
    },
    [multiple],
  )

  const isOpen = useCallback(
    (id) => (multiple ? openItems.includes(id) : openItems === id),
    [openItems, multiple],
  )

  return { isOpen, toggle, openItems }
}
