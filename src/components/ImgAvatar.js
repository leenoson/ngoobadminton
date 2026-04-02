import Image from "next/image"
import clsx from "clsx"

export default function ImgAvatar({
  src,
  alt,
  classprop = "rounded-circle",
  widthprop = 200,
  heightprop = 200,
}) {
  return (
    <Image
      src={src || "/images/noimg.png"}
      alt={alt}
      className={clsx("object-fit-cover", classprop)}
      width={widthprop}
      height={heightprop}
    />
  )
}
