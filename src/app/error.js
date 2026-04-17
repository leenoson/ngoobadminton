"use client"

import ButtonRipple from "@/components/ButtonRipple"
import { useEffect } from "react"

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section className="page-error">
      <div className="container">
        <h2 className="title01">Đã có lỗi xảy ra!</h2>
        <p className="text-red-500 text-center">{error.message}</p>
        <ButtonRipple className="button01" onClick={() => reset()}>
          Thử lại
        </ButtonRipple>
      </div>
    </section>
  )
}
