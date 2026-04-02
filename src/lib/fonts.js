import { Merriweather, Inter } from "next/font/google"

export const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-merriweather",
})

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

// import localFont from "next/font/local";

// export const myFont = localFont({
//   src: [
//     {
//       path: "./fonts/MyFont-Regular.woff2",
//       weight: "400",
//     },
//     {
//       path: "./fonts/MyFont-Bold.woff2",
//       weight: "700",
//     },
//   ],
//   variable: "--font-myfont",
// });
