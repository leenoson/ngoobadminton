import "./globals.css"
import Navbar from "@/components/Navbar";
import AuthProvider from "@/context/AuthProvider";
import { GoogleAnalytics } from "@next/third-parties/google"
import AnalyticsTracker from "@/components/AnalyticsTracker"

const TITLE = "N G O O B A D M I N T O N"
const NAME = "NGOO Badminton"
const KEYWS = ["ngoobadminton", "ngoo", "badminton", "san cau long Thang Loi", "Thang Loi"]
const URL = "https://ngoobadminton.vercel.app"

export const metadata = {
  title: TITLE,
  description: `Đơn giản chúng tôi là ${TITLE}`,
  keywords: KEYWS,
  authors: [
    { name: "NGOO team" }
  ],
  openGraph: {
    title: NAME,
    description: "Giới thiệu về nhóm cầu lông lớn thứ 2 Thủ Dầu Một",
    type: "website",
    locale: "vi_VN",
    siteName: NAME,
  },
  alternates: {
    canonical: URL
  },
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
            <AnalyticsTracker />
            {children}
          </main>

        </AuthProvider>
      </body>

      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
    </html>
  );
}