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

  const [uploads, setUploads] = useState([])
  const [stats, setStats] = useState({
    total: 0,
    success: 0,
    failed: 0,
  })

  const modalWarning = () =>
    openModal({
      content: (
        <p className="p-(--spac) text-center">Chỉ được tối đa 10 file</p>
      ),
      className: "modal--small",
    })

  const updateUpload = (id, data) => {
    setUploads((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...data } : item)),
    )
  }

  const uploadSingleFile = (file) => {
    const id = crypto.randomUUID()

    setUploads((prev) => [
      ...prev,
      {
        id,
        name: file.name,
        progress: 0,
        status: "uploading",
        errorMessage: "",
      },
    ])

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

      xhr.setRequestHeader(
        "Authorization",
        `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      )
      xhr.setRequestHeader("apikey", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
      xhr.setRequestHeader("Content-Type", file.type)

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100)

          updateUpload(id, { progress: percent })
        }
      }

      xhr.onload = async () => {
        if (xhr.status === 200) {
          try {
            await fetch("/api/media", {
              method: "POST",
              body: JSON.stringify([
                {
                  name: file.name,
                  url: data.publicUrl,
                  type: file.type.startsWith("video") ? "video" : "image",
                  caption: "",
                },
              ]),
            })

            updateUpload(id, { status: "done", progress: 100 })

            setStats((prev) => ({
              ...prev,
              success: prev.success + 1,
            }))

            setTimeout(() => {
              setUploads((prev) => prev.filter((item) => item.id !== id))
            }, 1000)

            resolve()
          } catch (err) {
            updateUpload(id, {
              status: "error",
              errorMessage: "Lỗi khi lưu DB",
            })
            setStats((prev) => ({
              ...prev,
              failed: prev.failed + 1,
            }))
            reject(err)
          }
        } else {
          updateUpload(id, { status: "error", errorMessage: "Upload thất bại" })
          setStats((prev) => ({
            ...prev,
            failed: prev.failed + 1,
          }))
          reject(xhr.response)
        }
      }

      xhr.onerror = () => {
        updateUpload(id, { status: "error", errorMessage: "Lỗi mạng" })
        setStats((prev) => ({
          ...prev,
          failed: prev.failed + 1,
        }))
        reject()
      }

      xhr.send(file)
    })
  }

  const handleFiles = async (files) => {
    if (!files.length) return

    if (files.length > 10) {
      modalWarning()
      return
    }

    const fileArray = Array.from(files)

    setStats({
      total: fileArray.length,
      success: 0,
      failed: 0,
    })

    const toastId = toast.loading(`Đang upload ${fileArray.length} file...`)

    try {
      const results = await Promise.allSettled(fileArray.map(uploadSingleFile))

      const successCount = results.filter(
        (r) => r.status === "fulfilled",
      ).length

      const failCount = results.length - successCount

      toast.update(toastId, {
        render:
          failCount === 0
            ? `Upload thành công ${successCount} file`
            : `${successCount} thành công - ${failCount} thất bại`,
        type: failCount === 0 ? "success" : "warning",
        isLoading: false,
        autoClose: 3000,
      })

      router.refresh()
    } catch (err) {
      toast.update(toastId, {
        render: "❌ Upload thất bại",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      })
    }
  }

  const hasError = uploads.some((i) => i.status === "error")
  const isAllFinished = uploads.every(
    (i) => i.status === "done" || i.status === "error",
  )

  return (
    <div>
      {uploads.length === 0 && (
        <div
          onClick={() => inputRef.current.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault()
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
          Drag & drop hoặc click
        </div>
      )}

      {uploads.length > 0 && (
        <>
          <h2 className="title05">Danh sách các file đang upload</h2>
          <div className="upload-status">
            <p className="upload__total">Tổng file upload: {stats.total}</p>
            <p className="upload__success">Thành công: {stats.success}</p>
            <p className="upload__fail">Thất bại: {stats.failed}</p>
          </div>
          {isAllFinished && hasError && (
            <div className="upload-actions">
              <button className="button01" onClick={() => setUploads([])}>
                Thử lại
              </button>
            </div>
          )}
          <ul className="upload-list">
            {uploads.map((item) => (
              <li key={item.id} className="upload-item">
                {item.status === "error" && (
                  <p className="upload-item__error">{item.errorMessage}</p>
                )}
                <div className="upload-item__info">
                  <span className="upload-item__name">{item.name}</span>
                  <span className="upload-item__percent">
                    {item.status !== "error" ? `${item.progress}%` : "❌"}
                  </span>
                </div>

                <div className="upload-barwrap">
                  <div className="upload-bar">
                    <div
                      className={`upload-bar__inner
                        ${item.status === "done" ? "is-done" : ""}
                        ${item.status === "error" ? "is-error" : ""}
                      `}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
