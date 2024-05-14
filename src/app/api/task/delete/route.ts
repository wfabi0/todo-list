import { deleteTask } from "@/modules/tasks/tasks-actions";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  const body = await request.json();
  const { message, status } = await deleteTask(body.id);
  return NextResponse.json({ message }, { status });
}
