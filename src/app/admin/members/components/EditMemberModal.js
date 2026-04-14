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
  const [level, setLevel] = useState(member?.level || "")
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

    formData.append("level", level)
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
    isOpen: !!member,
    onClose,
    isPending,
  })

  if (!member) return null

  return (
    <div
      className="modal"
      // onClick={() => {
      //   if (!isPending) onClose()
      // }}
      role="dialog"
    >
      <div className="modal__dialog" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal__close" onClick={onClose}>
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
          <form className="form03" ref={formRef} action={handleSubmit}>
            <div className="modal__header">
              <p className="modal__title">Cập nhật thông tin</p>
            </div>
            <div className="modal__body">
              <div className="form03__group">
                <label className="form03__control">
                  <span className="form03__text">Họ & tên</span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={isPending}
                    className="form03__input"
                    name="name"
                    autoFocus
                    aria-label="Tên"
                  />
                </label>
                <label className="form03__control">
                  <span className="form03__text">Nickname</span>
                  <input
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    disabled={isPending}
                    className="form03__input"
                    name="nickname"
                    aria-label="Nickname"
                    placeholder="Một nhân cách khác"
                  />
                </label>
              </div>
              <div className="form03__group">
                <label className="form03__control">
                  <span className="form03__text">
                    Trình/số năm chơi cầu lông
                  </span>
                  <input
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    disabled={isPending}
                    className="form03__input"
                    name="level"
                    aria-label="Trình"
                    placeholder="1000 năm/chuyên gia phá lưới"
                  />
                </label>
                <label className="form03__control">
                  <span className="form03__text">Ngày tham gia</span>
                  <input
                    type="date"
                    value={joinedAt}
                    onChange={(e) => setJoinedAt(e.target.value)}
                    required
                    disabled={isPending}
                    name="joined_at"
                    className="form03__input"
                    aria-label="Ngày tham gia"
                  />
                </label>
              </div>

              <label className="form03__control">
                <span className="form03__text">Thay ảnh đại diện</span>
                <span className="form03__upfile">Chọn ảnh</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  disabled={isPending}
                  name="avatar"
                  className="form03__file"
                  aria-label="Ảnh đại diện"
                />
                <div className="form03__preview">
                  {preview && <ImgAvatar src={preview} alt={member.name} />}
                </div>
              </label>

              <button
                disabled={isPending || !avatar}
                type="button"
                className="button01 mt-(--spac)"
                onClick={handleResetAvatar}
              >
                Giữ avatar cũ
              </button>
            </div>

            <div className="modal__footer">
              <button
                disabled={isPending}
                type="button"
                className="button01 button01--cancel"
                onClick={onClose}
              >
                Hủy
              </button>
              <button disabled={isPending} type="submit" className="button01">
                {isPending ? "Lưu..." : "Lưu"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
