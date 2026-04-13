"use client"

import { useProgressRouter } from "@/lib/progressRouter"
// import { useRouter } from "next/navigation"

export default function BackButton({ href, title }) {
  // const router = useRouter()
  const router = useProgressRouter()

  return (
    <button onClick={() => router.push(href)} className="button02">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
        />
      </svg>
      {title}
    </button>
  )
}
