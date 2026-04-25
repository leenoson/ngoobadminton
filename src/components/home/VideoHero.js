function VideoHero() {
  const URL = process.env.NEXT_PUBLIC_BASE_URL

  return (
    <section className="video">
      <figure>
        <video
          width="1280"
          height="720"
          controls
          preload="metadata"
          poster="/images/video-thumbnail.jpg"
        >
          <source src="/video/ngoo_video_03.mp4" type="video/mp4" />
          Trình duyệt của bạn không hỗ trợ video.
        </video>

        <figcaption className="text-center my-(--spac-xs)">
          Khoảnh khắc sinh hoạt ngoài giờ của team NGOO Badminton
        </figcaption>
      </figure>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: "Khoảnh khắc sinh hoạt ngoài giờ của team",
            description:
              "Video ghi lại những hoạt động sinh hoạt ngoài giờ của team.",
            thumbnailUrl: `${URL}/images/video-thumbnail.jpg`,
            uploadDate: "2024-01-01",
            contentUrl: `${URL}/video/ngoo_video_03.mp4`,
            embedUrl: `${URL}/video/ngoo_video_03.mp4`,
          }),
        }}
      />
    </section>
  )
}

export default VideoHero
