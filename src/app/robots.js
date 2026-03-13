export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/"
      },
      {
        userAgent: "*",
        disallow: "/admin"
      }
    ],
    sitemap: "https://ngoobadminton.vercel.app/sitemap.xml"
  }
}