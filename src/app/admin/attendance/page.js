import AddMemberButton from "../members/components/AddMemberButton"
import AutoScrollTop from "@/components/AutoScrollTop"
import TopMemberAttendance from "./TopMemberAttendance"
import AttendanceClient from "./AttendanceClient"

export const metadata = {
  title: "Admin quản lý điểm danh",
}

export default function AttendancePage() {
  return (
    <section>
      <AutoScrollTop />

      <h1 className="title04">Điểm danh</h1>

      <TopMemberAttendance />

      <AddMemberButton />

      <AttendanceClient />
    </section>
  )
}
