import { createTask } from "@/modules/tasks/tasks-actions";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { task, message, status } = await createTask(body);
  revalidateTag("tasks");
  return NextResponse.json({ message }, { status });
}

export async function GET(request: Request) {
  return NextResponse.redirect(new URL("/", request.url), { status: 301 });
}
