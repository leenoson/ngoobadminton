"use client"

import { addMember } from "@/app/actions/memberActions"
import { useRef, useState, useTransition } from "react"
import { compressImage } from "@/lib/image/compressImage"
import ImgAvatar from "@/components/ImgAvatar"
import useModal from "@/hooks/useModal"

export default function AddMemberModal({ isOpen, onClose }) {
  const formRef = useRef(null)

  const [avatar, setAvatar] = useState(null)
  const [name, setName] = useState("")
  const [nickname, setNickname] = useState("")
  const [isPending, startTransition] = useTransition()

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const compressed = await compressImage(file)

    if (avatar?.preview) {
      URL.revokeObjectURL(avatar.preview)
    }

    const preview = URL.createObjectURL(compressed)

    setAvatar({
      file: compressed,
      preview,
    })
  }

  const handleSubmit = async (formData) => {
    if (avatar?.file) {
      formData.set("avatar", avatar.file)
    }
    startTransition(async () => {
      await addMember(formData)
      handleClose()
    })
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const resetForm = () => {
    formRef?.current?.reset()
    setName("")
    setNickname("")

    if (avatar?.preview) {
      URL.revokeObjectURL(avatar.preview)
    }

    setAvatar(null)
  }

  useModal({
    isOpen,
    onClose,
    isPending,
  })

  if (!isOpen) return null

  return (
    <div
      className="modal modal-custom"
      onClick={() => {
        if (!isPending) handleClose()
      }}
    >
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <form ref={formRef} action={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title fs-5">Thêm thành viên</h5>
              <button type="button" className="btn-close" onClick={handleClose}>
                X
              </button>
            </div>

            <div className="modal-body">
              <div className="mb-3">
                <label>Tên</label>
                <input
                  name="name"
                  required
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isPending}
                  autoFocus
                />
              </div>
              <div className="mb-3">
                <label>Nick name</label>
                <input
                  name="nickname"
                  required
                  className="form-control"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  disabled={isPending}
                />
              </div>
              <div className="mb-3">
                <label>Ngày tham gia</label>
                <input
                  type="date"
                  name="joined_at"
                  required
                  className="form-control"
                  disabled={isPending}
                />
              </div>
              <div className="mb-3">
                <label>Avatar</label>
                <input
                  type="file"
                  name="avatar"
                  className="form-control"
                  onChange={(e) => handleFile(e)}
                  accept="image/*"
                  disabled={isPending}
                />
                <div className="mt-3">
                  {avatar && (
                    <ImgAvatar
                      src={avatar.preview}
                      alt={name}
                      classprop="rounded object-fit-cover w-100"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                disabled={isPending}
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Hủy
              </button>
              <button
                disabled={isPending}
                type="submit"
                className="btn btn-primary"
              >
                {isPending ? "Thêm..." : "Thêm"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
