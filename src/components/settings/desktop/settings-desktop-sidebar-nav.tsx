"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight, Home, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SettingsDesktopSidebarNavProps = {
  items: {
    title: string;
    href: string;
  }[];
};

export default function SettingsDesktopSidebarNav({
  items,
}: SettingsDesktopSidebarNavProps) {
  const pathname = usePathname();
  return (
    <nav className={`flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1`}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start space-x-0.5"
          )}
        >
          <ChevronRight className="w-4 h-4" />
          <span>{item.title}</span>
        </Link>
      ))}
      <Link
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "justify-start text-purple-500 hover:text-purple-700 hover:underline hover:bg-transparent space-x-1 "
        )}
        href="/"
      >
        <Home className="w-4 h-4" /> <span>Home</span>
      </Link>
      <Link
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "justify-start text-red-500 hover:text-red-700 hover:underline hover:bg-transparent space-x-1 "
        )}
        href="/api/auth/logout"
      >
        <LogOut className="w-4 h-4" /> <span>Leave</span>
      </Link>
    </nav>
  );
}
