export const getToday = () => {
  return new Date().toISOString().split("T")[0]
}

export const formatDate = (dateStr, type = "en") => {
  const d = new Date(dateStr)

  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")

  return type === "en" ? `${year}-${month}-${day}` : `${day}/${month}/${year}`
}

export const parseDate = (dateStr) => {
  if (!dateStr) return new Date()

  const d = new Date(dateStr)
  d.setHours(0, 0, 0, 0)
  return d
}

export const formatDateToDB = (date) => {
  if (!date) return null

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}
