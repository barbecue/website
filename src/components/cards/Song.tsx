import React from "react";
import Image from "next/image";
import { Song } from "@/components/sections/RecentlyListenedSongs";

export default function SongCard({ song }: { song: Song }) {
  return (
    <div className="flex h-16 w-full cursor-pointer items-center justify-between rounded-lg border px-5 drop-shadow-xl transition-colors duration-300 hover:bg-secondary/80 dark:bg-primary dark:hover:bg-primary/70">
      <div className="flex w-full flex-row items-center gap-2">
        {song.image && (
          <Image
            draggable={false}
            src={song.image}
            alt={song.name}
            width={120}
            height={120}
            className="aspect-square size-10 flex-1 rounded-sm bg-secondary"
          />
        )}
        <div className="flex w-full flex-col">
          <span className="line-clamp-1 w-full text-sm">{song.name}</span>
          <span className="line-clamp-1 w-full text-sm text-muted">
            {song.artists.map((_: any) => _.name).join(", ")}
          </span>
        </div>
      </div>
    </div>
  );
}
