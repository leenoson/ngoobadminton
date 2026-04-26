"use client"

import { useState, useEffect, useMemo, useTransition } from "react"
import { createClient } from "@/lib/supabase/client"
import { createAdminClient } from "@/lib/supabase/admin"
import ImgAvatar from "@/components/ImgAvatar"
import useDebounce from "@/hooks/useDebounce"
import clsx from "clsx"
import CardSkeleton from "@/components/Skeleton"
import { formatDate, getToday } from "@/lib/date"
import ButtonRipple from "@/components/ButtonRipple"
import { saveAttendanceAction } from "@/app/actions/saveAttendance"

function AttendanceClient() {
  const supabase = createClient()

  const [isFetching, startFetching] = useTransition()
  const [isSaving, startSaving] = useTransition()

  const [members, setMembers] = useState([])
  const [checked, setChecked] = useState([])

  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 400)

  const [date, setDate] = useState(getToday())
  const [tempDate, setTempDate] = useState(getToday())

  function toggleMember(id) {
    setChecked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

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
    startSaving(async () => {
      try {
        await saveAttendanceAction(date, checked)
        await fetchAttendance()
      } catch (err) {
        console.error("SAVE ERROR:", err)
      }
    })
  }

  async function fetchAttendance() {
    startFetching(async () => {
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
    })
  }

  useEffect(() => {
    fetchAttendance()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])

  const filteredMembers = useMemo(() => {
    if (!debouncedSearch) return members

    const keyword = debouncedSearch.toLowerCase()

    return members.filter((m) => m.name.toLowerCase().includes(keyword))
  }, [members, debouncedSearch])

  const isAllSelected =
    filteredMembers.length > 0 &&
    filteredMembers.every((m) => checked.includes(m.id))

  const isNoneSelected = !filteredMembers.some((m) => checked.includes(m.id))
  return (
    <>
      <div className="form02">
        <div className="input" disabled={isFetching || isSaving}>
          <input
            placeholder="Tìm kiếm thành viên theo tên..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={isFetching || isSaving}
          />
          {search && (
            <button
              aria-label="Reset input tìm kiếm"
              className="search__reset"
              onClick={() => setSearch("")}
              disabled={isFetching || isSaving}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        <ButtonRipple
          className="button01"
          onClick={checkAll}
          disabled={isSaving || isFetching || isAllSelected}
        >
          Chọn tất cả
        </ButtonRipple>
        <ButtonRipple
          className="button01 button01--cancel"
          onClick={uncheckAll}
          disabled={isSaving || isFetching || isNoneSelected}
        >
          Bỏ chọn tất cả
        </ButtonRipple>
      </div>
      <p className="mb-[1rem]">
        Ngày <span className="badge">{formatDate(date, "vi")}</span> có{" "}
        <span className="text-(--color-l-1)">
          {isFetching || isSaving
            ? "..."
            : `${checked.length}/${members.length}`}
        </span>{" "}
        thành viên
      </p>

      <div className="form02">
        <div className="input input--date" disabled={isFetching || isSaving}>
          <input
            type="date"
            value={tempDate}
            onChange={(e) => setTempDate(e.target.value)}
            disabled={isFetching || isSaving}
          />
        </div>
        <ButtonRipple
          className="button01"
          onClick={() => setDate(tempDate)}
          disabled={isFetching || isSaving || tempDate === date}
        >
          Xem danh sách ngày {formatDate(tempDate, "vi")}
        </ButtonRipple>
        <ButtonRipple
          className="button01 button01--info"
          onClick={saveAttendance}
          disabled={isSaving || isFetching}
        >
          {isSaving ? `Đang lưu điểm danh ngày... ` : `Lưu điểm danh ngày `}
          {formatDate(date, "vi")}
        </ButtonRipple>
      </div>

      {isFetching && <CardSkeleton />}

      {!isFetching && (
        <ul className="card-list list-attendance">
          {filteredMembers.map((member) => (
            <li key={member?.id} className="card-item">
              <label
                className={clsx(`card`, {
                  "is-active": checked.includes(member?.id),
                })}
                htmlFor={member?.id}
              >
                <input
                  id={member?.id}
                  type="checkbox"
                  checked={checked.includes(member?.id)}
                  onChange={() => toggleMember(member?.id)}
                />
                <div className="card__avatar">
                  <ImgAvatar
                    src={member?.avatar}
                    alt={member?.name}
                    classprop="card__img"
                    width={250}
                    height={250}
                  />
                </div>
                <div className="card__detail">
                  <h3 className="card__name">{member?.name}</h3>
                  <h4 className="card__nickname">{member?.nickname}</h4>
                  <p className="card__attendance">
                    Số buổi:{" "}
                    {member?.attendance?.[0]?.count ? (
                      <span className="badge">
                        {member?.attendance?.[0]?.count}
                      </span>
                    ) : (
                      <span className="badge badge--type01">0</span>
                    )}
                  </p>
                  {/* <div className="card__control">
                    <Link
                      href={`/admin/members/${createMemberSlug(member?.name, member?.id)}`}
                      className="button01 button01--info"
                    >
                      Chi tiết
                    </Link>
                  </div> */}
                </div>
              </label>
            </li>
          ))}

          {members.length > 0 && filteredMembers.length === 0 && (
            <div className="">Chưa có NGOO nào tên này</div>
          )}
        </ul>
      )}
    </>
  )
}

export default AttendanceClient
