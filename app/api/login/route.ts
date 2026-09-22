import {
  ACCESS_COOKIE,
  accessCookieOptions,
  createAccessToken,
  getAuthSecret,
  passwordsMatch,
  safeRedirectPath,
} from "@/lib/auth";
import { clearLoginFailures, getLoginLock, recordLoginFailure } from "@/lib/rate-limit";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const form = await request.formData();
  const next = safeRedirectPath(form.get("next"));
  const password = String(form.get("password") ?? "").trim();
  const key = clientKey(request);
  const lock = getLoginLock(key);

  if (lock.locked) {
    return redirectToLogin(request, next, "locked");
  }

  if (!password) {
    return redirectToLogin(request, next, "missing");
  }

  const expected = process.env.SITE_PASSWORD?.trim() ?? "";
  const secret = getAuthSecret();
  if (!expected || !secret) {
    return redirectToLogin(request, next, "config");
  }

  const matched = await passwordsMatch(password, expected, secret);
  if (!matched) {
    recordLoginFailure(key);
    await wait(400);
    return redirectToLogin(request, next, "password");
  }

  clearLoginFailures(key);
  const response = NextResponse.redirect(new URL(next, request.url), 303);
  response.cookies.set(ACCESS_COOKIE, await createAccessToken(secret), accessCookieOptions());
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export function GET(request: Request) {
  return NextResponse.redirect(new URL("/login", request.url), 303);
}

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

function redirectToLogin(request: Request, next: string, error: string) {
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("error", error);
  if (next !== "/") {
    loginUrl.searchParams.set("next", next);
  }
  const response = NextResponse.redirect(loginUrl, 303);
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
