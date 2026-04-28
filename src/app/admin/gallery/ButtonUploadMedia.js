"use client"

import { useState, useTransition } from "react"
import { uploadMedia } from "@/app/actions/mediaActions"
import { toast } from "react-toastify"

export default function UploadMedia() {
  const [files, setFiles] = useState([])
  const [isPending, startTransition] = useTransition()

  const handleFile = (e) => {
    setFiles(Array.from(e.target.files))
  }

  const handleUpload = () => {
    const formData = new FormData()

    files.forEach((file) => {
      formData.append("files", file)
    })

    startTransition(async () => {
      await toast.promise(uploadMedia(formData), {
        pending: "Đang upload...",
        success: "Upload thành công 🚀",
        error: "Upload thất bại ❌",
      })
    })
  }

  return (
    <div>
      <input type="file" multiple onChange={handleFile} />
      <button onClick={handleUpload} disabled={isPending}>
        Upload
      </button>
    </div>
  )
}
