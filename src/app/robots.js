export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/login"]
      },
    ],
    sitemap: "https://ngoobadminton.vercel.app/sitemap.xml"
  }
}