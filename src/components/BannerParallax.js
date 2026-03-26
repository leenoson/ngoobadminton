"use client"

import { useEffect, useState } from "react"
import { useModal } from "@/components/ModalProvider"
import VideoHero from "./VideoHero"

export default function BannerParallax({ title, image }) {
  const [offsetY, setOffsetY] = useState(0)
  const { openModal, closeModal } = useModal()

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative w-full overflow-hidden h-screen flex justify-center items-center max-h-[932px] md:max-h-[100vh]">
      <div
        className="absolute top-0 left-0 w-full h-[150%] bg-center bg-cover"
        style={{
          backgroundImage: `url(${image})`,
          transform: `translateY(-${offsetY * 0.5}px)`,
        }}
      />

      <div className="absolute inset-0 bg-black/50" />
      <div className="top-0 left-0 h-full w-auto flex justify-center flex-col relative">
        <h1 className="text-white text-7xl md:text-9xl font-bold tracking-[8px]">
          NGOO.
        </h1>
        <p className="text-white font-medium text-4xl md:text-5xl tracking-[10px] md:tracking-[20px] mb-2">
          #Badminton
        </p>
        <p className="text-white text-sm md:text-base md:tracking-[3px]">
          Xin chào! Chúng tôi vừa NGOO vừa thân thiện.
        </p>
        <div className="flex gap-x-1"></div>
      </div>
      <div className="absolute bottom-4 left-4 rounded-[50%] ">scroll down</div>
      <div className="absolute z-8 bottom-4 right-4">
        <div
          className="rounded-[50%] bg-[#000] text-white w-10 h-10 cursor-pointer text-xs"
          onClick={() =>
            openModal(
              <div>
                <VideoHero />
              </div>,
            )
          }
        >
          Xem clip
        </div>
      </div>
    </section>
  )
}
