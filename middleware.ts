import { ACCESS_COOKIE, isValidAccessToken, safeRedirectPath } from "@/lib/auth";
import { NextResponse, type NextRequest } from "next/server";

function getRequestUrl(request: NextRequest): URL {
  const proto = request.headers.get("x-forwarded-proto") || request.nextUrl.protocol.slice(0, -1);
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  if (!host) return request.nextUrl;
  return new URL(`${proto}://${host}${request.nextUrl.pathname}${request.nextUrl.search}`);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(ACCESS_COOKIE)?.value;
  const authenticated = await isValidAccessToken(token);

  if (pathname === "/login" || pathname === "/api/login") {
    if (authenticated && request.method === "GET") {
      const next = safeRedirectPath(request.nextUrl.searchParams.get("next"));
      return withSecurityHeaders(NextResponse.redirect(new URL(next, getRequestUrl(request))));
    }

    return withSecurityHeaders(NextResponse.next());
  }

  if (authenticated) {
    return withSecurityHeaders(NextResponse.next());
  }

  const loginUrl = new URL("/login", getRequestUrl(request));
  const next = `${pathname}${request.nextUrl.search}`;
  if (next && next !== "/") {
    loginUrl.searchParams.set("next", next);
  }

  return withSecurityHeaders(NextResponse.redirect(loginUrl));
}

function withSecurityHeaders(response: NextResponse) {
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
