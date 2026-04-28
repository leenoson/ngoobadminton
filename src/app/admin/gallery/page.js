import AutoScrollTop from "@/components/AutoScrollTop"
import { getMedia } from "@/app/actions/mediaActions"
import UploadZone from "./UploadZone"
import MediaItem from "./MediaItem"
import NoResultSearchMember from "../members/components/NoResultSearchMember"

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
      {media.length ? (
        <ul className="gallery">
          {media.map((item) => (
            <MediaItem key={item.id} item={item} />
          ))}
        </ul>
      ) : (
        <NoResultSearchMember text="Chưa có hình/video nào cả" />
      )}
    </section>
  )
}

export default GalleryAdmin
