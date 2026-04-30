import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const AUTH_ROUTES = [
  "/forgot-password",
  "/login",
  "/register",
  "/reset-password",
  "/verify-email",
];
const PROTECTED_ROUTES = [
  "/dashboard",
  "/reviews",
  "/travel-plans",
  "/users",
  "/profile",
  "/change-password",
  "/my-travel-plans",
  "/subscription",
];

export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Redirect logged-in users away from auth routes
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  if (isAuthRoute) {
    const accessToken = req.cookies.get("accessToken")?.value;
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (accessToken || refreshToken) {
      // User is logged in, redirect to dashboard
      const url = req.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }

    // User is not logged in, allow access to auth routes
    return NextResponse.next();
  }

  // Check if route requires authentication
  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  if (!isProtected) return NextResponse.next();

  // For protected routes, check if user is authenticated
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (!accessToken && !refreshToken) {
    // User is not authenticated, redirect to login
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(url);
  }

  // User is authenticated, allow access to protected routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/reviews/:path*",
    "/travel-plans/:path*",
    "/users/:path*",
    "/profile/:path*",
    "/change-password/:path*",
    "/my-travel-plans/:path*",
    "/subscription/:path*",
    "/forgot-password/:path*",
    "/login/:path*",
    "/register/:path*",
    "/reset-password/:path*",
    "/verify-email/:path*",
  ],
};
