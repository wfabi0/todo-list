import AuthServices from "@/modules/auth/services/auth-services";
import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  AuthServices.destroySession();
  return NextResponse.redirect(new URL("/", req.url));
}
