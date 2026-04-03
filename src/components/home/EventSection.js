import Image from "next/image"
import ImgAvatar from "../ImgAvatar"

function EventSection() {
  return (
    <section id="event">
      <div className="container">
        <div className="imgtitle" data-aos="fade-up">
          <ImgAvatar
            src="/images/common/event.svg"
            alt="NGOO-Nhóm Cầu Lông Lớn Thứ 2 Thủ Dầu Một"
            widthprop={640}
            heightprop={640}
          />
        </div>
        <h2 className="title02" data-aos="fade-up">
          NGOO<span className="line01">-</span>Các Hoạt Động Đa Dạng
        </h2>
        <div className="block01">
          <div className="block01__content">
            <h3 className="block01__title" data-aos="fade-up">
              Chơi cầu lông
            </h3>
            <div data-aos="fade-up">
              <p>
                <strong>NGOO</strong> sinh hoạt đều đặn vào mỗi tuần(kể cả ngày
                lễ Tết):
              </p>
              <ul className="list01 my-2">
                <li>Thứ 2</li>
                <li>Thứ 4</li>
                <li>Thứ 6</li>
              </ul>
              <p>Thời gian: 17:30 – 19:30 </p>
              <p>
                Lịch sinh hoạt cố định giúp các thành viên duy trì phong độ,
                nâng cao kỹ năng và tận hưởng những phút giây vui vẻ trong môi
                trường thân thiện, năng động.
              </p>
              <p>
                Chúng mình luôn công bằng và theo sát mỗi trận cầu của từng
                thành viên để đảm bảo rằng không ai bị bỏ lại phía sau, trừ khi
                bạn xứng đáng 🤡.
              </p>
            </div>
          </div>
          <div className="block01__img" data-aos="fade-up" data-aos-delay="100">
            <Image
              src="/images/ngoo_bad.jpg"
              width={1920}
              height={1201}
              alt="NGOO"
            />
          </div>
        </div>
        <div className="block01 block01--reverse">
          <div className="block01__content">
            <h3 className="block01__title" data-aos="fade-up">
              Sinh nhật thành viên
            </h3>
            <div data-aos="fade-up">
              <p>
                &ldquo;Sinh nhật thành viên&rdquo; là dịp đặc biệt để mọi người
                cùng nhau gửi gắm những lời chúc tốt đẹp, chia sẻ niềm vui và
                tạo nên những kỷ niệm đáng nhớ. <br />
                Đây không chỉ là ngày đánh dấu thêm một tuổi mới mà còn là cơ
                hội để gắn kết tình cảm, lan tỏa sự quan tâm và làm cho mỗi
                thành viên cảm thấy mình luôn được trân trọng trong tập thể.
              </p>
            </div>
          </div>
          <div className="block01__img" data-aos="fade-up" data-aos-delay="100">
            <Image
              src="/images/ngoo_masoi.jpg"
              width={1920}
              height={1201}
              alt="NGOO"
            />
          </div>
        </div>
        <div className="block01">
          <div className="block01__content">
            <h3 className="block01__title" data-aos="fade-up">
              Cà phê Ma Sói
            </h3>
            <div data-aos="fade-up">
              <p>
                Đây là trò chơi mang tính suy luận và giao tiếp cao, giúp mọi
                người trong nhóm thêm phần kết nối. <br />
                Chúng mình thường tập trung tại một quán cafe sau giờ chơi cầu
                lông đầy căng thẳng, mệt mỏi để cùng nhau suy luận tìm ra
                &quot;sói&quot;. Mỗi ván chơi đều mang lại tiếng cười và giúp
                mọi người hiểu nhau hơn.
              </p>
            </div>
          </div>
          <div className="block01__img" data-aos="fade-up" data-aos-delay="100">
            <Image
              src="/images/ngoo_masoi.jpg"
              width={1920}
              height={1201}
              alt="NGOO"
            />
          </div>
        </div>
        <div className="block01 block01--reverse">
          <div className="block01__content">
            <h3 className="block01__title" data-aos="fade-up">
              Goose Goose Duck
              <br />
              (Ma sói ver2)
            </h3>
            <div data-aos="fade-up">
              <p>
                Là một tựa game suy luận xã hội nhiều người chơi, nơi chúng mình
                luôn phải phối hợp với đồng đội để hoàn thành nhiệm vụ hoặc khéo
                léo đánh lừa người khác để giành chiến thắng.
                <br />
                Trò này chúng tớ chơi online nên là sau khi chơi ma sói chưa có
                đã thì chúng mình sẽ tìm nhau trên này.
              </p>
            </div>
          </div>
          <div className="block01__img" data-aos="fade-up" data-aos-delay="100">
            <Image
              src="/images/ngoo_vit.jpg"
              width={1920}
              height={1201}
              alt="NGOO"
            />
          </div>
        </div>
        <div className="block01">
          <div className="block01__content">
            <h3 className="block01__title" data-aos="fade-up">
              Tiệc tất niên &<br />
              tiệc tân niên
            </h3>
            <div data-aos="fade-up">
              <p>
                Đây là những sự kiện được mong chờ nhất trong năm của NGOO.
                <br />
                Được tổ chức vào cuối năm, đây là dịp để nhìn lại hành trình
                hoạt động, chia sẻ kỷ niệm và thành tích, tổng kết và định hướng
                cho năm mới. Hoặc đơn giản là chúng tớ muốn &quot;giải
                khát&quot; thì gặp nhau thôi.
              </p>
            </div>
          </div>
          <div className="block01__img" data-aos="fade-up" data-aos-delay="100">
            <Image
              src="/images/ngoo_nhau.jpg"
              width={1920}
              height={1201}
              alt="NGOO"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default EventSection
