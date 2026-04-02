import imageCompression from "browser-image-compression"

export async function compressImage(file) {
  const options = {
    maxSizeMB: 0.3,
    maxWidthOrHeight: 400,
    useWebWorker: true,
  }

  return await imageCompression(file, options)
}
