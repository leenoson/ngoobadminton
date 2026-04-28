"use client"

import { ToastContainer, Slide } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function ToastProvider() {
  const theme = localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : "light"
  // const [theme, setTheme] = useState(() => {
  //   if (typeof window === "undefined") return "light"

  //   const stored = localStorage.getItem("theme")
  //   if (stored === "dark" || stored === "light") return stored

  //   return window.matchMedia("(prefers-color-scheme: dark)").matches
  //     ? "dark"
  //     : "light"
  // })

  // useEffect(() => {
  //   const media = window.matchMedia("(prefers-color-scheme: dark)")

  //   const handler = (e) => {
  //     const stored = localStorage.getItem("theme")
  //     if (!stored) {
  //       setTheme(e.matches ? "dark" : "light")
  //     }
  //   }

  //   media.addEventListener("change", handler)
  //   return () => media.removeEventListener("change", handler)
  // }, [])

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={1500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
      transition={Slide}
      theme={theme}
    />
  )
}
