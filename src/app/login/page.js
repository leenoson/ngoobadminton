"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Controller } from "react-hook-form"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import clsx from "clsx"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClient } from "@/lib/supabase/client"

const schema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Vui lòng nhập email" })
    .email({ message: "Email không hợp lệ" }),
  password: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu tối thiểu 6 ký tự"),
  remember: z.boolean().optional(),
})

export default function LoginPage() {
  const supabase = createClient()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      remember: false,
    },
  })

  useEffect(() => {
    const savedEmail = localStorage.getItem("remember_email")

    if (savedEmail) {
      setValue("email", savedEmail)
      setValue("remember", true)

      requestAnimationFrame(() => {
        setFocus("password")
      })
    } else {
      requestAnimationFrame(() => {
        setFocus("email")
      })
    }
  }, [setValue, setFocus])

  const onSubmit = async (data) => {
    setLoading(true)
    setServerError("")

    if (data.remember) {
      localStorage.setItem("remember_email", data.email)
    } else {
      localStorage.removeItem("remember_email")
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) {
      setError("password", {
        type: "server",
        message: "Email hoặc mật khẩu không đúng",
      })
      setFocus("email")
      setLoading(false)
      return
    }

    router.refresh()
    router.replace("/admin")
  }

  return (
    <section className="login">
      <form onSubmit={handleSubmit(onSubmit)} className="form" noValidate>
        <h2 className="form__title">Admin login</h2>

        <div className="form__control">
          <div className="form__input">
            <div className="form__wrap">
              <label
                className="form__label"
                htmlFor="email"
                aria-label="email"
              />
              <input
                id="email"
                disabled={loading}
                type="email"
                autoComplete="email"
                placeholder="Nhập email admin..."
                className={`${errors.email ? "is-invalid" : ""}`}
                {...register("email", {
                  onChange: () => clearErrors(["email", "password"]),
                })}
                aria-describedby="error-email"
              />
              {errors.email && (
                <span id="error-email" className="form__error">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          <div className="form__input">
            <div className="form__wrap">
              <label
                className="form__label"
                htmlFor="password"
                aria-label="password"
              />
              <input
                id="password"
                disabled={loading}
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu..."
                className={`${errors.password ? "is-invalid" : ""}`}
                {...register("password", {
                  onChange: () => clearErrors(["email", "password"]),
                })}
                aria-describedby="error-password"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className={clsx(`form__eye`, {
                  "is-text": showPassword,
                })}
                aria-label="Biểu tượng ẩn hiện mật khẩu"
              ></span>
            </div>

            {errors.password && (
              <span id="error-password" className="form__error">
                {errors.password.message}
              </span>
            )}
          </div>
        </div>

        <div className="form__checkbox">
          <input
            disabled={loading}
            type="checkbox"
            className="form-check-input"
            id="remember"
            {...register("remember")}
          />

          <span className="form__checkbox--icon"></span>

          <label className="form__label" htmlFor="remember">
            Ghi nhớ email
          </label>
        </div>

        {serverError && <span className="form__error">{serverError}</span>}

        <button
          className={clsx("form__button", {
            "": loading,
          })}
          type="submit"
          disabled={loading}
        >
          <span className="form__button--text">
            {loading ? "Đang vào..." : "Vào luôn"}
          </span>
        </button>
        <Link href="/" data-no-progress className="link">
          <Image
            src="/images/common/home.svg"
            width={100}
            height={100}
            alt=""
            aria-label="Về trang chủ"
          />
          Trang chủ
        </Link>
      </form>
    </section>
  )
}
