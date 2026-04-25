"use client"

import { useEffect, useState, useTransition } from "react"
import { Controller, useForm, useWatch } from "react-hook-form"
import { toast } from "react-toastify"
import { zodResolver } from "@hookform/resolvers/zod"
import { compressImage } from "@/lib/image/compressImage"
import { addMember } from "@/app/actions/memberActions"
import ImgAvatar from "@/components/ImgAvatar"
import useModal from "@/hooks/useModal"
import { memberSchema } from "@/schemas/member.schema"
import { formatDateToDB, getToday } from "@/lib/date"
import { LineSpinner } from "ldrs/react"
import DatePicker from "react-datepicker"
import { getYear, getMonth } from "date-fns"

export default function AddMemberModal({ isOpen, onClose }) {
  const [avatar, setAvatar] = useState(null)

  const [isPending, startTransition] = useTransition()

  const years = Array.from({ length: 30 }, (_, i) => 2000 + i)
  const months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ]

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      name: "",
      nickname: "",
      level: "",
      joined_at: new Date(),
      // joined_at: getToday(),
    },
  })

  const name = useWatch({
    control,
    name: "name",
  })

  useEffect(() => {
    return () => {
      if (avatar?.preview) URL.revokeObjectURL(avatar.preview)
    }
  }, [avatar])

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const compressed = await compressImage(file)

    if (avatar?.preview) {
      URL.revokeObjectURL(avatar.preview)
    }

    setAvatar({
      file: compressed,
      preview: URL.createObjectURL(compressed),
    })
  }

  const appendFormData = (formData, data) => {
    Object.entries(data).forEach(([key, value]) => {
      if (value === undefined || value === null) return

      if (value instanceof Date) {
        formData.set(key, formatDateToDB(value))
      } else {
        formData.set(key, value)
      }
    })
  }

  const onSubmit = async (data) => {
    const formData = new FormData()

    appendFormData(formData, data)

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
    reset({
      name: "",
      nickname: "",
      level: "",
      joined_at: new Date(),
    })
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
          <form className="form03" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="modal__header">
              <p className="modal__title">Thêm thành viên</p>
            </div>

            <div className="modal__body">
              <div className="form03__group">
                <label className="form03__control">
                  <span className="form03__text">Họ & tên(*)</span>
                  <input
                    {...register("name")}
                    className="form03__input"
                    disabled={isPending}
                    placeholder="Nguyễn Văn Cẩm"
                    aria-label="Tên"
                    autoFocus
                  />
                  {errors.name && (
                    <span className="form__error">{errors.name.message}</span>
                  )}
                </label>
                <label className="form03__control">
                  <span className="form03__text">Nickname</span>
                  <input
                    {...register("nickname")}
                    className="form03__input"
                    disabled={isPending}
                    placeholder="Cẩm Hót"
                    aria-label="Nickname"
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
                    className="form03__input"
                    disabled={isPending}
                    placeholder="1000 năm/chuyên gia phá lưới"
                    aria-label="Trình"
                  />
                </label>
                <label className="form03__control">
                  <span className="form03__text">Ngày tham gia</span>
                  <Controller
                    control={control}
                    name="joined_at"
                    render={({ field }) => (
                      <DatePicker
                        selected={field.value}
                        onChange={field.onChange}
                        dateFormat="dd/MM/yyyy"
                        className="form03__input"
                        // calendarClassName="custom-class"
                        renderCustomHeader={({
                          date,
                          changeYear,
                          changeMonth,
                          decreaseMonth,
                          increaseMonth,
                          prevMonthButtonDisabled,
                          nextMonthButtonDisabled,
                        }) => (
                          <div className="flex items-center justify-between px-2 py-2">
                            {/* Prev */}
                            <button
                              onClick={decreaseMonth}
                              disabled={prevMonthButtonDisabled}
                              className="px-2 py-1 rounded hover:bg-gray-200"
                            >
                              ◀
                            </button>

                            {/* Year */}
                            <select
                              value={getYear(date)}
                              onChange={(e) => changeYear(+e.target.value)}
                            >
                              {years.map((y) => (
                                <option key={y} value={y}>
                                  {y}
                                </option>
                              ))}
                            </select>

                            {/* Month */}
                            <select
                              value={getMonth(date)}
                              onChange={(e) => changeMonth(+e.target.value)}
                            >
                              {months.map((m, i) => (
                                <option key={i} value={i}>
                                  {m}
                                </option>
                              ))}
                            </select>
                            {/* Next */}
                            <button
                              onClick={increaseMonth}
                              disabled={nextMonthButtonDisabled}
                              className="px-2 py-1 rounded hover:bg-gray-200"
                            >
                              ▶
                            </button>
                          </div>
                        )}
                      />
                    )}
                  />

                  {/* <input
                    {...register("joined_at")}
                    type="date"
                    className="form03__input"
                    disabled={isPending}
                    aria-label="Ngày tham gia"
                  /> */}
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
                {isPending && (
                  <LineSpinner size="24" stroke="1" speed="1" color="#fff" />
                )}{" "}
                Thêm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
