"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { LucideMoon } from "lucide-react";
import Link from "next/link";
import { CommandMenu } from "@/components/CommandMenu";
import { usePathname } from "next/navigation";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <div className="mx-auto mt-8 flex w-full max-w-5xl items-center justify-between rounded-lg border bg-card px-5 py-2.5 drop-shadow-2xl">
      <div className="transition duration-300">
        <Link
          className={cn(pathname !== "/" ? "text-muted" : "dark:text-white")}
          href="/"
        >
          tuna.one
        </Link>
        <span
          className={cn(
            "transition-opacity duration-300",
            pathname === "/" && "opacity-0",
          )}
        >
          /{pathname.split("/")[1]}
        </span>
      </div>
      <div className="flex flex-row gap-2">
        <ThemeSwitcher />
      </div>
    </div>
  );
}
