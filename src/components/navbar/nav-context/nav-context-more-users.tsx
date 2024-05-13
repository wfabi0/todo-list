"use client";

import { Workspace } from "@prisma/client";

type NavContextMoreUsersProps = {
  workspace: Workspace;
};

export default function NavContextMoreUsers({
  workspace,
}: NavContextMoreUsersProps) {
  return (
    <button onClick={() => {}}>
      <div className="flex rounded-full w-7 h-7 bg-opacity-50 items-center text-center justify-center bg-gray-300 p-2.5 text-[0.85rem] text-gray-700 hover:bg-gray-400 hover:text-white transition duration-300 ease-in-out">
        +{workspace.membersId.length - 4}
      </div>
    </button>
  );
}
