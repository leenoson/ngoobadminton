"use client"

import { useState, useEffect, useMemo, useTransition } from "react"
import { createClient } from "@/lib/supabase/client"
import ImgAvatar from "@/components/ImgAvatar"
import useDebounce from "@/hooks/useDebounce"
import clsx from "clsx"
import "./attendance.scss"

export default function AttendancePage() {

  const supabase = createClient()

  const [isPending, startTransition] = useTransition()

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  )

  const [members, setMembers] = useState([])
  const [checked, setChecked] = useState([])
  const [loadingMembers, setLoadingMembers] = useState(true)

  // search
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 400)

  function toggleMember(id) {
    setChecked(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    )
  }

  // chỉ check những member đang hiển thị
  function checkAll() {
    setChecked(prev => {
      const ids = filteredMembers.map(m => m.id)
      return Array.from(new Set([...prev, ...ids]))
    })
  }

  function uncheckAll() {
    setChecked(prev => {
      const ids = filteredMembers.map(m => m.id)
      return prev.filter(id => !ids.includes(id))
    })
  }

  async function saveAttendance() {

    startTransition(async () => {

      await supabase
        .from("attendance")
        .delete()
        .eq("attend_date", date)

      const rows = checked.map(id => ({
        member_id: id,
        attend_date: date
      }))

      if (rows.length) {
        await supabase
          .from("attendance")
          .insert(rows)
      }

      await fetchAttendance()

    })

  }

  async function fetchAttendance() {

    setLoadingMembers(true)

    const { data: membersData } = await supabase
      .from("members")
      .select("id,name,avatar,attendance(count)")
      .order("name")

    const { data: attendanceData } = await supabase
      .from("attendance")
      .select("member_id")
      .eq("attend_date", date)

    const checkedIds =
      attendanceData?.map(a => a.member_id) || []

    setMembers(membersData || [])
    setChecked(checkedIds)

    setLoadingMembers(false)

  }

  useEffect(() => {
    fetchAttendance()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])

  // filter members
  const filteredMembers = useMemo(() => {

    if (!debouncedSearch) return members

    const keyword = debouncedSearch.toLowerCase()

    return members.filter(m =>
      m.name.toLowerCase().includes(keyword)
    )

  }, [members, debouncedSearch])

  return (

    <div className="container py-2">

      <h2 className="mb-4">Attendance</h2>

      <div className="d-flex align-items-center gap-3 mb-2">

        <input
          type="date"
          className="form-control"
          style={{ width: "200px" }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
					disabled={isPending}
        />

        <input
          type="text"
          className="form-control"
          placeholder="Search member..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "250px" }}
					disabled={isPending}
        />

        {search && (
          <button
            className="btn btn-outline-secondary"
            onClick={() => setSearch("")}
						disabled={isPending}
          >
            Clear
          </button>
        )}

        <button
          className="btn btn-outline-primary"
          onClick={checkAll}
					disabled={isPending}
        >
          Check All
        </button>

        <button
          className="btn btn-outline-secondary"
          onClick={uncheckAll}
					disabled={isPending}
        >
          Uncheck All
        </button>

        <div className="ms-auto fw-bold">
          Có mặt: {checked.length} / {members.length}
        </div>

      </div>

      <div className="mb-3">
        <button
          className="btn btn-primary mt-3"
          onClick={saveAttendance}
          disabled={isPending}
        >
          {isPending
            ? `Đang lưu điểm danh ngày ${date}...`
            : `Lưu điểm danh ngày ${date}`}
        </button>
      </div>

      {loadingMembers && (
        <div className="text-muted p-3">
          Loading member list...
        </div>
      )}

      {!loadingMembers && (

        <div className="row row-cols-xxl-5 row-cols-xl-4 row-cols-md-3 row-cols-sm-2 row-cols-1">

          {filteredMembers.map(member => (

            <label
              key={member.id}
              className="col mb-4 cursor-pointer"
            >
               <input
                type="checkbox"
                checked={checked.includes(member.id)}
                onChange={() => toggleMember(member.id)}
                className="sr-only"
              />
              <div className={clsx("card h-100", {
                "border-primary": checked.includes(member.id)
              })}>
                <ImgAvatar
                  src={member.avatar}
                  alt={member.name}
                  classprop="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{member.name}</h5>
                  <p className="card-text">Số buổi tham gia: {member.attendance?.[0]?.count || 0}</p>
                </div>
              </div>
            </label>
          )
          )}

          {members.length > 0 && filteredMembers.length === 0 && (
            <div className="text-muted p-3">
              No members found
            </div>
          )}

        </div>

      )}

    </div>
  )

}