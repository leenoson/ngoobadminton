import Image from "next/image"
import { Icons } from "@/components/Icons"
import clsx from "clsx"

export default function MediaItem({ item, selected, onToggle, onDelete }) {
  return (
    <li
      className={clsx(`gallery__item`, {
        "is-checked": selected,
      })}
    >
      <div className="gallery__box">
        <label className="gallery__label">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onToggle(item.id)}
            className="gallery__checkbox"
          />
          <span className="gallery__icon">
            <Icons.Check />
          </span>
          {item.type === "image" ? (
            <Image
              src={item.url}
              width={200}
              height={200}
              className="gallery__img"
              alt={item.caption || "Hình ảnh sinh hoạt của team"}
            />
          ) : (
            <video src={item.url} controls className="gallery__video" />
          )}
        </label>
        <div className="gallery__controls">
          <button
            className="button01 button01--short button01--cancel"
            onClick={onDelete}
          >
            <Icons.Delete />
          </button>
        </div>
      </div>
    </li>
  )
}
