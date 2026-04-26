"use client"

import { useEffect, useState } from "react"
import { useModal } from "@/components/ModalProvider"
import useScrollToSection from "@/hooks/useScrollToSection"
import { useDevice } from "@/hooks/useDevice"
import clsx from "clsx"
import VideoHero from "./VideoHero"
import ImgAvatar from "../ImgAvatar"
import { Icons } from "../Icons"
import { useElementSizeStore } from "@/stores/useElementSizeStore"
import BannerTitle from "./BannerTitle"

export default function BannerParallax({ image }) {
  const [offsetY, setOffsetY] = useState(0)
  const { isMobileDevice, isSmallScreen } = useDevice()
  const { openModal, closeModal } = useModal()
  const scrollTo = useScrollToSection()
  const navbarSize = useElementSizeStore((s) => s.sizes["navbar"])

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
      <BannerTitle />
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
            </div>,
          )
        }
      >
        <Icons.Play />
      </button>
    </section>
  )
}
