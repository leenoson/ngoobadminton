"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import SlideNextButton from "./SlideButton"

export default function BannerTop() {
  return (
    <div className="slide">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        // spaceBetween={20}
        slidesPerView={1}
        navigation
        // pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        onSlideChange={(swiper) => {
          // console.log(swiper.realIndex)
        }}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        <SlideNextButton type="prev" />
        <SlideNextButton type="next" />

        <SwiperSlide>
          <div className="slide-top">Slide 1</div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slide-top">Slide 2</div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slide-top">Slide 3</div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slide-top">Slide 4</div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
