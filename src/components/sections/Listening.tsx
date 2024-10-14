import React from "react";
import { Tooltip } from "@radix-ui/react-tooltip";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { FaSpotify } from "react-icons/fa6";
import { Data } from "use-lanyard";

export default function Listening({ data }: { data: Data | undefined }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "relative flex flex-row items-center gap-2 rounded-full border border-zinc-600/40 bg-accent px-2 text-muted",
              data?.spotify?.song
                ? "animate-pulse cursor-pointer"
                : "cursor-default",
            )}
          >
            <FaSpotify className="size-3" />
            <span className="max-w-56 truncate text-[13px]">
              Listening To {data?.spotify?.song ? data.spotify.song : "Nothing"}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent className={cn(!data?.spotify?.song && "hidden")}>
          From {data?.spotify?.artist}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
