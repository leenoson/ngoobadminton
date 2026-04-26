"use client"

import { useDevice } from "@/hooks/useDevice"
import clsx from "clsx"
// import { useElementSizeStore } from "@/stores/useElementSizeStore"
import BannerTitle from "./BannerTitle"
import BannerButton from "./BannerButton"
import BannerButtonModal from "./BannerButtonModal"
import { useEffect, useState } from "react"

export default function BannerParallax({ image }) {
  const { isMobileDevice, isSmallScreen } = useDevice()
  // const navbarSize = useElementSizeStore((s) => s.sizes["navbar"])
  const [offsetY, setOffsetY] = useState(0)

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
          transform: `translateY(-${offsetY * 0.2}px)`,
        }}
      />

      <div className="banner__bg" />
      <BannerTitle />
      <BannerButton />
      <BannerButtonModal />
    </section>
  )
}
