"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import Link from "next/link"

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

  // ✅ Load remembered email
  useEffect(() => {
    const savedEmail = localStorage.getItem("remember_email")
    if (savedEmail) {
      setValue("email", savedEmail)
      setValue("remember", true)
    }
  }, [setValue])

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
    <div className="flex min-h-[840px] flex-col bg-gray-900 scheme-dark">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-signin"
        noValidate
      >
        <h1 className="h3 mb-3">Admin login</h1>

        <input
          type="email"
          placeholder="Email address"
          className={`block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 ${errors.email ? "is-invalid" : ""}`}
          {...register("email", {
            onChange: () => clearErrors(["email", "password"]),
          })}
        />
        {errors.email && (
          <div className="text-danger mb-2">{errors.email.message}</div>
        )}

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className={`block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 ${
            errors.password ? "is-invalid" : ""
          }`}
          {...register("password", {
            onChange: () => clearErrors(["email", "password"]),
          })}
        />

        <span
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
          }}
        >
          {showPassword ? "🙈" : "👁️"}
        </span>

        {errors.password && (
          <div className="text-danger mb-2">{errors.password.message}</div>
        )}

        <div className="form-check mb-2">
          <input
            type="checkbox"
            className="form-check-input"
            id="remember"
            {...register("remember")}
          />
          <label className="form-check-label" htmlFor="remember">
            Remember me
          </label>
        </div>

        {serverError && <div className="text-danger mb-2">{serverError}</div>}

        <button
          className={clsx(
            "flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500",
            {
              ["bg-primary-6"]: loading,
            },
          )}
          type="submit"
          disabled={loading}
        >
          {loading ? "Đang vào..." : "Vào luôn"}
        </button>
        <Link href="/">Trang chủ</Link>
      </form>
    </div>
  )
}
