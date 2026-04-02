import { Suspense } from "react"
import { GoogleAnalytics } from "@next/third-parties/google"
import clsx from "clsx"
import AuthProvider from "@/context/AuthProvider"
import AnalyticsTracker from "@/components/AnalyticsTracker"
import { ModalProvider } from "@/components/ModalProvider"
import NavigationProgress from "@/components/NavigationProgress"
import "swiper/css"
import "swiper/css/navigation"
import "./styles/globals.scss"
import "nprogress/nprogress.css"
import { merriweather } from "@/lib/fonts"
import AOSProvider from "@/components/AOSProvider"
import ProviderMUI from "@/components/ProviderMUI"

// import ScrollToTop from "@/components/ScrollToTop"
// import ToastProvider from "@/components/ToastProvider"
// import TopLoader from "@/components/TopLoader"
// import PageTransitionWrapper from "@/components/PageTransitionWrapper"
// import "swiper/css/pagination"
// import "swiper/css/scrollbar"

const TITLE =
  "NGOO – Nhóm Cầu Lông Lớn Thứ 2 Thủ Dầu Một, Cộng Đồng Tập Luyện Năng Động"
const DESCRIPTION =
  "Tham gia NGOO – nhóm cầu lông lớn thứ 2 Thủ Dầu Một. Luyện tập Thứ 2-4-6 từ 17:30 – 19:30, kết nối đam mê cầu lông, nâng cao kỹ năng và trải nghiệm cộng đồng thân thiện."
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
    default: TITLE,
  },
  description: DESCRIPTION,
  keywords: KEYWS,
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        url: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
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
    title: TITLE,
    description: DESCRIPTION,
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
    <html lang="vi">
      <body
        className={clsx(`${merriweather.className} ${merriweather.variable}`)}
      >
        {/* <TopLoader /> */}
        <NavigationProgress />
        <AuthProvider>
          <Suspense fallback={null}>
            <AnalyticsTracker />
          </Suspense>
          <ProviderMUI>
            <ModalProvider>
              <AOSProvider>{children}</AOSProvider>
            </ModalProvider>
          </ProviderMUI>
          {/* <PageTransitionWrapper>{children}</PageTransitionWrapper> */}
        </AuthProvider>
      </body>

      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
    </html>
  )
}
