"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useModal } from "@/components/ModalProvider"
import { toast } from "react-toastify"

export default function UploadZone() {
  const supabase = createClient()
  const inputRef = useRef(null)
  const router = useRouter()
  const { openModal } = useModal()

  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const modalWarning = () =>
    openModal({
      content: <p className="p-(--spac)">Chỉ được tối đa 10 file</p>,
      className: "modal--small",
    })

  // 🔥 upload 1 file (có progress)
  const uploadSingleFile = (file, index, total) => {
    return new Promise((resolve, reject) => {
      const ext = file.name.split(".").pop()
      const fileName = `${crypto.randomUUID()}.${ext}`
      const path = fileName

      const { data } = supabase.storage.from("media").getPublicUrl(path)

      const xhr = new XMLHttpRequest()

      xhr.open(
        "POST",
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/media/${path}`,
      )

      // ✅ headers chuẩn
      xhr.setRequestHeader(
        "Authorization",
        `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      )
      xhr.setRequestHeader("apikey", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
      xhr.setRequestHeader("Content-Type", file.type)

      // ✅ progress realtime
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percentFile = e.loaded / e.total
          const totalPercent = ((index + percentFile) / total) * 100

          setProgress(Math.round(totalPercent))
        }
      }

      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve({
            name: file.name,
            url: data.publicUrl,
            type: file.type.startsWith("video") ? "video" : "image",
            caption: "",
          })
        } else {
          reject(xhr.response)
        }
      }

      xhr.onerror = reject

      // ❗ quan trọng: gửi raw file
      xhr.send(file)
    })
  }

  // 🔥 upload nhiều file
  const uploadFiles = async (files) => {
    const uploads = []

    for (let i = 0; i < files.length; i++) {
      const result = await uploadSingleFile(files[i], i, files.length)
      uploads.push(result)
    }

    // insert DB
    await fetch("/api/media", {
      method: "POST",
      body: JSON.stringify(uploads),
    })
  }

  const handleFiles = async (files) => {
    if (!files.length) return

    if (files.length > 10) {
      modalWarning()
      return
    }

    setUploading(true)
    setProgress(0)

    try {
      await toast.promise(uploadFiles(files), {
        pending: "Đang upload file...",
        success: "Upload thành công",
        error: "Upload thất bại ❌",
      })
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
        handleFiles(e.dataTransfer.files)
      }}
      className="uploadfile"
    >
      <input
        type="file"
        multiple
        hidden
        ref={inputRef}
        onChange={(e) => handleFiles(e.target.files)}
      />

      {!uploading && "Drag & drop hoặc click"}

      {uploading && (
        <div className="w-full">
          <p className="text-sm mb-2">Uploading... {progress}%</p>

          <div className="w-full h-2 bg-gray-200 rounded">
            <div
              className="h-2 bg-green-500 rounded transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
