import Link from "next/link";
import "./admin.scss"

export const metadata = {
  title: "Admin"
}

export default function AdminLayout({ children }) {
  return (
    <>
      <div className="d-md-flex min-vh-100">
        <div className="admin-navbar p-4">
          <Link href="/admin">
            <h4>Admin</h4>
          </Link>

          <div className="d-flex flex-column gap-3 mt-4">
            <Link href="/admin/members">
              Members
            </Link>
            <Link href="/admin/attendance">
              Điểm danh
            </Link>

          </div>
        </div>

        <div className="admin-content p-4">
          {children}
        </div>

      </div>
    </>
  );
}