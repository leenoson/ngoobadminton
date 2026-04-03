import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"

const ENABLE_COMING_SOON = true

export async function middleware(request) {
  const response = NextResponse.next()
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/icons") ||
    pathname.startsWith("/assets") ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|ico)$/)
  ) {
    return NextResponse.next()
  }

  if (!ENABLE_COMING_SOON && pathname === "/coming-soon") {
    const url = request.nextUrl.clone()
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  if (ENABLE_COMING_SOON) {
    if (pathname === "/coming-soon") {
      return NextResponse.next()
    }

    const url = request.nextUrl.clone()
    url.pathname = "/coming-soon"

    return NextResponse.redirect(url)
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get: (name) => request.cookies.get(name)?.value,
        set: (name, value, options) =>
          response.cookies.set({ name, value, ...options }),
        remove: (name, options) =>
          response.cookies.set({ name, value: "", ...options }),
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname

  if (!user && path.startsWith("/admin")) {
    const segments = pathname.split("/").filter(Boolean)

    if (segments[0] === "admin") {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  if (user && path === "/login") {
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  return response
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|images|.*\\..*).*)"],
}
