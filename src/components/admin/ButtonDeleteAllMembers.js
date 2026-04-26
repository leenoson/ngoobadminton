"use client"

import { useState } from "react"
import DeleteAllMembersModal from "./DeleteAllMembersModal"
import ButtonRipple from "@/components/ButtonRipple"

export default function ButtonDeleteAllMembers() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <ButtonRipple
        className="button01 button01--cancel"
        onClick={() => setOpen(true)}
      >
        Xóa toàn bộ
      </ButtonRipple>

      <DeleteAllMembersModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}
