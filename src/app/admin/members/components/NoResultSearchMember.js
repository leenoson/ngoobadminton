import Image from "next/image"

function NoResultSearchMember() {
  return (
    <div className="noresult">
      <p>Không tìm thấy NGOO nào</p>
      <figure className="noresult__img">
        <Image
          src={"/images/common/noresult.png"}
          width={640}
          height={640}
          alt="Không tìm thấy NGOO nào"
        />
      </figure>
    </div>
  )
}

export default NoResultSearchMember
