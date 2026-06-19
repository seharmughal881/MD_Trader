import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE = "md_session";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Login page is always reachable.
  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const expected = process.env.AUTH_SECRET ?? "dev-secret";

  if (token && token === expected) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("from", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*"],
};
