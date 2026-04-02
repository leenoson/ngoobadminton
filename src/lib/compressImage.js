import imageCompression from "browser-image-compression"

export async function compressImage(file) {
  const options = {
    maxSizeMB: 0.3,
    maxWidthOrHeight: 512,
    useWebWorker: true,
  }

  const compressedFile = await imageCompression(file, options)

  return compressedFile
}
