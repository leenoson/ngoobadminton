import Image from "next/image"
import ButtonDeleteMember from "./ButtonDeleteMedia"

export default function MediaItem({ item }) {
  return (
    <li className="gallery__item">
      <div className="gallery__box">
        {item.type === "image" ? (
          <Image
            src={item.url}
            width={200}
            height={200}
            className="gallery__img"
            alt={item.caption || "Hình ảnh sinh hoạt của team"}
          />
        ) : (
          <video src={item.url} controls className="w-[200px]" />
        )}

        <div className="gallery__controls">
          <ButtonDeleteMember media={item} />
        </div>
      </div>
    </li>
  )
}
