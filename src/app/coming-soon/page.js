"commingsoon.jpg"

// import Image from "next/image"
import { Be_Vietnam_Pro } from "next/font/google"
import clsx from "clsx"

const beVN = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["700"],
})

export default function CommingSoon() {
  return (
    <>
      {/* <Image
        src="/images/commingsoon.jpg"
        alt="coming soon"
        width={1200}
        height={1200}
      /> */}
      <div
        className={clsx(
          `comming-soon flex justify-center items-center ${beVN.className}`,
        )}
      >
        <h1 className="text-[#fff] z-1 text-md md:text-3xl">
          Chúng tôi sẽ sớm có mặt!
        </h1>
      </div>
    </>
  )
}
