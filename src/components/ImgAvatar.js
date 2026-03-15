import Image from "next/image";

export default function ImgAvatar({ src, alt, classprop = "rounded-circle" }) {
	return <Image
		src={src || "https://i.pravatar.cc/50"}
		alt={alt}
		className={classprop}
		width={200}
		height={200}
	/>
}