import UserService from "@/modules/user/user-service";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  const id = decodeURI(userId);
  const { message, status, data } = await UserService.getUser(id);
  if (data) {
    return NextResponse.json({ message, data }, { status });
  }
  return NextResponse.json({ message }, { status });
}
