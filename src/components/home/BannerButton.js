"use client"

import useScrollToSection from "@/hooks/useScrollToSection"
import Image from "next/image"

function BannerButton() {
  const scrollTo = useScrollToSection()

  return (
    <div
      className="banner__button"
      onClick={() => scrollTo("about", { duration: 1000 })}
    >
      <span>
        <Image
          alt={"scroll down"}
          src={"/images/common/shuttlecock.svg"}
          aria-label="Scroll xuống dưới"
          width={50}
          height={50}
        />
      </span>
    </div>
  )
}

export default BannerButton
