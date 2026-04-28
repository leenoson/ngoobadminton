import { getMedia } from "@/app/actions/mediaActions"
import NoResultSearchMember from "../members/components/NoResultSearchMember"
import MediaItem from "./MediaItem"

async function MediaList() {
  const media = await getMedia()

  return (
    <>
      {media.length ? (
        <ul className="gallery">
          {media.map((item) => (
            <MediaItem key={item.id} item={item} />
          ))}
        </ul>
      ) : (
        <NoResultSearchMember text="Chưa có hình/video nào cả" />
      )}
    </>
  )
}

export default MediaList
