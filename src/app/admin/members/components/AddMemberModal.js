"use client"
import { useRef, useState, useTransition } from "react"
import { toast } from "react-toastify"
import { compressImage } from "@/lib/image/compressImage"
import { addMember } from "@/app/actions/memberActions"
import ImgAvatar from "@/components/ImgAvatar"
import useModal from "@/hooks/useModal"

export default function AddMemberModal({ isOpen, onClose }) {
  const notify = () => toast("Wow so easy !")

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
      await toast.promise(addMember(formData), {
        pending: "Đang thêm một NGOO...",
        success: "Một nạn nhân của NGOO xuất hiện!",
        error: "Thêm thất bại ❌",
      })
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
      className="modal"
      onClick={() => {
        if (!isPending) handleClose()
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
          <form
            className="form03"
            ref={formRef}
            action={handleSubmit}
            noValidate
          >
            <div className="modal__header">
              <p className="modal__title">Thêm thành viên</p>
            </div>

            <div className="modal__body">
              <label className="form03__control">
                <span className="form03__text">Họ & tên</span>
                <input
                  name="name"
                  required
                  className="form03__input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isPending}
                  autoFocus
                  autoComplete="name"
                  aria-label="Tên"
                  placeholder="Nguyễn Văn Cẩm"
                />
              </label>
              <label className="form03__control">
                <span className="form03__text">Nickname</span>
                <input
                  name="nickname"
                  required
                  className="form03__input"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  disabled={isPending}
                  placeholder="Cẩm Hót"
                  aria-label="Nickname"
                  autoComplete="Nickname"
                />
              </label>
              <label className="form03__control">
                <span className="form03__text">Ngày tham gia</span>
                <input
                  type="date"
                  name="joined_at"
                  required
                  className="form03__input"
                  disabled={isPending}
                  aria-label="Ngày tham gia"
                />
              </label>
              <label className="form03__control">
                <span className="form03__text">Ảnh đại diện</span>
                <span className="form03__upfile">Chọn ảnh</span>
                <input
                  type="file"
                  name="avatar"
                  className="form03__file"
                  onChange={(e) => handleFile(e)}
                  accept="image/*"
                  disabled={isPending}
                />
                <div className="form03__preview">
                  {avatar && (
                    <ImgAvatar
                      src={avatar.preview}
                      alt={name}
                      classprop="rounded object-fit-cover w-100"
                    />
                  )}
                </div>
              </label>
              {/* <div className="">
                <label>Sinh nhật</label>
                <input
                  type="date"
                  name="dob"
                  required
                  className="input"
                  disabled={isPending}
                />
              </div>
              <div className="">
                <label>Sdt</label>
                <input
                  name="phone"
                  required
                  className="input"
                  disabled={isPending}
                />
              </div>
              <div className="">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="input"
                  disabled={isPending}
                />
              </div>
              <div className="">
                <label>Địa chỉ</label>
                <input
                  name="address"
                  required
                  className="input"
                  disabled={isPending}
                />
              </div>
              <div className="">
                <label>Trình độ</label>
                <input
                  name="level"
                  required
                  className="input"
                  disabled={isPending}
                />
              </div> */}
            </div>

            <div className="modal__footer">
              <button
                disabled={isPending}
                type="button"
                className="button01 button01--cancel"
                onClick={handleClose}
              >
                Hủy
              </button>
              <button disabled={isPending} type="submit" className="button01">
                {isPending ? "Thêm..." : "Thêm"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
