import Image from "next/image"
import AddMemberButton from "./AddMemberButton"

function NoResultSearchMember({ text, isAddMemberButton }) {
  return (
    <div className="noresult">
      <p>{text}</p>
      <figure className="noresult__img">
        <Image
          src={"/images/common/noresult.png"}
          width={640}
          height={640}
          alt={text}
        />
      </figure>
      {isAddMemberButton && <AddMemberButton />}
    </div>
  )
}

export default NoResultSearchMember
