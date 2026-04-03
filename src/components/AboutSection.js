import Image from "next/image"
import ImgAvatar from "./ImgAvatar"

function AboutSection() {
  return (
    <section id="about">
      <div className="container">
        <div className="imgtitle" data-aos="fade-up">
          <ImgAvatar
            src="/images/common/about.svg"
            alt="NGOO-Nhóm Cầu Lông Lớn Thứ 2 Thủ Dầu Một"
            widthprop={640}
            heightprop={640}
          />
        </div>
        <h2 className="title02" data-aos="fade-up">
          NGOO<span className="line01">-</span>
          Nhóm Cầu Lông <br className="block md:hidden" />
          Lớn Thứ 2 <br className="block md:hidden" />
          Thủ Dầu Một
        </h2>
        <div className="block01">
          <div className="block01__content">
            <div className="block01__row" data-aos="fade-up">
              <h3 className="block01__title">NGOO là ai?</h3>
              <p>
                <strong>NGOO</strong> là một nhóm cầu lông lớn thứ 2 tại Thủ Dầu
                Một, nơi các thành viên từ nhiều độ tuổi và trình độ cùng nhau
                rèn luyện kỹ năng, nâng cao thể lực và xây dựng tinh thần đồng
                đội.
              </p>
              <p>
                Chúng mình không chỉ hướng tới việc phát triển kỹ năng cá nhân
                mà còn mong muốn tạo ra một cộng đồng cầu lông gắn kết, vui vẻ
                và năng động.
              </p>
            </div>
          </div>
          <div className="block01__img" data-aos="fade-up">
            <Image
              src="/images/ngoo_01.jpg"
              width={2000}
              height={2000}
              alt="NGOO"
            />
          </div>
        </div>
        <div className="block01">
          <div className="block01__row block01__row--full" data-aos="fade-up">
            <h3 className="block01__title">NGOO&apos;s ra đời</h3>
            <p>
              <strong>NGOO</strong> được thành lập nhằm mang đến một môi trường
              luyện tập cầu lông lành mạnh và bổ ích, đồng thời kết nối những
              người yêu thích cầu lông tại Thủ Dầu Một.
            </p>
            <p>
              Chúng mình mong muốn các thành viên vừa rèn luyện kỹ năng, vừa xây
              dựng các mối quan hệ thân thiện, góp phần phát triển cộng đồng thể
              thao tại địa phương.
            </p>
          </div>

          <div className="block01__row block01__row--full" data-aos="fade-up">
            <h3 className="block01__title">NGOO&apos;s sinh nhật</h3>
            <p>
              <strong>NGOO</strong> ra đời vào ngày 02/06/2025, với khoảng 4–5
              thành viên ban đầu.
            </p>
            <p>
              Từ một nhóm nhỏ, NGOO đã nhanh chóng phát triển và trở thành một
              trong những nhóm cầu lông lớn tại Thủ Dầu Một, thu hút nhiều người
              đam mê tham gia, tạo nên một cộng đồng sôi nổi và nhiệt huyết.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
