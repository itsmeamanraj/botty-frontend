import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { AuthMeResponse } from "./lib/auth-types";
import {
  getAuthRedirect,
  isProtectedPath,
  resolveRedirectPath,
} from "./lib/redirect";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

async function fetchAuthMe(cookie: string): Promise<AuthMeResponse | null> {
  try {
    const res = await fetch(`${API_URL}/api/v1/auth/me`, {
      headers: { cookie },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (!json.success) return null;
    return json.data as AuthMeResponse;
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    /\.[^/]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  const cookie = request.headers.get("cookie") ?? "";
  const isProtected = isProtectedPath(pathname);
  const needsSession =
    isProtected || pathname === "/login" || pathname === "/verify-email";

  if (!needsSession) {
    return NextResponse.next();
  }

  const me = cookie ? await fetchAuthMe(cookie) : null;

  if (isProtected && !me) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (me) {
    const redirectTo = getAuthRedirect(pathname, me.nextStep);
    if (redirectTo) {
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }

    if (pathname === "/login") {
      const dest = resolveRedirectPath(me.nextStep);
      if (dest !== "/login") {
        return NextResponse.redirect(new URL(dest, request.url));
      }
    }

    if (pathname === "/verify-email" && me.nextStep !== "verify_email") {
      return NextResponse.redirect(
        new URL(resolveRedirectPath(me.nextStep), request.url),
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
