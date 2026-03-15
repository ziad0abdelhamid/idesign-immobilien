import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SUPPORTED_LOCALES = ["de", "en"];
const DEFAULT_LOCALE = "de";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Redirect /ar to /de
  if (pathname.startsWith("/ar/") || pathname === "/ar") {
    const redirectPath = pathname.replace(/^\/ar/, "/de");
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  // Check if pathname already has a locale
  const pathnameHasLocale = SUPPORTED_LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) {
    for (const locale of SUPPORTED_LOCALES) {
      if (pathname === `/${locale}/admin`) {
        return NextResponse.redirect(
          new URL(`/${locale}/admin/login`, request.url),
        );
      }
    }
    return NextResponse.next();
  }
  // Redirect root to default locale
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, request.url));
  }

  // Redirect paths without locale to default locale
  return NextResponse.redirect(
    new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url),
  );
}

export const config = {
  matcher: [
    // Match all paths except static files and API routes
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.mp4|api).*)",
  ],
};
