"use client"

import ButtonRipple from "@/components/ButtonRipple"
import { Icons } from "@/components/Icons"

function ButtonAddMedia() {
  return (
    <ButtonRipple className="button01" onClick={() => console.log("them")}>
      <Icons.AddMedia />
      Thêm media
    </ButtonRipple>
  )
}

export default ButtonAddMedia
