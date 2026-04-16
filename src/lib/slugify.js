// =========================
// Create URL
// =========================
export function createMemberUrl(id) {
  if (!id) return ""
  return `${id}`
}

// =========================
// Extract ID từ params
// =========================
export function getMemberId(param) {
  if (!param) return null

  const value = Array.isArray(param) ? param[0] : param

  if (typeof value !== "string") return null

  return value.trim() || null
}
