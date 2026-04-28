"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { uploadMedia } from "@/app/actions/mediaActions"

export default function UploadZone() {
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const router = useRouter()

  const handleFiles = async (files) => {
    if (!files.length) return

    if (files.length > 10) {
      alert("Chỉ được upload tối đa 10 file mỗi lần")
      return
    }

    const formData = new FormData()

    for (let file of files) {
      formData.append("files", file)
    }

    setUploading(true)

    try {
      await uploadMedia(formData)
      router.refresh()
    } catch (err) {
      console.error("UPLOAD FAIL:", err)
    }

    setUploading(false)
  }

  return (
    <div
      onClick={() => inputRef.current.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault()

        const files = e.dataTransfer.files

        if (files.length > 10) {
          alert("Tối đa 10 file")
          return
        }

        handleFiles(e.dataTransfer.files)
      }}
      className="uploadfile mb-(--spac-md)"
    >
      <input
        type="file"
        multiple
        hidden
        ref={inputRef}
        onChange={(e) => handleFiles(e.target.files)}
      />

      {uploading ? "Uploading..." : "Drag & drop hoặc click"}
    </div>
  )
}
