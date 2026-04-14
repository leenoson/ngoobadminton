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
      className="modal modal--small"
      // onClick={() => {
      //   if (!isPending) onClose()
      // }}
      role="dialog"
    >
      <div className="modal__dialog" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal__close" onClick={handleClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="modal__content">
          <div className="modal__header">
            <p className="modal__title">Xóa NGOO này</p>
          </div>
          <div className="modal__body">
            Bạn có chắc muốn đá đít{" "}
            <strong className="text-(--color-l-1)">{member.name}</strong>?
          </div>
          <div className="modal__footer">
            <button
              disabled={isPending}
              onClick={handleDelete}
              className="button01"
              type="button"
            >
              {isPending ? "Xóa..." : "Xóa"}
            </button>
            <button
              disabled={isPending}
              className="button01 button01--cancel"
              onClick={onClose}
              type="button"
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
