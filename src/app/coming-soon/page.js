// import Image from "next/image"
import clsx from "clsx"

export default function CommingSoon() {
  return (
    <>
      {/* <Image
        src="/images/commingsoon.jpg"
        alt="coming soon"
        width={1200}
        height={1200}
      /> */}
      <div className={clsx(`comming-soon flex justify-center items-center`)}>
        <h1 className="text-[#fff] z-1 text-md md:text-3xl">
          Chúng tôi sẽ sớm có mặt!
        </h1>
      </div>
    </>
  )
}
