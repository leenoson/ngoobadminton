import Image from "next/image"
import AddMemberButton from "./AddMemberButton"

function NoMember() {
  return (
    <>
      <p className="text-center mb-(--spac)">Chưa có NGOO nào</p>
      <AddMemberButton />
    </>
  )
}

export default NoMember
