"use client"

import { useState } from "react"
import DeleteMemberModal from "@/app/admin/members/components/DeleteMemberModal"

function ButtonDeleteMember({ member, redirectAfterDelete = false }) {
  const [deletingMember, setDeletingMember] = useState(null)

  return (
    <>
      <button
        className="button01 button01--cancel"
        onClick={() => setDeletingMember(member)}
      >
        Xóa
      </button>

      {deletingMember && (
        <DeleteMemberModal
          member={deletingMember}
          onClose={() => setDeletingMember(null)}
          redirectAfterDelete={redirectAfterDelete}
        />
      )}
    </>
  )
}

export default ButtonDeleteMember
