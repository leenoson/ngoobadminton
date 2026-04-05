"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect, useTransition } from "react"
import Select from "react-select"
import useDebounce from "@/hooks/useDebounce"

export default function FilterBar() {
  const options_sort = [
    { value: "joined", label: "Ngày tham gia" },
    { value: "attendance", label: "Chuyên cần" },
    { value: "name", label: "Họ & Tên" },
  ]

  const options_order = [
    { value: "desc", label: "Giảm dần" },
    { value: "asc", label: "Tăng dần" },
  ]

  const router = useRouter()
  const params = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const sort = params.get("sort") || "joined"
  const order = params.get("order") || "desc"
  const searchParam = params.get("search") || ""

  const [search, setSearch] = useState(searchParam)
  const debouncedSearch = useDebounce(search, 500)

  const sortOption = options_sort.find((opt) => opt.value === sort)
  const orderOption = options_order.find((opt) => opt.value === order)

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

  const customStyles = {
    control: (base, state) => ({
      // ...base,
      // background: "#111",
      // borderColor: state.isFocused ? "#6366f1" : "#333",
      // boxShadow: "none",
      // "&:hover": {
      //   borderColor: "#6366f1",
      // },
    }),

    container: (base) => ({
      // ...base,
    }),

    indicatorsContainer: (base) => ({
      // ...base,
    }),

    indicatorSeparator: () => ({
      display: "none",
    }),

    valueContainer: (base) => ({
      // ...base,
      // padding: "0px 8px",
    }),

    menu: (base) => ({
      ...base,
      borderRadius: "var(--radius-m)",
      backgroundColor: "var(--color-d-5)",
      border: "1px solid var(--color-d-6)",
    }),

    option: (base, state) => ({
      // ...base,
      // background: state.isSelected
      //   ? "#6366f1"
      //   : state.isFocused
      //     ? "#222"
      //     : "transparent",
      // color: "#fff",
    }),

    singleValue: (base) => ({
      // ...base,
      // color: "#fff",
    }),
  }

  return (
    <div className="search" role="form">
      <div className="search__input">
        <label htmlFor="search" />
        <input
          id="search"
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm thành viên theo tên..."
        />

        {search && (
          <button
            aria-label="Reset input tìm kiếm"
            className="search__reset"
            onClick={() => setSearch("")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8"
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

      <div className="filters">
        <Select
          options={options_sort}
          value={sortOption}
          onChange={(opt) => updateParam("sort", opt.value)}
          instanceId="search-sort"
          styles={customStyles}
          isSearchable={false}
          isClearable={false}
          classNamePrefix="select-custom"
          className="select__container"
        />

        <Select
          options={options_order}
          value={orderOption}
          onChange={(opt) => updateParam("sort", opt.value)}
          instanceId="search-order"
          styles={customStyles}
          isSearchable={false}
          isClearable={false}
          classNamePrefix="select-custom"
          className="select__container"
        />
      </div>
    </div>
  )
}
