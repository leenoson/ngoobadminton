"use client"

import { useState } from "react"
import DeleteMemberModal from "@/app/admin/members/components/DeleteMemberModal"
import ButtonRipple from "./ButtonRipple"

function ButtonDeleteMember({ member, redirectAfterDelete = false }) {
  const [deletingMember, setDeletingMember] = useState(null)

  return (
    <>
      {/* <button
        className="button01 button01--cancel"
        onClick={() => setDeletingMember(member)}
      >
        Xóa
      </button> */}
      <ButtonRipple
        className="button01 button01--cancel"
        onClick={() => setDeletingMember(member)}
      >
        Xóa
      </ButtonRipple>

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
