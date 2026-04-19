import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import AdminLayout from "./components/AdminLayout"
import ToastProvider from "@/components/ToastProvider"

export const metadata = {
  title: "Admin",
}

export default async function Layout({ children }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }
  return (
    <AdminLayout>
      {children}
      <ToastProvider />
    </AdminLayout>
  )
}
