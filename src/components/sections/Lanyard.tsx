"use client";
import React, { useEffect, useState } from "react";
import { FaSpotify } from "react-icons/fa6";
import Link from "next/link";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";

const Lanyard = () => {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({
    status: "offline",
    spotify: { name: "Nothing", trackId: null, artist: "Unknown Artist" },
  });

  useEffect(() => {
    const userId = process.env.NEXT_PUBLIC_DISCORD || "";
    const socket = new WebSocket(`wss://api.lanyard.rest/socket`);

    socket.addEventListener("open", () => {
      socket.send(
        JSON.stringify({
          op: 2,
          d: {
            subscribe_to_ids: [userId],
          },
        }),
      );
    });

    socket.addEventListener("message", ({ data }) => {
      const { t, d, op } = JSON.parse(data) as {
        t: "INIT_STATE" | "PRESENCE_UPDATE";
        d: any;
        op: number;
      };
      if (op === 1) {
        const heartbeatInterval = d.heartbeat_interval;
        setInterval(() => {
          console.log("sent op 3");
          socket.send(JSON.stringify({ op: 3 }));
        }, heartbeatInterval);
      }
      if (t === "INIT_STATE") {
        setStatus({
          status: d[userId].discord_status,
          spotify: d[userId].listening_to_spotify
            ? {
                name: d[userId].spotify.song,
                trackId: d[userId].spotify.track_id,
                artist: d[userId].spotify.artist,
              }
            : {
                name: "Nothing",
                trackId: null,
                artist: "Unknown Artist",
              },
        });
        if (loading) setLoading(false);
      }
      if (t === "PRESENCE_UPDATE") {
        setStatus({
          status: d.discord_status,
          spotify: d.listening_to_spotify
            ? {
                name: d.spotify.song,
                trackId: d.spotify.track_id,
                artist: d.spotify.artist,
              }
            : {
                name: "Nothing",
                trackId: null,
                artist: "Unknown Artist",
              },
        });
        if (loading) setLoading(false);
      }
    });
    return () => {
      socket.close();
    };
  }, [loading]);

  return (
    <div className="absolute top-4 flex flex-row gap-2">
      <Link
        href={`https://discord.com/users/${process.env.NEXT_PUBLIC_DISCORD}`}
        target="_blank"
        className={`flex flex-row items-center gap-2 rounded-full border ${status.status != "offline" ? "border-green-500/20 bg-green-500/20 text-green-500 dark:bg-green-700/40" : "border-zinc-600/40 bg-accent text-muted"} px-2 drop-shadow dark:drop-shadow-xl`}
      >
        <div className="relative">
          <div
            className={`size-2 rounded-full ${status.status != "offline" ? "bg-green-500" : "bg-muted"}`}
          />
          {status.status != "offline" && (
            <div className="absolute -top-0 size-2 animate-ping rounded-full bg-green-500" />
          )}
        </div>
        <span className="text-[13px] capitalize">
          {status.status != "offline" ? "Online" : "Offline"}
        </span>
      </Link>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="relative flex cursor-pointer flex-row items-center gap-2 rounded-full border border-zinc-600/40 bg-accent px-2 text-muted drop-shadow-xl">
              <FaSpotify className="size-3" />
              <span className="max-w-56 truncate text-[13px]">
                Listening To {status.spotify?.name || "Nothing"}
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent>From {status.spotify?.artist}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default Lanyard;
