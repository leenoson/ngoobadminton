"use client"

import { useEffect } from "react"

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="">
      <h2>Đã có lỗi xảy ra!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Thử lại</button>
    </div>
  )
}
