import "./styles/globals.scss"
import Navbar from "@/components/Navbar"
import AuthProvider from "@/context/AuthProvider"
import { GoogleAnalytics } from "@next/third-parties/google"
import AnalyticsTracker from "@/components/AnalyticsTracker"
import { Suspense } from "react"
import BootstrapClient from "@/components/BootstrapClient"

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
  metadateBase: new URL(BASE_URL),
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
      <body>
        <BootstrapClient />
        <AuthProvider>
          <Suspense fallback={null}>
            <AnalyticsTracker />
          </Suspense>

          {children}
        </AuthProvider>
      </body>

      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
    </html>
  )
}
