import Image from "next/image"
import GalleryClient from "./GalleryClient"
import { getMedia } from "@/app/actions/mediaActions"

async function GallerySection() {
  const media = await getMedia()

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

      <GalleryClient media={media} />
    </section>
  )
}

export default GallerySection
