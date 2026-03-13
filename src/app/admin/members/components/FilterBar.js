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

		debouncedSearch ? newParams.set("search", debouncedSearch) : newParams.delete("search")

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

		<div className="row g-2 mb-4">

			<div className="d-flex col-md-4 gap-2">
				<input
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Search member..."
					className="form-control"
				/>

				{search && (
          <button
            className="btn btn-outline-secondary"
            onClick={() => setSearch("")}
          >
            Clear
          </button>
        )}
			</div>

			<div className="col-md-3">
				<select
					value={sort}
					className="form-select"
					onChange={(e) => updateParam("sort", e.target.value)}
				>
					<option value="joined">Joined Date</option>
					<option value="attendance">Attendance</option>
					<option value="name">Name</option>
				</select>
			</div>

			<div className="col-md-3">
				<select
					value={order}
					className="form-select"
					onChange={(e) => updateParam("order", e.target.value)}
				>
					<option value="desc">Descending</option>
					<option value="asc">Ascending</option>
				</select>
			</div>
		</div>
	)
}