"use client";

import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import NavContext from "./nav-context";
import NavIcon from "./nav-icon";
import NavTitle from "./nav-title";

type NavbarProps = {
  data?: { workspace: any; user: any };
  isLoading: boolean;
};

export default function Navbar({ isLoading, data }: NavbarProps) {
  return (
    <div className="flex p-6 space-x-14 items-center justify-normal max-md:justify-between">
      {isLoading ? (
        <Link href={"/auth/login"} className="rounded-full">
          <Skeleton className="h-12 w-12 rounded-full" />
        </Link>
      ) : (
        <NavIcon />
      )}
      <NavTitle />
      {isLoading ? (
        <div className="flex w-full max-w-[60%] rounded-2xl py-2.5 px-3">
          <Skeleton className="h-12 w-1/2 rounded-2xl" />
        </div>
      ) : (
        <NavContext data={data} isLoadingData={isLoading} />
      )}
    </div>
  );
}
