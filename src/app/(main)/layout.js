import Navbar from "@/components/Navbar"

// app/(main)/layout.js
export default function MainLayout({ children }) {
  return (
    <>
      <header className="header">
        <Navbar />
      </header>

      <main>{children}</main>

      <footer>Footer A</footer>
    </>
  )
}
