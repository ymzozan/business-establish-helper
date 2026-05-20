import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  // Panel routes require authentication
  if (pathname.startsWith("/panel")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/giris", req.url));
    }
  }

  // Auth pages redirect to panel if already logged in
  if (pathname.startsWith("/giris") || pathname.startsWith("/kayit")) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/panel", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/panel/:path*", "/giris", "/kayit"],
};
