"use client"

import { useState, useTransition } from "react"
import { toast } from "react-toastify"
import { deleteAllMembers } from "@/app/actions/memberActions"
import useModal from "@/hooks/useModal"
import ButtonRipple from "@/components/ButtonRipple"
import { LineSpinner } from "ldrs/react"

export default function DeleteAllMembersModal({ isOpen, onClose }) {
  const [isPending, startTransition] = useTransition()
  const [confirmText, setConfirmText] = useState("")

  const isValid = confirmText.trim().toLowerCase() === "xóa hết"

  const handleDelete = () => {
    if (!isValid || isPending) return

    startTransition(async () => {
      await toast.promise(deleteAllMembers(), {
        pending: "Đang xóa toàn bộ NGOO...",
        success: "Đã xóa sạch 🧹",
        error: "Xóa thất bại ❌",
      })

      onClose()
    })
  }

  useModal({
    isOpen,
    onClose,
    isPending,
  })

  if (!isOpen) return null

  return (
    <div
      className="modal modal--small"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !isPending) {
          onClose()
        }
      }}
    >
      <div className="modal__dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal__content">
          <div className="modal__header">
            <p className="modal__title text-red-500">⚠️ Xóa toàn bộ NGOO</p>
          </div>

          <div className="modal__body">
            <p className="mb-2">
              Hành động này <strong>KHÔNG THỂ HOÀN TÁC</strong>
            </p>
            <p className="mb-2">
              Nhập <strong>&quot;xóa hết&quot;</strong> để xác nhận:
            </p>

            <input
              className="input"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              disabled={isPending}
            />
          </div>

          <div className="modal__footer">
            <ButtonRipple
              className="button01 button01--cancel"
              disabled={!isValid || isPending}
              onClick={handleDelete}
            >
              {isPending && (
                <LineSpinner size="24" stroke="1" speed="1" color="#fff" />
              )}
              Xóa toàn bộ
            </ButtonRipple>

            <button className="button01" onClick={onClose} disabled={isPending}>
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
