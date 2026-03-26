"use client"

import { useProgressRouter } from "@/lib/progressRouter"
// import { useRouter } from "next/navigation"

export default function BackButton() {
  // const router = useRouter()
  const router = useProgressRouter()

  return (
    <button
      onClick={() => router.push("/admin/members")}
      className="btn btn-secondary"
    >
      Danh sách NGOO dân
    </button>
  )
}
