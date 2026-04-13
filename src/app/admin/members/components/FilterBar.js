"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect, useTransition } from "react"
import Select from "react-select"
import useDebounce from "@/hooks/useDebounce"
import { updateQueryParams } from "@/lib/updateQueryParams"

export default function FilterBar() {
  const router = useRouter()
  const params = useSearchParams()
  const [isPending, startTransition] = useTransition()

  // 👉 source of truth = URL
  const urlSort = params.get("sort") || "joined"
  const urlOrder = params.get("order") || "desc"
  const searchParam = params.get("search") || ""

  const [sort, setSort] = useState(urlSort)
  const [order, setOrder] = useState(urlOrder)

  const [search, setSearch] = useState(searchParam)
  const debouncedSearch = useDebounce(search, 500)

  useEffect(() => {
    const handleSetFilter = () => {
      setSort(urlSort)
      setOrder(urlOrder)
    }

    handleSetFilter()
  }, [urlSort, urlOrder])

  const options_sort = [
    { value: "joined", label: "Ngày tham gia" },
    { value: "attendance", label: "Chuyên cần" },
    { value: "name", label: "Họ & Tên" },
  ]

  const options_order = [
    { value: "desc", label: "Giảm dần" },
    { value: "asc", label: "Tăng dần" },
  ]

  const sortOption = options_sort.find((opt) => opt.value === sort)
  const orderOption = options_order.find((opt) => opt.value === order)

  const pushParams = (updates) => {
    const newParams = updateQueryParams(params, {
      ...updates,
      page: 1, // 🔥 luôn reset page
    })

    startTransition(() => {
      router.replace(`/admin/members?${newParams.toString()}`, {
        scroll: false,
      })
    })
  }

  const handleSortChange = (opt) => {
    setSort(opt.value)
    pushParams({ sort: opt.value })
  }

  const handleOrderChange = (opt) => {
    setOrder(opt.value)
    pushParams({ order: opt.value })
  }

  useEffect(() => {
    const newParams = updateQueryParams(params, {
      search: debouncedSearch,
      page: 1,
    })

    const newUrl = `/admin/members?${newParams.toString()}`
    const currentUrl = `/admin/members?${params.toString()}`

    if (newUrl !== currentUrl) {
      startTransition(() => {
        router.replace(newUrl, { scroll: false })
      })
    }
  }, [debouncedSearch]) // eslint-disable-line

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
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm thành viên theo tên..."
        />

        {search && (
          <button
            aria-label="Reset input tìm kiếm"
            className="search__reset"
            onClick={() => setSearch("")}
            disabled={isPending}
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

      <div className="sort">
        <p className="sort__text">Sắp xếp</p>

        <Select
          options={options_sort}
          value={sortOption}
          onChange={handleSortChange}
          instanceId="search-sort"
          styles={customStyles}
          isSearchable={false}
          isClearable={false}
          classNamePrefix="select-custom"
          className="select__container"
          isDisabled={isPending}
        />

        <Select
          options={options_order}
          value={orderOption}
          onChange={handleOrderChange}
          instanceId="search-order"
          styles={customStyles}
          isSearchable={false}
          isClearable={false}
          classNamePrefix="select-custom"
          className="select__container"
          isDisabled={isPending}
        />
      </div>
    </div>
  )
}
