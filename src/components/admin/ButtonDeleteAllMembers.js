"use client"

import { useState } from "react"
import DeleteAllMembersModal from "./DeleteAllMembersModal"
import ButtonRipple from "@/components/ButtonRipple"
import { Icons } from "../Icons"

export default function ButtonDeleteAllMembers() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <ButtonRipple
        className="button01 button01--cancel"
        onClick={() => setOpen(true)}
      >
        <Icons.Delete />
        Xóa toàn bộ
      </ButtonRipple>

      <DeleteAllMembersModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}
