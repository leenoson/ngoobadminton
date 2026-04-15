import { Merriweather, Inter, Lexend } from "next/font/google"

export const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
})

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
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
