"use client"
import { useRouter } from "next/navigation"

export default function BackButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.push("/admin/members")}
      className="btn btn-secondary"
    >
      ← Danh sách thành viên
    </button>
  )
}
