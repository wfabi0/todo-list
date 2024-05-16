import AuthServices from "@/modules/auth/services/auth-services";
import UserService, { EditUserValues } from "@/modules/user/user-service";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  const id = decodeURI(userId);
  const formData: EditUserValues = await request.json();
  if (id !== formData.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const userDetails = await AuthServices.userDetails();
  if (userDetails.id !== id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { message, status } = await UserService.editUser(formData);
  return NextResponse.json({ message }, { status });
}
