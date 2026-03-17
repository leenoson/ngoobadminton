const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export default function sitemap() {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1
    }
  ]
}