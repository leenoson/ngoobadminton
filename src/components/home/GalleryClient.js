"use client"

import LightGallery from "lightgallery/react"
import lgZoom from "lightgallery/plugins/zoom"
import Image from "next/image"
import "lightgallery/css/lightgallery.css"
import "lightgallery/css/lg-zoom.css"

function GalleryClient({ media }) {
  if (!media || media.length === 0) {
    return (
      <p className="text-center">
        Hãy tham gia với chùng mình để cùng nhau tạo nên các khoảnh khắc đáng
        nhớ nhá
      </p>
    )
  }

  return (
    <LightGallery plugins={[lgZoom]} speed={500} elementClassNames={"gallery"}>
      {media?.map((item) => (
        <a
          key={item?.id}
          data-src={item?.url}
          className={"gallery__item"}
          data-aos="fade-up"
        >
          <Image
            className="gallery__img"
            src={item?.url}
            alt={item?.caption}
            width={200}
            height={200}
          />
        </a>
      ))}
    </LightGallery>
  )
}

export default GalleryClient
