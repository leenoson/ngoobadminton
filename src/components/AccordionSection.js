"use client"

import { useAccordion } from "@/hooks/useAccordion"
import AccordionItem from "@/components/AccordionItem"
import { useState, useEffect } from "react"

export default function Accordion() {
  const [data, setData] = useState([])

  useEffect(() => {
    setTimeout(() => {
      setData([
        { id: 1, title: "Item 1", content: "Content 1" },
        { id: 2, title: "Item 2", content: "Content 2" },
        { id: 3, title: "Item 3", content: "Content 3" },
      ])
    }, 0)
  }, [])

  const { isOpen, toggle } = useAccordion(data, { multiple: true })

  return (
    <div className="max-w-xl mx-auto">
      {data.map((item) => (
        <AccordionItem
          key={item.id}
          title={item.title}
          isOpen={isOpen(item.id)}
          onToggle={() => toggle(item.id)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  )
}
