import WorkspaceServices from "@/modules/workspace/workspace-services";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { workspace } = await WorkspaceServices.getWorkspace();
  if (workspace) {
    return NextResponse.json(
      { message: "Workspace found", workspace },
      { status: workspace ? 200 : 401 }
    );
  } else {
    return NextResponse.json(
      { message: "Workspace not found" },
      { status: workspace ? 200 : 401 }
    );
  }
}
