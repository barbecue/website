"use client";
import React from "react";
import { FaSpotify } from "react-icons/fa6";
import Link from "next/link";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";
import { useLanyardWS, Snowflake } from "use-lanyard";

const userId: Snowflake = `${BigInt(process.env.NEXT_PUBLIC_DISCORD!)}`;
const Lanyard = () => {
  const data = useLanyardWS(userId);
  return (
    <div className="absolute top-4 flex flex-row gap-2">
      <Link
        href={`https://discord.com/users/${process.env.NEXT_PUBLIC_DISCORD}`}
        target="_blank"
        className={cn(
          "flex flex-row items-center gap-2 rounded-full border px-2 drop-shadow",
          data?.discord_status != "offline"
            ? "border-green-500/20 bg-green-500/20 text-green-500 dark:bg-green-700/40"
            : "border-zinc-600/40 bg-accent text-muted",
        )}
      >
        <div className="relative">
          <div
            className={cn(
              "size-2 rounded-full",
              data?.discord_status != "offline" ? "bg-green-500" : "bg-muted",
            )}
          />
          {data?.discord_status != "offline" && (
            <div className="absolute -top-0 size-2 animate-ping rounded-full bg-green-500" />
          )}
        </div>
        <span className="text-[13px] capitalize">
          {data?.discord_status != "offline" ? "Online" : "Offline"}
        </span>
      </Link>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={cn(
                "relative flex flex-row items-center gap-2 rounded-full border border-zinc-600/40 bg-accent px-2 text-muted",
                data?.spotify?.song ? "cursor-pointer" : "cursor-default",
              )}
            >
              <FaSpotify className="size-3" />
              <span className="max-w-56 truncate text-[13px]">
                Listening To{" "}
                {data?.spotify?.song ? data.spotify.song : "Nothing"}
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent className={cn(!data?.spotify?.song && "hidden")}>
            From {data?.spotify?.artist}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default Lanyard;
