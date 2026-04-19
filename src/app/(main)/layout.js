import ScrollToTop from "@/components/home/ScrollToTop"
import AOSProvider from "@/components/animations/AOSProvider"

export default function MainLayout({ children, header, footer }) {
  return (
    <AOSProvider>
      {header}
      <main className="mainhome">
        <div className="bg-global-01" />
        <div className="bg-global-02" />
        {children}
      </main>
      {footer}
      <ScrollToTop />
    </AOSProvider>
  )
}
