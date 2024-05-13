import { editTask } from "@/modules/tasks/tasks-actions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { task, message, status } = await editTask(body);
  return NextResponse.json({ message }, { status });
}
