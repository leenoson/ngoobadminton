"use client"

import LightGallery from "lightgallery/react"
import lgZoom from "lightgallery/plugins/zoom"
import lgThumbnail from "lightgallery/plugins/thumbnail"
import Image from "next/image"
import "lightgallery/css/lightgallery.css"
import "lightgallery/css/lg-zoom.css"

function GalleryClient({ images }) {
  return (
    <LightGallery plugins={[lgZoom]} speed={500} elementClassNames={"gallery"}>
      {images.map((src) => (
        <a
          key={src}
          data-src={src}
          className={"gallery__item"}
          data-aos="fade-up"
        >
          <Image
            className="gallery__img"
            src={src}
            alt="Thư viện ảnh của nhóm"
            width={200}
            height={200}
          />
        </a>
      ))}
    </LightGallery>
  )
}

export default GalleryClient
