"use client";

import { FaInfo } from "react-icons/fa";

export default function NavContextInfoButton() {
  return (
    <button
      onClick={() => {}}
      className="flex h-7 items-center justify-center text-center transition duration-300 ease-in-out hover:text-purple-500"
    >
      <FaInfo className="flex w-4 h-4" />
      Info
    </button>
  );
}
