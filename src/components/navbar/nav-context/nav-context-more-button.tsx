"use client";

import { MdMoreHoriz } from "react-icons/md";

export default function NavContextMoreButton() {
  return (
    <button
      onClick={() => {}}
      className="flex items-center justify-center text-center h-7 w-7 transition duration-300 ease-in-out hover:text-purple-500"
    >
      <MdMoreHoriz className="flex h-7 w-7" />
    </button>
  );
}
