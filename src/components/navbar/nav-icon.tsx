import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import SpinUtil from "../utils/spin";

export default function NavIcon() {
  return (
    <Link
      href={"/auth/sign-up"}
      className="rounded-full border-2 border-purple-950 hover:border-purple-400 transition duration-300 ease-in-out"
    >
      <Avatar className="h-12 w-12 flex shadow-md">
        <AvatarImage src="https://github.com/shadcn.png" alt="@teste" />
        <AvatarFallback>
          <SpinUtil />
        </AvatarFallback>
      </Avatar>
    </Link>
  );
}
