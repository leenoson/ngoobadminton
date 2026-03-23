import Link from "next/link"

export default function NotFound() {
  return (
    <section className="">
      <h1 className="">404</h1>
      <p className="">Trang bạn tìm không tồn tại.</p>

      <Link href="/" className="">
        Home page
      </Link>
    </section>
  )
}
