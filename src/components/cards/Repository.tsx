import React from "react";
import Link from "next/link";
import { FaBoxArchive, FaCodeFork, FaStar } from "react-icons/fa6";
import { ChevronRight } from "lucide-react";
import { FaFileArchive } from "react-icons/fa";

export default function Repository({
  repo,
}: {
  repo: {
    html_url: string;
    name: string;
    description: string;
    stargazers_count: string;
    forks: number;
    archived: boolean;
  };
}) {
  return (
    <Link
      href={repo.html_url}
      target="_blank"
      className="flex h-16 w-full cursor-pointer items-center justify-between rounded-lg border px-2 drop-shadow-xl transition-colors duration-300 hover:bg-secondary/80 dark:bg-primary dark:hover:bg-primary/70"
    >
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-col">
          <div className="flex w-full flex-row items-center gap-1 font-semibold">
            <div className="flex flex-row items-center text-sm text-muted">
              barbecue
              <span className="text-black dark:text-white">/{repo.name}</span>
            </div>
            <div className="flex flex-row items-center gap-1 rounded-full border border-zinc-600/40 bg-accent px-2 text-[12px] text-muted">
              <FaStar className="-mt-0.5 size-3" />
              <span>{repo.stargazers_count}</span>
            </div>
            {repo.forks > 0 && (
              <div className="flex flex-row items-center gap-1 rounded-full border border-zinc-600/40 bg-accent px-2 text-[12px] text-muted">
                <FaCodeFork className="size-3" />
                <span>{repo.forks}</span>
              </div>
            )}
            {repo.archived && (
              <span className="hidden flex-row items-center gap-1 rounded-full border border-zinc-600/40 bg-accent px-2 text-[12px] text-muted xl:flex">
                <FaFileArchive className="size-3" />
                ARCHIVED
              </span>
            )}
          </div>
          <span className="line-clamp-1 text-xs text-muted">
            {repo.description}
          </span>
        </div>
      </div>
      <ChevronRight className="size-5 text-muted/60" />
    </Link>
  );
}
