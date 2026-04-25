"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useCallback } from "react"
import ButtonRipple from "./ButtonRipple"

export default function Pagination({ totalPages, currentPage }) {
  const router = useRouter()
  const params = useSearchParams()

  const goToPage = useCallback(
    (page) => {
      if (page < 1 || page > totalPages) return

      const newParams = new URLSearchParams(params)
      newParams.set("page", page)

      router.replace(`/admin/members?${newParams.toString()}`)
    },
    [params, router, totalPages],
  )

  useEffect(() => {
    if (currentPage < totalPages) {
      const nextParams = new URLSearchParams(params)
      nextParams.set("page", currentPage + 1)

      router.prefetch(`/admin/members?${nextParams.toString()}`)
    }
  }, [currentPage, totalPages, params, router])

  const pages = useMemo(() => {
    if (!totalPages || totalPages <= 1) return []

    const result = []
    const delta = 1

    const start = Math.max(2, currentPage - delta)
    const end = Math.min(totalPages - 1, currentPage + delta)

    result.push(1)

    if (start > 2) result.push("...")

    for (let i = start; i <= end; i++) {
      result.push(i)
    }

    if (end < totalPages - 1) result.push("...")

    if (totalPages > 1) result.push(totalPages)

    return result
  }, [currentPage, totalPages])

  if (!pages.length) return null

  return (
    <ul className="pagination">
      <li>
        <ButtonRipple
          className="pagination__btn"
          onClick={() => goToPage(1)}
          disabled={currentPage === 1}
        >
          «
        </ButtonRipple>
      </li>
      <li>
        <ButtonRipple
          className="pagination__btn"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ←
        </ButtonRipple>
      </li>

      {pages.map((p, index) =>
        p === "..." ? (
          <li key={`${p}-${index}`} className="pagination__dots">
            <span>...</span>
          </li>
        ) : (
          <li key={p}>
            <ButtonRipple
              aria-current={p === currentPage ? "page" : undefined}
              onClick={() => p !== currentPage && goToPage(p)}
              className={`pagination__btn ${
                p === currentPage ? "is-current" : ""
              }`}
            >
              {p}
            </ButtonRipple>
          </li>
        ),
      )}

      <li>
        <ButtonRipple
          className="pagination__btn"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          →
        </ButtonRipple>
      </li>
      <li>
        <ButtonRipple
          className="pagination__btn"
          onClick={() => goToPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          »
        </ButtonRipple>
      </li>
    </ul>
  )
}
