import { headers } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"
import { auth } from "./utils/auth/auth"

const authRoutes = ["/login", "/signup"]

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  // THIS IS NOT SECURE!
  // This is the recommended approach to optimistically redirect users
  // We recommend handling auth checks in each page/route
  if (!(session || authRoutes.includes(request.nextUrl.pathname))) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (session && authRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  runtime: "nodejs",
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|logos).*)", "/(protected)(.*)"],
}
