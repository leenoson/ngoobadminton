"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { deleteMedia } from "@/app/actions/mediaActions"
import Image from "next/image"

export default function MediaItem({ item }) {
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  const handleDelete = () => {
    const ok = confirm("Xóa file này?")
    if (!ok) return

    startTransition(async () => {
      try {
        await deleteMedia([item.id])
        router.refresh()
      } catch (err) {
        console.error(err)
        alert("Xóa thất bại")
      }
    })
  }

  return (
    <div className="relative w-[200px]">
      {/* preview */}
      {item.type === "image" ? (
        <Image
          src={item.url}
          width={200}
          height={200}
          alt={item.caption || ""}
        />
      ) : (
        <video src={item.url} controls className="w-[200px]" />
      )}

      {/* nút delete */}
      <button
        onClick={handleDelete}
        disabled={pending}
        className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 text-xs"
      >
        {pending ? "..." : "X"}
      </button>
    </div>
  )
}
