"use client"
import { useRef, useEffect, useState } from "react"

export default function AccordionItem({ title, children, isOpen, onToggle }) {
  const contentRef = useRef(null)
  const [maxHeight, setMaxHeight] = useState(0)

  useEffect(() => {
    if (!contentRef.current) return

    if (isOpen) {
      setMaxHeight(contentRef.current.scrollHeight)
    } else {
      setMaxHeight(0)
    }
  }, [isOpen])

  return (
    <div className="border-b">
      <button
        onClick={onToggle}
        className="w-full py-4 flex justify-between items-center"
      >
        <span>{title}</span>
        <span
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      <div
        style={{
          maxHeight: `${maxHeight}px`,
        }}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        <div
          ref={contentRef}
          className={`pb-4 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
