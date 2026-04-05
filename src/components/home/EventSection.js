import Image from "next/image"
import ImgAvatar from "../ImgAvatar"

function EventSection() {
  return (
    <section id="event" aria-labelledby="event-title">
      <div className="container">
        <div className="imgtitle" data-aos="fade-up">
          <ImgAvatar
            src="/images/common/event.svg"
            alt=""
            widthprop={640}
            heightprop={640}
            aria-hidden="true"
          />
        </div>
        <h2 id="event-title" className="title02" data-aos="fade-up">
          NGOO<span className="line01">-</span>Các Hoạt Động Đa Dạng
        </h2>
        <ul className="block01s">
          <li className="block01__item">
            <article className="block01">
              <div className="block01__content">
                <header>
                  <h3 className="block01__title" data-aos="fade-up">
                    Chơi cầu lông
                  </h3>
                </header>
                <div data-aos="fade-up">
                  <p className="mb-3">
                    <strong>NGOO</strong> sinh hoạt đều đặn vào mỗi tuần(kể cả
                    ngày lễ Tết):
                  </p>
                  <p className="flex items-center">
                    <Image
                      src="/images/common/calendar.svg"
                      width={100}
                      height={100}
                      alt=""
                      className="icon mr-1"
                      aria-hidden="true"
                    />
                    <span>Hoạt động vào các ngày:</span>
                  </p>
                  <ul className="list01 my-2">
                    <li>Thứ 2</li>
                    <li>Thứ 4</li>
                    <li>Thứ 6</li>
                  </ul>
                  <p className="flex items-center mb-3">
                    <Image
                      src="/images/common/clock.svg"
                      width={100}
                      height={100}
                      alt=""
                      className="icon mr-1"
                      aria-hidden="true"
                    />
                    <span>
                      Thời gian: <time dateTime="17:30">17:30</time>
                      {" – "}
                      <time dateTime="19:30">19:30</time>
                    </span>
                  </p>
                  <p>
                    Lịch sinh hoạt cố định giúp các thành viên duy trì phong độ,
                    nâng cao kỹ năng và tận hưởng những phút giây vui vẻ trong
                    môi trường thân thiện, năng động.
                  </p>
                  <p>
                    Chúng mình luôn công bằng và theo sát mỗi trận cầu của từng
                    thành viên để đảm bảo rằng không ai bị bỏ lại phía sau, trừ
                    khi bạn xứng đáng 🤡.
                  </p>
                </div>
              </div>
              <figure
                className="block01__img"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <Image
                  src="/images/ngoo_bad.jpg"
                  width={1920}
                  height={1201}
                  alt="Các thành viên NGOO đang vui đùa cùng nhau"
                />
                <figcaption className="block01__caption">
                  Hoạt động cầu lông của NGOO
                </figcaption>
              </figure>
            </article>
          </li>
          <li className="block01__item">
            <article className="block01 block01--reverse">
              <div className="block01__content">
                <header>
                  <h3 className="block01__title" data-aos="fade-up">
                    Sinh nhật thành viên
                  </h3>
                </header>
                <p data-aos="fade-up">
                  &ldquo;Sinh nhật thành viên&rdquo; là dịp đặc biệt để mọi
                  người cùng nhau gửi gắm những lời chúc tốt đẹp, chia sẻ niềm
                  vui và tạo nên những kỷ niệm đáng nhớ.
                </p>
                <p data-aos="fade-up">
                  Đây không chỉ là ngày đánh dấu thêm một tuổi mới mà còn là cơ
                  hội để gắn kết tình cảm, lan tỏa sự quan tâm và làm cho mỗi
                  thành viên cảm thấy mình luôn được trân trọng trong tập thể.
                </p>
              </div>
              <figure
                className="block01__img"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <Image
                  src="/images/ngoo_masoi.jpg"
                  width={1920}
                  height={1201}
                  alt="Các thành viên NGOO đang tổ chức sinh nhật cho nhau"
                />
                <figcaption className="block01__caption">
                  Hoạt động sinh nhật của NGOO
                </figcaption>
              </figure>
            </article>
          </li>
          <li className="block01__item">
            <article className="block01">
              <div className="block01__content">
                <header>
                  <h3 className="block01__title" data-aos="fade-up">
                    Cà phê Ma Sói
                  </h3>
                </header>
                <p data-aos="fade-up">
                  Đây là trò chơi mang tính suy luận và giao tiếp cao, giúp mọi
                  người trong nhóm thêm phần kết nối.
                </p>
                <p data-aos="fade-up">
                  Chúng mình thường tập trung tại một quán cafe sau giờ chơi cầu
                  lông đầy căng thẳng, mệt mỏi để cùng nhau suy luận tìm ra
                  &quot;sói&quot;. Mỗi ván chơi đều mang lại tiếng cười và giúp
                  mọi người hiểu nhau hơn.
                </p>
              </div>
              <figure
                className="block01__img"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <Image
                  src="/images/ngoo_masoi.jpg"
                  width={1920}
                  height={1201}
                  alt="Các thành viên NGOO đang chơi ma sói cùng nhau"
                />
                <figcaption className="block01__caption">
                  Chơi ma sói tại quán cafe
                </figcaption>
              </figure>
            </article>
          </li>
          <li className="block01__item">
            <article className="block01 block01--reverse">
              <div className="block01__content">
                <header>
                  <h3 className="block01__title" data-aos="fade-up">
                    Goose Goose Duck
                  </h3>
                </header>
                <p data-aos="fade-up">
                  Là một tựa game suy luận xã hội nhiều người chơi, nơi chúng
                  mình luôn phải phối hợp với đồng đội để hoàn thành nhiệm vụ
                  hoặc khéo léo đánh lừa người khác để giành chiến thắng.
                </p>
                <p data-aos="fade-up">
                  Trò này chúng tớ chơi online nên là sau khi chơi ma sói chưa
                  có đã thì chúng mình sẽ tìm nhau trên này.
                </p>
              </div>
              <figure
                className="block01__img"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <Image
                  src="/images/ngoo_vit.jpg"
                  width={1920}
                  height={1201}
                  alt="Các thành viên NGOO đang chơi goose goose duck cùng nhau"
                />
                <figcaption>Chơi Goose Goose Duck online</figcaption>
              </figure>
            </article>
          </li>
          <li className="block01__item">
            <article className="block01">
              <div className="block01__content">
                <header>
                  <h3 className="block01__title" data-aos="fade-up">
                    Tiệc tùng cùng NGOO
                  </h3>
                </header>
                <p data-aos="fade-up">
                  Tiệc tùng của nhóm được tổ chức quanh năm suốt tháng, đây là
                  dịp để nhìn lại hành trình hoạt động, chia sẻ kỷ niệm và thành
                  tích, tổng kết và định hướng cho năm mới. Hoặc đơn giản là
                  chúng tớ muốn &quot;giải khát&quot; thì gặp nhau thôi.
                </p>
              </div>
              <figure
                className="block01__img"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <Image
                  src="/images/ngoo_nhau.jpg"
                  width={1920}
                  height={1201}
                  alt="Các thành viên NGOO đang giải khát cùng nhau"
                />
                <figcaption>Tiệc tùng của NGOO</figcaption>
              </figure>
            </article>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default EventSection
