"use client"

import { useState, useRef, useTransition } from "react"
import { useForm, useWatch } from "react-hook-form"
import { toast } from "react-toastify"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateMember } from "@/app/actions/memberActions"
import ImgAvatar from "@/components/ImgAvatar"
import { compressImage } from "@/lib/image/compressImage"
import useModal from "@/hooks/useModal"
import { memberSchema } from "@/schemas/member.schema"
import { getToday, formatDate } from "@/lib/date"

export default function EditMemberModal({ member, onClose }) {
  const avatarDefault = member?.avatar || "/images/noimg.png"

  const inputFile = useRef(null)
  const [isPending, startTransition] = useTransition()
  const [avatar, setAvatar] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      name: member?.name || "",
      nickname: member?.nickname || "",
      level: member?.level || "",
      joined_at: formatDate(member?.joined_at) || getToday(),
    },
  })

  const name = useWatch({
    control,
    name: "name",
  })

  const preview = avatar?.preview || avatarDefault

  const handleResetAvatar = () => {
    setAvatar(null)

    if (inputFile.current) {
      inputFile.current.value = null
    }
  }

  const handleFile = async (e) => {
    const file = e.target.files[0]

    if (!file) return

    const compressed = await compressImage(file)

    setAvatar({
      file: compressed,
      preview: URL.createObjectURL(file),
    })
  }

  const appendFormData = (formData, data) => {
    Object.entries(data).forEach(([key, value]) => {
      if (value === undefined || value === null) return
      formData.set(key, value)
    })
  }

  const onSubmit = async (data) => {
    const formData = new FormData()

    formData.set("id", member.id)

    appendFormData(formData, data)

    if (avatar?.file) {
      formData.set("avatar", avatar.file)
    }

    startTransition(async () => {
      await toast.promise(updateMember(formData), {
        pending: "Đang cập nhật thông tin...",
        success: "Một đứa NGOO bị đổi thông tin!",
        error: "Cập nhật thất bại ❌",
      })

      handleClose()
    })
  }

  const handleClose = () => {
    reset()
    setAvatar(null)
    onClose()
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
          <form className="form03" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="modal__header">
              <p className="modal__title">Cập nhật thông tin</p>
            </div>
            <div className="modal__body">
              <div className="form03__group">
                <label className="form03__control">
                  <span className="form03__text">Họ & tên</span>
                  <input
                    {...register("name")}
                    disabled={isPending}
                    className="form03__input"
                    autoFocus
                    aria-label="Tên"
                  />
                  {errors.name && (
                    <span className="form__error">{errors.name.message}</span>
                  )}
                </label>
                <label className="form03__control">
                  <span className="form03__text">Nickname</span>
                  <input
                    {...register("nickname")}
                    disabled={isPending}
                    className="form03__input"
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
                    {...register("level")}
                    disabled={isPending}
                    className="form03__input"
                    aria-label="Trình"
                    placeholder="1000 năm/chuyên gia phá lưới"
                  />
                </label>
                <label className="form03__control">
                  <span className="form03__text">Ngày tham gia</span>
                  <input
                    {...register("joined_at")}
                    type="date"
                    disabled={isPending}
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
                  ref={inputFile}
                  accept="image/*"
                  onChange={handleFile}
                  disabled={isPending}
                  className="form03__file"
                  aria-label="Ảnh đại diện"
                />
                <div className="form03__preview">
                  {preview && <ImgAvatar src={preview} alt={name} />}
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
