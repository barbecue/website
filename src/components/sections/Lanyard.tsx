"use client";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLanyardWS, Snowflake } from "use-lanyard";
import Listening from "@/components/sections/Listening";

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
      <Listening data={data} />
    </div>
  );
};

export default Lanyard;
