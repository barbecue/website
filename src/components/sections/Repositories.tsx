import React from "react";
import axios from "axios";
import Repository from "@/components/cards/Repository";
import { fallbackRepositories } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function Repositories({
  fullPage = false,
}: {
  fullPage?: boolean;
}) {
  let repositories: any[] = [];

  try {
    const response = await fetch(
      "https://api.github.com/users/barbecue/repos",
      { cache: "force-cache" },
    );

    repositories = await response.json();
  } catch (error) {
    repositories = fallbackRepositories;
  }

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-3 drop-shadow-2xl",
        !fullPage && "col-span-1 rounded-lg border bg-card p-5",
      )}
    >
      {!fullPage && (
        <div className="flex w-full flex-row items-center justify-between">
          <span className="flex flex-row items-center gap-2 text-muted">
            Repositories
          </span>
          <Button asChild size="sm" variant="outline" className="h-5 px-2 py-3">
            <Link
              href="/repositories"
              className="flex flex-row items-center gap-1 text-muted"
            >
              View More
            </Link>
          </Button>
        </div>
      )}

      {repositories
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, fullPage ? repositories.length : 4)
        .map((repo: any, index: number) => (
          <Repository key={index} repo={repo} />
        ))}
    </div>
  );
}
