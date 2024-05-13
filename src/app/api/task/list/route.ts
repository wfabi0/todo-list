import { getTasks } from "@/modules/tasks/tasks-actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const workspaceId = searchParams.get("query");
  if (!workspaceId || workspaceId.length < 0) {
    return NextResponse.json(
      { message: "Missing query parameter: workspaceId" },
      { status: 400 }
    );
  }
  const { tasks, message, status } = await getTasks(workspaceId);
  return NextResponse.json({ message, workspaceId, tasks }, { status });
}
