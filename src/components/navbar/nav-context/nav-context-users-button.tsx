"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SpinUtil from "@/components/utils/spin";

type NavContextUserButtonProps = {
  user: any;
};

export default function NavContextUserButton({
  user,
}: NavContextUserButtonProps) {
  return (
    <button
      onClick={() => {}}
      className="rounded-full border-[1.5px] border-collapse border-transparent hover:border-purple-600 hover:scale-[1.1] transition duration-300 ease-in-out"
    >
      <Avatar className="w-7 h-7 shadow-lg">
        <AvatarImage
          src={user.avatar || ""}
          title={user.username}
          alt={user.username}
        />
        <AvatarFallback>
          <SpinUtil />
        </AvatarFallback>
      </Avatar>
    </button>
  );
}
