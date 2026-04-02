// import Navbar from "@/components/Navbar"
import ScrollToTop from "@/components/ScrollToTop"
// import Link from "next/link"

export default function MainLayout({ children, header, footer }) {
  return (
    <>
      {header}
      <main className="mainhome">
        <div className="bg-global-01" />
        <div className="bg-global-02" />
        {children}
      </main>
      {footer}
      <ScrollToTop />
    </>
  )
}
