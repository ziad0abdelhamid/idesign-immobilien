import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { secret } = await req.json();

  if (secret === process.env.DASHBOARD_SECRET) {
    const response = NextResponse.json({ success: true });
    response.cookies.set({
      name: "dashboard_secret",
      value: secret,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60, // 1 hour
    });
    return response;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
