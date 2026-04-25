"use client"

import { useTransition } from "react"
import { toast } from "react-toastify"
import { deleteAllMembers } from "@/app/actions/memberActions"
import useModal from "@/hooks/useModal"
import { useRouter } from "next/navigation"
import ButtonRipple from "@/components/ButtonRipple"
import { LineSpinner } from "ldrs/react"

export default function DeleteAllMembersModal({ isOpen, onClose }) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  useModal({
    isOpen,
    onClose,
    isPending,
  })

  if (!isOpen) return null

  const handleDelete = () => {
    if (isPending) return

    startTransition(async () => {
      await toast.promise(deleteAllMembers(), {
        pending: "Đang thanh trừng toàn bộ NGOO...",
        success: "Toàn bộ NGOO đã bị xóa 💀",
        error: "Xóa thất bại ❌",
      })

      onClose()
      router.refresh()
    })
  }

  return (
    <div
      className="modal modal--small"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !isPending) onClose()
      }}
    >
      <div className="modal__dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>
          ✕
        </button>

        <div className="modal__content">
          <div className="modal__header">
            <p className="modal__title text-red-500">⚠ Xóa toàn bộ NGOO</p>
          </div>

          <div className="modal__body">
            Bạn có chắc muốn <strong>XÓA TOÀN BỘ MEMBER</strong> không?
            <br />
            <span className="text-red-500">
              Hành động này không thể hoàn tác!
            </span>
          </div>

          <div className="modal__footer">
            <ButtonRipple
              disabled={isPending}
              className="button01 button01--cancel"
              onClick={handleDelete}
            >
              {isPending && (
                <LineSpinner size="24" stroke="1" speed="1" color="#fff" />
              )}
              Xóa tất cả
            </ButtonRipple>

            <button disabled={isPending} className="button01" onClick={onClose}>
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
