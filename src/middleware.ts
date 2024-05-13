import { NextRequest, NextResponse } from "next/server";
import AuthServices from "./modules/auth/services/auth-services";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const session = await AuthServices.isSessionValid();
  if (!session) {
    const isAPIRoute = pathname.startsWith("/api");
    if (isAPIRoute) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*"],
};
