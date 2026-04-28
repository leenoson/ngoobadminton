"use client"

import { useTransition } from "react"
import { toast } from "react-toastify"
import useModal from "@/hooks/useModal"
import { useRouter } from "next/navigation"
import ButtonRipple from "@/components/ButtonRipple"
import { LineSpinner } from "ldrs/react"
import { Icons } from "@/components/Icons"
import { deleteMedia } from "@/app/actions/mediaActions"

export default function DeleteMediaModal({ media, onClose }) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleDelete = () => {
    if (isPending) return

    startTransition(async () => {
      await toast.promise(deleteMedia([media.id]), {
        pending: "Đang xóa",
        success: "Xóa thành công",
        error: "Xóa thất bại",
      })

      onClose()
      router.refresh()
    })
  }

  const handleClose = () => onClose()

  useModal({
    isOpen: !!media,
    onClose,
    isPending,
  })

  if (!media) return null

  return (
    <div
      className="modal modal--small"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !isPending) {
          handleClose()
        }
      }}
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
            <p className="modal__title">Xóa file này</p>
          </div>
          <div className="modal__footer">
            <ButtonRipple
              disabled={isPending}
              className="button01"
              onClick={handleDelete}
            >
              {isPending && (
                <LineSpinner size="24" stroke="1" speed="1" color="#fff" />
              )}{" "}
              <Icons.Delete />
              Xóa
            </ButtonRipple>

            <button
              disabled={isPending}
              className="button01 button01--cancel"
              onClick={onClose}
              type="button"
            >
              <Icons.Cancel />
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
