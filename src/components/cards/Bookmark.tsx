import React from "react";
import moment from "moment/moment";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Bookmark({
  bookmark,
  fullPage,
}: {
  bookmark: {
    link: string;
    title: string;
    created: string;
    note: string;
  };
  fullPage?: boolean;
}) {
  return (
    <Link
      target="_blank"
      href={bookmark.link}
      className="flex h-20 w-full cursor-pointer flex-col items-start justify-center gap-1 rounded-lg border px-2 drop-shadow-xl transition-colors duration-300 hover:bg-secondary/80 dark:bg-primary dark:hover:bg-primary/70 xl:h-16 xl:gap-0"
    >
      <div className="flex w-full items-center justify-between">
        <span className={cn(`text-sm`, !fullPage && "w-52 truncate xl:w-80")}>
          {bookmark.title}
        </span>
        <span className="text-[13px] text-muted">
          {moment(bookmark.created).format("DD/MM/YYYY")}
        </span>
      </div>
      <span className="line-clamp-1 text-xs text-muted">{bookmark.note}</span>
    </Link>
  );
}
