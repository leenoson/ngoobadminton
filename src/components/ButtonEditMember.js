"use client"

import EditMemberModal from "@/app/admin/members/components/EditMemberModal"
import { useState } from "react"
import { Icons } from "./Icons"

function ButtonEditMember({ member }) {
  const [selectedMember, setSelectedMember] = useState(null)

  return (
    <>
      <button className="button01" onClick={() => setSelectedMember(member)}>
        <Icons.Edit />
        Sửa
      </button>

      {selectedMember && (
        <EditMemberModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </>
  )
}

export default ButtonEditMember
