import NoResultSearchMember from "../members/components/NoResultSearchMember"
import MediaItem from "./MediaItem"
import MediaListClient from "./MediaListClient"

async function MediaList({ media }) {
  return (
    <>
      {media.length ? (
        <MediaListClient media={media} />
      ) : (
        <NoResultSearchMember text="Chưa có hình/video nào cả" />
      )}
    </>
  )
}

export default MediaList
