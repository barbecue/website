import React from "react";
import { ChevronRight } from "lucide-react";
import Icon from "@/components/Icon";
import Link from "next/link";

export default function Social({
  social,
}: {
  social: {
    name: string;
    url: string;
    icon: string;
    sys: {
      publishedAt: string;
    };
  };
}) {
  return (
    <Link
      href={social.url}
      target="_blank"
      className="group flex h-12 w-full cursor-pointer items-center justify-between rounded-lg border px-5 drop-shadow-xl transition-colors duration-300 hover:bg-secondary/80 dark:bg-primary dark:hover:bg-primary/70"
    >
      <div className="flex flex-row items-center gap-2">
        <Icon icon={social.icon} className="size-5" />
        <span>{social.name}</span>
      </div>
      <ChevronRight className="size-5 text-muted/60" />
    </Link>
  );
}
