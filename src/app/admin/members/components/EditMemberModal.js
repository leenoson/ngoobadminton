"use client"

import { useState, useRef, useTransition } from "react"
import { toast } from "react-toastify"
import { updateMember } from "@/app/actions/memberActions"
import ImgAvatar from "@/components/ImgAvatar"
import { compressImage } from "@/lib/image/compressImage"
import { formatDate } from "@/lib/formatDate"
import useModal from "@/hooks/useModal"

export default function EditMemberModal({ member, onClose }) {
  const inputFile = useRef(null)
  const [isPending, startTransition] = useTransition()
  const [name, setName] = useState(member?.name)
  const [nickname, setNickname] = useState(member?.nickname || "")
  const [joinedAt, setJoinedAt] = useState(
    member?.joined_at ? formatDate(member.joined_at) : "",
  )
  const [avatar, setAvatar] = useState(null)
  const [preview, setPreview] = useState(member?.avatar || "/images/noimg.png")

  const formRef = useRef(null)

  const handleResetAvatar = () => {
    setAvatar(null)

    setPreview(member?.avatar || null)

    if (inputFile.current) {
      inputFile.current.value = null
    }
  }

  const handleFile = async (e) => {
    const file = e.target.files[0]

    if (!file) return

    const compressed = await compressImage(file)

    setAvatar(compressed)

    const url = URL.createObjectURL(file)

    setPreview(url)
  }
  const handleSubmit = async () => {
    const formData = new FormData()

    formData.append("id", member.id)
    formData.append("name", name)
    formData.append("nickname", nickname)
    formData.append("joined_at", joinedAt)

    if (avatar) {
      formData.append("avatar", avatar)
    }

    startTransition(async () => {
      await toast.promise(updateMember(formData), {
        pending: "Đang cập nhật thông tin...",
        success: "Một đứa NGOO bị đổi thông tin!",
        error: "Cập nhật thất bại ❌",
      })
      onClose()
    })
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
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <form ref={formRef} action={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title fs-5">Cập nhật thông tin</h5>
              <button type="button" className="btn-close" onClick={onClose}>
                X
              </button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label>Tên</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isPending}
                  className="form-control"
                  name="name"
                  autoFocus
                />
              </div>
              <div className="mb-3">
                <label>Tên thân mật</label>
                <input
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  required={false}
                  disabled={isPending}
                  className="form-control"
                  name="nickname"
                />
              </div>

              <div className="mb-3">
                <label>Ngày tham gia</label>
                <input
                  type="date"
                  value={joinedAt}
                  onChange={(e) => setJoinedAt(e.target.value)}
                  required
                  disabled={isPending}
                  name="joined_at"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label>Thay avatar</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  disabled={isPending}
                  name="avatar"
                  className="form-control"
                />
                <div className="mt-3">
                  {preview && (
                    <div className="avatar-preview">
                      <ImgAvatar
                        src={preview}
                        alt={member.name}
                        classprop="rounded"
                      />
                    </div>
                  )}
                </div>
              </div>

              <button
                disabled={isPending || !avatar}
                type="button"
                className="btn btn-primary"
                onClick={handleResetAvatar}
              >
                Giữ avatar cũ
              </button>
            </div>

            <div className="modal-footer">
              <button
                disabled={isPending}
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Hủy
              </button>
              <button
                disabled={isPending}
                type="submit"
                className="btn btn-primary"
              >
                {isPending ? "Đang lưu..." : "Lưu"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
