"use client"

import { useState, useTransition } from "react"
import { useForm, useWatch } from "react-hook-form"
import { toast } from "react-toastify"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { compressImage } from "@/lib/image/compressImage"
import { addMember } from "@/app/actions/memberActions"
import ImgAvatar from "@/components/ImgAvatar"
import useModal from "@/hooks/useModal"

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Tên không được bỏ trống")
    .min(2, "Tên phải có ít nhất 2 ký tự"),

  nickname: z.string().trim().optional().or(z.literal("")),

  level: z.string().trim().optional().or(z.literal("")),

  joined_at: z.string().min(1, "Chọn ngày tham gia"),

  // email: z.string().trim().email("Email không hợp lệ"),
  // phone: z.string().trim().regex(/^\d+$/, "Chỉ được nhập số"),
})

export default function AddMemberModal({ isOpen, onClose }) {
  const getToday = () => {
    const today = new Date()
    return today.toISOString().split("T")[0]
  }

  const [avatar, setAvatar] = useState(null)

  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      nickname: "",
      level: "",
      joined_at: getToday(),
    },
  })

  const name = useWatch({
    control,
    name: "name",
  })

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

  const onSubmit = async (data) => {
    const formData = new FormData()

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })

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
    reset()
    if (avatar?.preview) URL.revokeObjectURL(avatar.preview)
    setAvatar(null)
    onClose()
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
      // onClick={() => {
      //   if (!isPending) handleClose()
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
          <form className="form03" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="modal__header">
              <p className="modal__title">Thêm thành viên</p>
            </div>

            <div className="modal__body">
              <div className="form03__group">
                <label className="form03__control">
                  <span className="form03__text">Họ & tên</span>
                  <input
                    className="form03__input"
                    {...register("name")}
                    disabled={isPending}
                    placeholder="Nguyễn Văn Cẩm"
                  />
                  {errors.name && (
                    <span className="form__error">{errors.name.message}</span>
                  )}
                </label>
                <label className="form03__control">
                  <span className="form03__text">Nickname</span>
                  <input
                    className="form03__input"
                    disabled={isPending}
                    placeholder="Cẩm Hót"
                    aria-label="Nickname"
                    {...register("nickname")}
                  />
                </label>
              </div>
              <div className="form03__group">
                <label className="form03__control">
                  <span className="form03__text">
                    Trình/số năm chơi cầu lông
                  </span>
                  <input
                    className="form03__input"
                    disabled={isPending}
                    placeholder="1000 năm/chuyên gia phá lưới"
                    aria-label="Trình"
                    {...register("level")}
                  />
                </label>
                <label className="form03__control">
                  <span className="form03__text">Ngày tham gia</span>
                  <input
                    type="date"
                    // name="joined_at"
                    // required
                    className="form03__input"
                    disabled={isPending}
                    aria-label="Ngày tham gia"
                    {...register("joined_at")}
                  />
                  {errors.joined_at && (
                    <span className="form__error">
                      {errors.joined_at.message}
                    </span>
                  )}
                </label>
              </div>
              <label className="form03__control">
                <span className="form03__text">Ảnh đại diện</span>
                <span className="form03__upfile">Chọn ảnh</span>
                <input
                  type="file"
                  className="form03__file"
                  onChange={handleFile}
                  accept="image/*"
                  disabled={isPending}
                  aria-label="Ảnh đại diện"
                />
                {avatar && (
                  <div className="form03__preview">
                    <ImgAvatar src={avatar.preview} alt={name} />
                  </div>
                )}
              </label>
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
