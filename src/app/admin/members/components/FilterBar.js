"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect, useTransition } from "react"
import useDebounce from "@/hooks/useDebounce"
export default function FilterBar() {
  const router = useRouter()
  const params = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const sort = params.get("sort") || "joined"
  const order = params.get("order") || "desc"
  const searchParam = params.get("search") || ""

  const [search, setSearch] = useState(searchParam)
  const debouncedSearch = useDebounce(search, 500)

  const updateParam = (key, value) => {
    const newParams = new URLSearchParams(params)

    newParams.set(key, value)

    router.replace(`/admin/members?${newParams.toString()}`)
  }

  useEffect(() => {
    const newParams = new URLSearchParams(params)

    debouncedSearch
      ? newParams.set("search", debouncedSearch)
      : newParams.delete("search")

    const newUrl = `/admin/members?${newParams.toString()}`
    const currentUrl = `/admin/members?${params.toString()}`

    if (newUrl !== currentUrl) {
      startTransition(() => {
        router.replace(newUrl, { scroll: false })
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])

  return (
    <div className="">
      <div className="">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm thành viên theo tên..."
          className=""
        />

        {search && (
          <button className="" onClick={() => setSearch("")}>
            X
          </button>
        )}
      </div>

      <div className="">
        <select
          value={sort}
          className=""
          onChange={(e) => updateParam("sort", e.target.value)}
        >
          <option value="joined">Ngày tham gia</option>
          <option value="attendance">Chuyên cần</option>
          <option value="name">Họ & Tên</option>
        </select>
      </div>

      <div className="">
        <select
          value={order}
          className=""
          onChange={(e) => updateParam("order", e.target.value)}
        >
          <option value="desc">Giảm dần</option>
          <option value="asc">Tăng dần</option>
        </select>
      </div>
    </div>
  )
}
