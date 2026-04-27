import TopAttendance from "@/components/home/TopAttendance"
import ContactSection from "@/components/home/ContactSection"
import AboutSection from "@/components/home/AboutSection"
import EventSection from "@/components/home/EventSection"
import BannerParallax from "@/components/home/BannerParallax"
import GallerySection from "@/components/home/GallerySection"
// import MemberSection from "@/components/MemberSection"

export default async function Home() {
  return (
    <>
      <BannerParallax image="/images/hero.jpg" />
      <div className="main-content">
        {/* <MemberSection /> */}

        <GallerySection />

        <AboutSection />

        <EventSection />

        <TopAttendance />

        <ContactSection />
      </div>
    </>
  )
}
