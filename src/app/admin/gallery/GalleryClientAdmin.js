"use client"

import ButtonRipple from "@/components/ButtonRipple"
import { Icons } from "@/components/Icons"
import Image from "next/image"

function GalleryClientAdmin({ images }) {
  return (
    <ul className="gallery">
      {images.map((src) => (
        <li key={src} className="gallery__item">
          <div className="gallery__box">
            <Image
              className="gallery__img"
              src={src}
              alt="Thư viện ảnh của nhóm"
              width={200}
              height={200}
            />
            <div className="gallery__controls">
              <ButtonRipple
                className="button01 button01--cancel"
                onClick={() => console.log("xoa")}
              >
                <Icons.Delete />
                Xóa
              </ButtonRipple>
              <ButtonRipple
                className="button01"
                onClick={() => console.log("sua")}
              >
                <Icons.Edit />
                Sửa
              </ButtonRipple>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default GalleryClientAdmin
