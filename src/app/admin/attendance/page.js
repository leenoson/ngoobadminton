"use client"

import { useState, useEffect, useMemo, useTransition } from "react"
import { createClient } from "@/lib/supabase/client"
import ImgAvatar from "@/components/ImgAvatar"
import useDebounce from "@/hooks/useDebounce"
import clsx from "clsx"
import { formatDate } from "@/lib/formatDate"

export default function AttendancePage() {
  const supabase = createClient()

  const [isPending, startTransition] = useTransition()

  const [date, setDate] = useState(new Date().toISOString().split("T")[0])

  const [members, setMembers] = useState([])
  const [checked, setChecked] = useState([])
  const [loadingMembers, setLoadingMembers] = useState(true)

  // search
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 400)

  function toggleMember(id) {
    setChecked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  // chỉ check những member đang hiển thị
  function checkAll() {
    setChecked((prev) => {
      const ids = filteredMembers.map((m) => m.id)
      return Array.from(new Set([...prev, ...ids]))
    })
  }

  function uncheckAll() {
    setChecked((prev) => {
      const ids = filteredMembers.map((m) => m.id)
      return prev.filter((id) => !ids.includes(id))
    })
  }

  async function saveAttendance() {
    startTransition(async () => {
      await supabase.from("attendance").delete().eq("attend_date", date)

      const rows = checked.map((id) => ({
        member_id: id,
        attend_date: date,
      }))

      if (rows.length) {
        await supabase.from("attendance").insert(rows)
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

    const checkedIds = attendanceData?.map((a) => a.member_id) || []

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

    return members.filter((m) => m.name.toLowerCase().includes(keyword))
  }, [members, debouncedSearch])

  return (
    <div className="">
      <h2 className="">Điểm danh</h2>

      <div className="">
        <input
          type="text"
          className=""
          placeholder="Search member..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "250px" }}
          disabled={isPending}
        />

        {search && (
          <button
            className=""
            onClick={() => setSearch("")}
            disabled={isPending}
          >
            X
          </button>
        )}

        <button className="" onClick={checkAll} disabled={isPending}>
          Chọn tất cả
        </button>

        <button className="" onClick={uncheckAll} disabled={isPending}>
          Bỏ chọn tất cả
        </button>

        <div className="">
          Có mặt ngày <span className="">{formatDate(date, "vi")}</span>:{" "}
          {checked.length}/{members.length}
        </div>
      </div>

      <div className="">
        <input
          type="date"
          className=""
          style={{ width: "200px" }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          disabled={isPending}
        />
        <button className="" onClick={saveAttendance} disabled={isPending}>
          {isPending ? `Đang lưu điểm danh ngày ` : `Lưu điểm danh ngày `}
          {formatDate(date, "vi")}
        </button>
      </div>

      {loadingMembers && <div className="">Loading member list...</div>}

      {!loadingMembers && (
        <div className="">
          {filteredMembers.map((member) => (
            <label
              key={member.id}
              className={clsx(``, {
                "is-active": checked.includes(member.id),
              })}
              htmlFor={member.id}
            >
              <input
                id={member.id}
                type="checkbox"
                checked={checked.includes(member.id)}
                onChange={() => toggleMember(member.id)}
                className=""
              />
              <div
                className={clsx("", {
                  "": checked.includes(member.id),
                })}
              >
                <ImgAvatar
                  src={member.avatar}
                  alt={member.name}
                  classprop=""
                  width={200}
                  height={200}
                />
                <div className="">
                  <h5 className="">{member.name}</h5>
                  <p className="">
                    Số buổi tham gia: {member.attendance?.[0]?.count || 0}
                  </p>
                </div>
              </div>
            </label>
          ))}

          {members.length > 0 && filteredMembers.length === 0 && (
            <div className="">No members found</div>
          )}
        </div>
      )}
    </div>
  )
}
