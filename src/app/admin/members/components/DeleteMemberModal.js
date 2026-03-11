"use client"

import { deleteMember } from "@/app/actions/memberActions"
import { useTransition } from "react"

export default function DeleteMemberModal({ open, onClose, member }) {
	const [isPending, startTransition] = useTransition()
  if (!open) return null

  const handleDelete = async () => {
    startTransition(async () => {
      await deleteMember(member.id, member.avatar)
      onClose()
    })
  }

  return (
    <div className="p-2">
      <h3>Delete member</h3>
      <p>
        Are you sure you want to delete <b>{member.name}</b>?
      </p>
      <div className="d-flex justify-content-between">

        <button disabled={isPending} className="btn btn-primary" onClick={onClose}>
          Cancel
        </button>

        <button
          disabled={isPending}
          onClick={handleDelete}
          className="btn btn-danger"
        >
          {isPending ? "Đang xóa..." : "Xóa"}
        </button>
      </div>
    </div>
  )

}