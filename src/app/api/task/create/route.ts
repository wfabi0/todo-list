import { createTask } from "@/modules/tasks/tasks-actions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { task, message, status } = await createTask(body);
  return NextResponse.json({ message }, { status });
}
