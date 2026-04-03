"use client"

import Image from "next/image"
import { smoothScrollTo } from "@/lib/smoothScroll"

function Logo() {
  return (
    <>
      <figure onClick={() => smoothScrollTo(0, 600)}>
        <Image
          src="/images/common/logo.webp"
          alt="NGOO Badminton"
          width={256}
          height={256}
        />
      </figure>

      {/* <AnimatedLink className="" href="/about">
        Chuyển màn
      </AnimatedLink> */}
    </>
  )
}

export default Logo
