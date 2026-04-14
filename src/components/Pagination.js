"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function Pagination({ totalPages, currentPage }) {
  const router = useRouter()
  const params = useSearchParams()

  useEffect(() => {
    if (currentPage < totalPages) {
      const nextParams = new URLSearchParams(params)
      nextParams.set("page", currentPage + 1)

      router.prefetch(`/admin/members?${nextParams.toString()}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, totalPages])

  if (!totalPages || totalPages <= 1) return null

  const goToPage = (page) => {
    const newParams = new URLSearchParams(params)

    newParams.set("page", page)

    router.replace(`/admin/members?${newParams.toString()}`, {
      // scroll: false,
    })
  }

  const getPages = () => {
    const pages = []
    const delta = 1

    const start = Math.max(2, currentPage - delta)
    const end = Math.min(totalPages - 1, currentPage + delta)

    pages.push(1)

    if (start > 2) {
      pages.push("...")
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (end < totalPages - 1) {
      pages.push("...")
    }

    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  const pages = getPages()

  return (
    <ul className="pagination">
      <li
        className="pagination__btn"
        onClick={() => goToPage(1)}
        disabled={currentPage === 1}
      >
        «
      </li>
      <li
        className="pagination__btn"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ←
      </li>

      {pages.map((p, index) =>
        p === "..." ? (
          <li key={`${p}-${index}`} className="pagination__dots">
            <span>...</span>
          </li>
        ) : (
          <li
            key={p}
            aria-current={p === currentPage ? "page" : undefined}
            onClick={() => p !== currentPage && goToPage(p)}
            className={`pagination__btn ${
              p === currentPage ? "is-current" : ""
            }`}
          >
            {p}
          </li>
        ),
      )}

      <li
        className="pagination__btn"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        →
      </li>
      <li
        className="pagination__btn"
        onClick={() => goToPage(totalPages)}
        disabled={currentPage === totalPages}
      >
        »
      </li>
    </ul>
  )
}
