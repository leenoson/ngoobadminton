import Link from "next/link"

export default function NotFound() {
  return (
    <section className="text-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">Trang bạn tìm không tồn tại.</p>

      <Link href="/" className="btn btn-dark">
        Home page
      </Link>
    </section>
  )
}
