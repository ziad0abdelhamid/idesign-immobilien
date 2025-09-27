import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (url.pathname === "/dashboard") {
    const secret = req.cookies.get("dashboard_secret")?.value;

    // Allow if cookie exists
    if (secret === process.env.DASHBOARD_SECRET) {
      return NextResponse.next();
    }

    // Otherwise redirect to same page to trigger prompt in client
    url.pathname = "/dashboard";
    return NextResponse.next();
  }

  return NextResponse.next();
}
