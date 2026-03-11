"use client"

import { useEffect, useState, useMemo } from "react"
import { createClient } from "@/lib/supabase/client"

export default function useAuth() {
  const supabase = useMemo(() => createClient(), [])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function getUser() {
      const { data } = await supabase.auth.getUser()
      setUser(data?.user ?? null)
      setLoading(false)
    }

    getUser()

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )
    return () => listener.subscription.unsubscribe()

  }, [supabase])

  return {
    user,
    loading,
    isLoggedIn: !!user
  }

}