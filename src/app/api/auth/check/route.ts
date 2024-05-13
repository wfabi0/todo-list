import AuthServices from "@/modules/auth/services/auth-services";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const userDetails = await AuthServices.userDetails();
  if (userDetails) {
    return NextResponse.json(
      {
        message: userDetails ? "Authenticated" : "Not authenticated",
        userDetails: userDetails,
      },
      { status: userDetails ? 200 : 401 }
    );
  } else {
    return NextResponse.json(
      {
        message: userDetails ? "Authenticated" : "Not authenticated",
      },
      { status: userDetails ? 200 : 401 }
    );
  }
}
