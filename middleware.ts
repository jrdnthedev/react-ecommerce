import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/products", "/cart"];
const publicRoutes = ["/login", "/signup"];

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const token = req.cookies.get("token")?.value;

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/signin", req.nextUrl));
  }

  if (isPublicRoute && token && !req.nextUrl.pathname.startsWith("/products")) {
    return NextResponse.redirect(new URL("/products", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
