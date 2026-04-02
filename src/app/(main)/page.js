import TopAttendance from "@/components/TopAttendance"
import BannerParallax from "@/components/BannerParallax"
import SectionContact from "@/components/SectionContact"
import AboutSection from "@/components/AboutSection"
import EventSection from "@/components/EventSection"
// import MemberSection from "@/components/MemberSection"

export default async function Home() {
  return (
    <>
      <BannerParallax image="/images/common/hero.jpg" />
      <div className="main-content">
        {/* <MemberSection /> */}

        <AboutSection />

        <EventSection />

        <TopAttendance />

        <SectionContact />
      </div>
    </>
  )
}
