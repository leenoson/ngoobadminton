import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <div className="d-flex">

      <div
        style={{
          width: "240px",
          height: "100vh",
          background: "#001f3f",
          color: "white",
          padding: "20px",
        }}
      >
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
          <Link href="/logout">
            Logout
          </Link>
        </div>
      </div>

      <div className="flex-grow-1 p-4">
        {children}
      </div>

    </div>
  );
}