import ImgAvatar from "../ImgAvatar"

function ContactSection() {
  return (
    <section id="contact">
      <div className="container">
        <div className="imgtitle" data-aos="fade-up">
          <ImgAvatar
            src="/images/common/contact.svg"
            alt="NGOO-Nhóm Cầu Lông Lớn Thứ 2 Thủ Dầu Một"
            widthprop={640}
            heightprop={640}
          />
        </div>
        <h2 className="title02" data-aos="fade-up">
          Cầm lấy NGOO và rời xa sự cô đơn
        </h2>
        <div className="block02">
          <div className="block02__content">
            <div data-aos="fade-up">
              <p>
                Nếu bạn đang tìm kiếm một nhóm cầu lông lớn để vừa luyện tập,
                vừa tham gia trò chơi giải trí và có các buổi tiệc giao lưu,{" "}
                <strong>NGOO</strong> chính là lựa chọn lý tưởng.
              </p>
              <p className="mb-2">Điều kiện tham gia là bạn muốn tham gia.</p>
            </div>
            <div className="imgtitle imgtitle--small" data-aos="fade-up">
              <ImgAvatar
                src="/images/common/message.svg"
                alt="NGOO-Nhóm Cầu Lông Lớn Thứ 2 Thủ Dầu Một"
                widthprop={800}
                heightprop={800}
              />
            </div>
            <div data-aos="fade-up">
              <p>
                Sdt(Zalo): <strong>03521xx1xx</strong>
              </p>
              <p>
                Email: <strong>ngoobadminton@cl.com</strong>
              </p>
              <p>
                Địa chỉ:{" "}
                <strong>
                  Sân cầu lông Thắng Lợi - 210 Thích Quảng Đức, Phú Cường, Thủ
                  Dầu Một, Bình Dương.
                </strong>
              </p>
            </div>
          </div>

          <div className="map" data-aos="fade-up">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.814828029157!2d106.66024977577777!3d10.977345355454124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d16e3752f507%3A0xcb356352c4d812d2!2zU8OibiBD4bqndSBMw7RuZyBUaOG6r25nIEzhu6Np!5e0!3m2!1svi!2s!4v1774169945302!5m2!1svi!2s"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
