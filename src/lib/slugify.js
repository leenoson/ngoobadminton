export function slugify(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

export function createMemberSlug(name, id) {
  return `${slugify(name)}--${id}`
}

export function extractIdFromSlug(slug) {
  if (!slug) return null

  if (Array.isArray(slug)) slug = slug[0]

  if (typeof slug !== "string") return null

  const parts = slug.split("--")

  return parts[1] || null
}
