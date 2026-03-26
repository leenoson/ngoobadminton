import Link from "next/link"
import Navbar from "./components/NavbarAdmin"

export const metadata = {
  title: "Admin",
}

export default function AdminLayout({ children }) {
  return (
    <>
      <header className="header">
        <ul className="admin-menu">
          <li>
            <Link href="/" data-no-progress>
              Logo NGOO
            </Link>
          </li>
        </ul>
      </header>

      <main className="admin-main">
        <Navbar />
        <section className="admin-content">{children}</section>
      </main>

      <footer>Footer B</footer>
    </>
  )
}
