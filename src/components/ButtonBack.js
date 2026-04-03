"use client"

import { useProgressRouter } from "@/lib/progressRouter"
// import { useRouter } from "next/navigation"

export default function BackButton({ href, title }) {
  // const router = useRouter()
  const router = useProgressRouter()

  return (
    <button onClick={() => router.push(href)} className="btn btn-secondary">
      {title}
    </button>
  )
}
