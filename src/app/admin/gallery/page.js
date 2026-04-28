import AutoScrollTop from "@/components/AutoScrollTop"
import UploadZone from "./UploadZone"
import MediaList from "./MediaList"
import { Suspense } from "react"
import LoadingMediaList from "./LoadingMediaList"
import { getMedia } from "@/app/actions/mediaActions"

export const metadata = {
  title: "Admin quản lý media",
}

async function GalleryAdmin() {
  const media = await getMedia()

  return (
    <section>
      <AutoScrollTop />
      <h1 className="title04">Gallery</h1>
      <UploadZone />
      <Suspense fallback={<LoadingMediaList />}>
        <MediaList media={media} />
      </Suspense>
    </section>
  )
}

export default GalleryAdmin
