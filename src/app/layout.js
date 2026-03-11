import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Badminton Club",
  description: "Badminton group web app"
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>

        <Navbar />

        <main className="max-w-6xl mx-auto">
          {children}
        </main>

      </body>
    </html>
  );
}