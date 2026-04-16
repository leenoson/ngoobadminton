"use client"

import { useEffect, useState } from "react"
import { useModal } from "@/components/ModalProvider"
import useScrollToSection from "@/hooks/useScrollToSection"
import { useDevice } from "@/hooks/useDevice"
import clsx from "clsx"
import VideoHero from "./VideoHero"
import ImgAvatar from "../ImgAvatar"
import { Icons } from "../Icons"
import ButtonRipple from "../ButtonRipple"

export default function BannerParallax({ image }) {
  const [offsetY, setOffsetY] = useState(0)
  const { isMobileDevice, isSmallScreen } = useDevice()
  const { openModal, closeModal } = useModal()
  const scrollTo = useScrollToSection()

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section
      className={clsx(`banner`, {
        "is-mobile": isMobileDevice || isSmallScreen,
      })}
    >
      <div
        className="banner__container"
        style={{
          backgroundImage: `url(${image})`,
          transform: `translateY(-${offsetY * 0.5}px)`,
        }}
      />

      <div className="banner__bg" />
      <div
        className="banner__content text-center md:text-left"
        data-aos="fade-up"
      >
        <h1 className="title01" data-aos="fade-up" data-aos-delay="600">
          NGOO.
          <p className="-mt-4 text-white font-medium banner__subtitle tracking-[10px] md:tracking-[20px] mb-2">
            #Badminton
          </p>
        </h1>
        <p className="banner__text" data-aos="fade-up" data-aos-delay="700">
          Xin chào!
          <br className="pc-hidden" /> Chúng mình vừa NGOO,{" "}
          <br className="pc-hidden" />
          vừa thân thiện.
        </p>
      </div>
      <div
        className="banner__button"
        onClick={() => scrollTo("about", { duration: 1000 })}
      >
        <span>
          <ImgAvatar
            alt={"scroll down"}
            src={"/images/common/shuttlecock.svg"}
            aria-label="Scroll xuống dưới"
            widthprop={50}
            heightprop={50}
          />
        </span>
      </div>
      <button
        className="button03"
        onClick={() =>
          openModal(
            <div>
              <VideoHero />
              <ButtonRipple
                className="button01"
                onClick={() => console.log("click btn")}
              >
                click
              </ButtonRipple>
            </div>,
          )
        }
      >
        <Icons.Play />
      </button>
    </section>
  )
}
