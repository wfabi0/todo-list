import { cookies } from "next/headers";
import AuthServices from "../auth/services/auth-services";
import prisma from "../database/prisma-service";

async function getWorkspace() {
  const workspaceCookie = cookies().get("workspace");
  if (!workspaceCookie) {
    const workspace = await prisma.workspace.create({
      data: {
        name: "My Workspace",
        description: "My first workspace",
        creatorId: (await AuthServices.userDetails()).id as string,
      },
    });
    cookies().set("workspace", workspace.id, {
      maxAge: 30 * 365 * 24 * 60 * 60 * 1000,
    });
    return { workspace };
  } else {
    const workspace = await prisma.workspace.findUnique({
      where: {
        id: workspaceCookie.value,
      },
    });
    return { workspace };
  }
}

const WorkspaceServices = {
  getWorkspace,
};

export default WorkspaceServices;
