"use client"

import EditMemberModal from "@/app/admin/members/components/EditMemberModal"
import { useState } from "react"

function ButtonEditMember({ member }) {
  const [selectedMember, setSelectedMember] = useState(null)

  return (
    <>
      <button className="button01" onClick={() => setSelectedMember(member)}>
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
