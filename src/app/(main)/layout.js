import ScrollToTop from "@/components/home/ScrollToTop"

export default function MainLayout({ children, header, footer }) {
  return (
    <>
      {header}
      <main className="mainhome">
        <div className="bg-global-01" />
        <div className="bg-global-02" />
        {children}
      </main>
      {footer}
      <ScrollToTop />
    </>
  )
}
