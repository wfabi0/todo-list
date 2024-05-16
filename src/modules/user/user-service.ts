import { ProfileFormValues } from "@/components/settings/desktop/profile/settings-desktop-profile-form";
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
  } catch (error: any) {
    console.error(error.message);
    return { message: "User not found", status: 404 };
  }
}

export interface EditUserValues extends ProfileFormValues {
  email: string;
}

async function editUser(formData: EditUserValues) {
  const { id, username, email, avatar } = formData;
  try {
    const userFind = await prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (!userFind) return { message: "User not found", status: 404 };
    if ((Date.now() - userFind.updatedAt.getTime()) / 1000 < 60) {
      return {
        message: "You can only update your profile once per minute",
        status: 429,
      };
    }

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        username,
        email,
        avatar: avatar.value,
      },
    });

    return {
      message: "User edited",
      status: 200,
      data: JSON.stringify(formData),
    };
  } catch (error: any) {
    console.error(error.message);
    return { message: "Failed to edit user", status: 500 };
  }
}

const UserService = {
  getUser,
  editUser,
};

export default UserService;
