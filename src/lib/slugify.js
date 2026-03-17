export function slugify(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export function createMemberSlug(name, id) {
  return `${slugify(name)}--${id}`
}

export function extractIdFromSlug(slug) {
  const parts = slug.split('--')
  return parts[1] || null
}