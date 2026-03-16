import Link from "next/link";

export const metadata = {
  title: "Admin",
  description: "Danh sách thành viên và điểm danh của CLB cầu lông NGOO Badminton",
  robots: {
    index: false,
    follow: false
  }
}

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

        </div>
      </div>

      <div className="p-4 w-100">
        {children}
      </div>

    </div>
  );
}