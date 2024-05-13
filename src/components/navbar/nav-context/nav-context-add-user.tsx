"use client";

import { HiOutlineUserAdd } from "react-icons/hi";

export default function NavContextAddUser() {
  return (
    <button onClick={() => {}}>
      <div className="flex w-6 h-6 items-start justify-center text-center text-purple-800 hover:text-violet-400 transition duration-300 ease-in-out">
        <HiOutlineUserAdd className="flex w-6 h-6" />
      </div>
    </button>
  );
}
