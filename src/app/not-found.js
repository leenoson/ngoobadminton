import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">Trang bạn tìm không tồn tại.</p>

      <Link href="/">
				Home page
			</Link>
    </div>
  )
}