import Image from "next/image";

export default function ImgAvatar({ src, alt }) {
	return <Image
		src={src || "https://i.pravatar.cc/200"}
		alt={alt}
		className="rounded-circle"
		width={200}
		height={200}
	/>
}