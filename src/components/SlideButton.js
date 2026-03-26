import { useSwiper } from "swiper/react"

export default function SlideNextButton({ type }) {
  const swiper = useSwiper()

  return type === "next" ? (
    <button
      className="w-max rounded bg-[#ccc] text-[#fff]"
      onClick={() => swiper.slideNext()}
    >
      Slide to the {type} slide
    </button>
  ) : (
    <button
      className="w-max rounded bg-[#ccc] text-[#fff]"
      onClick={() => swiper.slidePrev()}
    >
      Slide to the {type} slide
    </button>
  )
}
