import "./globals.css"
import Navbar from "@/components/Navbar";
import AuthProvider from "@/context/AuthProvider";

const title = "N G O O B A D M I N T O N"

export const metadata = {
  title: title,
  description: `Đơn giản chúng tôi là ${title}`
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />

          <main className="max-w-6xl mx-auto">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}