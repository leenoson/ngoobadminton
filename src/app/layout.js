import "./globals.css"
import Navbar from "@/components/Navbar";
import AuthProvider from "@/context/AuthProvider";
import { GoogleAnalytics } from "@next/third-parties/google"
import AnalyticsTracker from "@/components/AnalyticsTracker"
import { Suspense } from "react"

const TITLE = "NGOO BADMINTON"
const KEYWS = ["ngoobadminton", "ngoo", "badminton", "san cau long Thang Loi", "Thang Loi", "nhom cau long", "cau long newbie", "cau long", "san cau long", "ren luyen cau long"]
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: {
    template: `%s | ${TITLE}`,
    default: `${TITLE} - Nhóm cầu lông lớn thứ 2 Thủ Dầu Một`
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
    images: {
      url: "/opg.png",
      widht: 1200,
      height: 630,
      alt: TITLE
    },
    phoneNumbers: "0352171104",
    emails: "leenoson93@gmail.com",
    countryName: "Việt Nam"
  },
  metadateBase: new URL(BASE_URL),
  alternates: {
    canonical: BASE_URL
  },
  twitter: {
    title: `${TITLE} - Nhóm cầu lông lớn thứ 2 Thủ Dầu Một`,
  },
  authors: [
    { name: "NGOO team" }
  ],
  verification: {
    google: "2Q9QH2IBDFj1e383A6H3C2jBFZlJU6DPe1nWbknXBlI"
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />

          <main className="max-w-6xl mx-auto">
            <Suspense fallback={null}>
              <AnalyticsTracker />
            </Suspense>

            {children}
          </main>

        </AuthProvider>
      </body>

      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
    </html>
  );
}