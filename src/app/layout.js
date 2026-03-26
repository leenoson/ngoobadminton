import { Suspense } from "react"
import { GoogleAnalytics } from "@next/third-parties/google"
import { Montserrat } from "next/font/google"
import clsx from "clsx"
import AuthProvider from "@/context/AuthProvider"
import AnalyticsTracker from "@/components/AnalyticsTracker"
import ScrollToTop from "@/components/ScrollToTop"
import { ModalProvider } from "@/components/ModalProvider"
import ToastProvider from "@/components/ToastProvider"
import NavigationProgress from "@/components/NavigationProgress"
import "swiper/css"
import "swiper/css/navigation"
import "./styles/globals.scss"
import "nprogress/nprogress.css"
// import TopLoader from "@/components/TopLoader"
// import PageTransitionWrapper from "@/components/PageTransitionWrapper"
// import "swiper/css/pagination"
// import "swiper/css/scrollbar"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal"],
  variable: "--font-montserrat",
})

const TITLE = "NGOO BADMINTON"
const KEYWS = [
  "ngoobadminton",
  "ngoo",
  "badminton",
  "san cau long Thang Loi",
  "Thang Loi",
  "nhom cau long",
  "cau long newbie",
  "cau long",
  "san cau long",
  "ren luyen cau long",
  "nhóm cầu lông newbie",
  "Thủ Dầu Một",
  "chơi cầu lông tại Bình Dương",
  "chơi cầu lông tại Thủ Dầu Một",
  "giao lưu cầu lông",
  "ngô badminton",
  "ngoo cầu lông",
  "ngô cầu lông",
  "cầu lông ngoo",
  "cầu lông newbie",
  "sân cầu lông Thắng Lợi",
  "cầu lông ma sói",
  "cầu lông chơi ma sói",
  "chơi cầu lông",
  "chơi cl",
  "chơi cl newbie",
  "nhóm cầu lông chấp nhận newbie",
  "luyện tập cầu lông",
  "luyện tập cl",
]
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: {
    template: `%s | ${TITLE}`,
    default: `${TITLE} - Nhóm cầu lông lớn thứ 2 Thủ Dầu Một`,
  },
  description: `${TITLE} là CLB cầu lông dành cho mọi trình độ, từ người mới đến nâng cao. Tham gia ngay để rèn luyện sức khỏe, giao lưu và phát triển kỹ năng`,
  keywords: KEYWS,
  openGraph: {
    title: `${TITLE} - Nhóm cầu lông lớn thứ 2 Thủ Dầu Một`,
    description: `${TITLE} là CLB cầu lông dành cho mọi trình độ, từ người mới đến nâng cao. Tham gia ngay để rèn luyện sức khỏe, giao lưu và phát triển kỹ năng`,
    type: "website",
    locale: "vi_VN",
    siteName: TITLE,
    url: BASE_URL,
    images: [
      {
        url: "/opg.png",
        width: 1200,
        height: 630,
        alt: TITLE,
      },
    ],
    phoneNumbers: "0352171104",
    emails: "leenoson93@gmail.com",
    countryName: "Việt Nam",
  },
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: BASE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} - Nhóm cầu lông lớn thứ 2 Thủ Dầu Một`,
    description: `${TITLE} là CLB cầu lông dành cho mọi trình độ, từ người mới đến nâng cao. Tham gia ngay để rèn luyện sức khỏe, giao lưu và phát triển kỹ năng`,
    images: ["/opg.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: "NGOO team" }],
  creator: "NGOO",
  publisher: "NGOO",
  verification: {
    google: "2Q9QH2IBDFj1e383A6H3C2jBFZlJU6DPe1nWbknXBlI",
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={clsx(`${montserrat.className}`)}>
        {/* <TopLoader /> */}
        <NavigationProgress />
        <AuthProvider>
          <Suspense fallback={null}>
            <AnalyticsTracker />
          </Suspense>
          <ModalProvider>{children}</ModalProvider>
          <ToastProvider />
          {/* <PageTransitionWrapper>{children}</PageTransitionWrapper> */}
        </AuthProvider>
        <ScrollToTop />
      </body>

      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
    </html>
  )
}
