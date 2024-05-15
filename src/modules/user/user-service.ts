import prisma from "../database/prisma-service";

async function getUser(paramsUserId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: paramsUserId,
      },
    });
    if (!user) {
      return { message: "User not found", status: 404 };
    }

    const {
      id,
      username,
      userId,
      avatar,
      createdAt,
      role,
      ownedWorkspaces,
      sharedWorkspaces,
    } = user;

    return {
      message: "User found",
      status: 200,
      data: {
        id,
        username,
        userId,
        avatar,
        createdAt,
        role,
        ownedWorkspaces,
        sharedWorkspaces,
      },
    };
  } catch (error) {
    console.error(error);
    return { message: "User not found", status: 404 };
  }
}

const UserService = {
  getUser,
};

export default UserService;
