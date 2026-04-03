"use client"

import { useTransition } from "react"
import { toast } from "react-toastify"
import { deleteMember } from "@/app/actions/memberActions"
import useModal from "@/hooks/useModal"

export default function DeleteMemberModal({ member, onClose }) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    if (isPending) return

    startTransition(async () => {
      await toast.promise(deleteMember(member.id, member.avatar), {
        pending: "Đang cho đứa NGOO cook...",
        success: "Một đứa NGOO bị cook!",
        error: "Xóa thất bại ❌",
      })
      onClose()
    })
  }

  const handleClose = () => {
    onClose()
  }

  useModal({
    isOpen: open,
    onClose,
    isPending,
  })

  if (!member) return null

  return (
    <div
      className="modal modal-custom"
      onClick={() => {
        if (!isPending) onClose()
      }}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h3>Xóa NGOO này</h3>
            <button type="button" className="btn-close" onClick={handleClose}>
              X
            </button>
          </div>
          <div className="modal-body">
            Bạn có chắc muốn đá đít <strong>{member.name}</strong>?
          </div>
          <div className="modal-footer">
            <button
              disabled={isPending}
              className="btn btn-primary"
              onClick={onClose}
              type="button"
            >
              Hủy
            </button>

            <button
              disabled={isPending}
              onClick={handleDelete}
              className="btn btn-danger"
              type="button"
            >
              {isPending ? "Đang xóa..." : "Xóa"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
