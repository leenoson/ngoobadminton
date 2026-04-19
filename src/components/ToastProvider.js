"use client"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function ToastProvider() {
  const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
  console.log(theme)
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme={theme ? "dark" : "light"}
    />
  )
}
