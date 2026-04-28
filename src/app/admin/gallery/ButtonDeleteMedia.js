"use client"

import { useState } from "react"
import DeleteMediaModal from "./DeleteMediaModal"
import ButtonRipple from "@/components/ButtonRipple"
import { Icons } from "@/components/Icons"

function ButtonDeleteMedia({ media }) {
  const [deletingMedia, setDeletingMedia] = useState(null)

  return (
    <>
      <ButtonRipple
        className="button01 button01--short button01--cancel"
        onClick={() => setDeletingMedia(media)}
      >
        <Icons.Delete />
      </ButtonRipple>

      {deletingMedia && (
        <DeleteMediaModal
          media={deletingMedia}
          onClose={() => setDeletingMedia(null)}
        />
      )}
    </>
  )
}

export default ButtonDeleteMedia
