export function updateQueryParams(params, updates = {}) {
  const newParams = new URLSearchParams(params)

  Object.entries(updates).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "") {
      newParams.delete(key)
    } else {
      newParams.set(key, value)
    }
  })

  return newParams
}
