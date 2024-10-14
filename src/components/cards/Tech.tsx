import React from "react";
import Icon from "@/components/Icon";
import Link from "next/link";

export default function Tech({
  tech,
}: {
  tech: {
    title: string;
    href: string;
    external: boolean;
    icon: string;
    backgroundColor: string;
  };
}) {
  return (
    <Link
      href={tech.href}
      target="_blank"
      className="flex h-12 w-full cursor-pointer flex-row items-center gap-2 rounded-lg border px-2 text-sm drop-shadow-xl transition-colors duration-300 dark:bg-primary dark:hover:bg-primary/70 xl:text-base"
    >
      <div
        style={{
          backgroundColor: tech.backgroundColor,
        }}
        className="flex size-8 items-center justify-center rounded-sm p-1"
      >
        <Icon icon={tech.icon} className="size-5 rounded-[4px]" />
      </div>
      <span>{tech.title}</span>
    </Link>
  );
}
