"use client"

import { useState, useRef, useTransition, useEffect } from "react"
import { Controller, useForm, useWatch } from "react-hook-form"
import { toast } from "react-toastify"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateMember } from "@/app/actions/memberActions"
import ImgAvatar from "@/components/ImgAvatar"
import { compressImage } from "@/lib/image/compressImage"
import useModal from "@/hooks/useModal"
import { memberSchema } from "@/schemas/member.schema"
import { formatDateToDB, parseDate } from "@/lib/date"
import ButtonRipple from "@/components/ButtonRipple"
import { LineSpinner } from "ldrs/react"
import DatePicker from "react-datepicker"
import { getYear, getMonth } from "date-fns"

export default function EditMemberModal({ member, onClose }) {
  const avatarDefault = member?.avatar || "/images/noimg.png"

  const inputFile = useRef(null)
  const [isPending, startTransition] = useTransition()
  const [avatar, setAvatar] = useState(null)

  const years = Array.from({ length: 30 }, (_, i) => 2000 + i)
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
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
    },
  })

  const name = useWatch({
    control,
    name: "name",
  })

  const preview = avatar?.preview || avatarDefault

  useEffect(() => {
    return () => {
      if (avatar?.preview) URL.revokeObjectURL(avatar.preview)
    }
  }, [avatar])

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

    setAvatar((prev) => {
      if (prev?.preview) URL.revokeObjectURL(prev.preview)
      return {
        file: compressed,
        preview: URL.createObjectURL(file),
      }
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

  useEffect(() => {
    if (!member) return

    reset({
      name: member.name || "",
      nickname: member.nickname || "",
      level: member.level || "",
      joined_at: parseDate(member.joined_at),
    })
  }, [member, reset])

  useModal({
    isOpen: !!member,
    onClose,
    isPending,
  })

  if (!member) return null

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
              <p className="modal__title">Cập nhật thông tin</p>
            </div>
            <div className="modal__body">
              <div className="form03__group">
                <label className="form03__control">
                  <span className="form03__text">Họ & tên(*)</span>
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
                    disabled={isPending}
                    className="form03__input"
                    aria-label="Ngày tham gia"
                  /> */}
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

              {avatar && (
                <ButtonRipple
                  disabled={isPending || !avatar}
                  type="button"
                  className="button01 mt-(--spac)"
                  onClick={handleResetAvatar}
                  noRipple
                >
                  Xóa avatar mới
                </ButtonRipple>
              )}
            </div>

            <div className="modal__footer">
              <ButtonRipple
                disabled={isPending}
                type="button"
                className="button01 button01--cancel"
                onClick={handleClose}
                noRipple
              >
                Hủy
              </ButtonRipple>

              <ButtonRipple
                disabled={isPending}
                type="submit"
                className="button01"
              >
                {isPending && (
                  <LineSpinner size="24" stroke="1" speed="1" color="#fff" />
                )}{" "}
                Lưu
              </ButtonRipple>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
