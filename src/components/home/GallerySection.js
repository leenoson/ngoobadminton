import Image from "next/image"
import { getImages } from "@/lib/getImages"
import GalleryClient from "./GalleryClient"

function GallerySection() {
  const images = getImages()

  return (
    <section className="px-(--spac)">
      <div className="imgtitle" data-aos="fade-up">
        <Image
          src="/images/common/gallery.svg"
          alt="Thư viện ảnh của nhóm"
          width={640}
          height={640}
        />
      </div>
      <h2 className="title02" data-aos="fade-up">
        Gallery
      </h2>

      <GalleryClient images={images} />
    </section>
  )
}

export default GallerySection
