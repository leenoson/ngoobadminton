import fs from "fs"
import path from "path"

export function getImages() {
  const dir = path.join(process.cwd(), "public/images/gallery")
  const files = fs.readdirSync(dir)

  return files
    .filter((f) => /\.(jpg|jpeg|png|webp|gif)$/i.test(f))
    .sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }),
    )
    .map((file) => `/images/gallery/${file}`)
}
