import { useSwiper } from "swiper/react"

export default function SlideNextButton({ type }) {
  const swiper = useSwiper()

  return type === "next" ? (
    <button onClick={() => swiper.slideNext()}>
      Slide to the {type} slide
    </button>
  ) : (
    <button onClick={() => swiper.slidePrev()}>
      Slide to the {type} slide
    </button>
  )
}
