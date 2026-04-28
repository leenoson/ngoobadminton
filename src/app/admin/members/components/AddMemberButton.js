"use client"

import { useState } from "react"
import AddMemberModal from "./AddMemberModal"
import { Icons } from "@/components/Icons"

export default function AddMemberButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mb-(--spac)">
      <button className="button01" onClick={() => setIsOpen(true)}>
        <Icons.AddMember />
        <span className="button01__text">Thêm NGOO</span>
      </button>

      <AddMemberModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  )
}
