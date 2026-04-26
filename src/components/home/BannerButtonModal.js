"use client"

import VideoHero from "./VideoHero"
import { Icons } from "../Icons"
import { useModal } from "../ModalProvider"

function BannerButtonModal() {
  const { openModal, closeModal } = useModal()

  return (
    <button
      className="button03"
      onClick={() =>
        openModal(
          <div>
            <VideoHero />
          </div>,
        )
      }
    >
      <Icons.Play />
    </button>
  )
}

export default BannerButtonModal
