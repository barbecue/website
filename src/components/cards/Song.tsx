import React from "react";
import Image from "next/image";

export default function Song({
  song,
}: {
  song: {
    id: string;
    name: string;
    artists: any;
    image: string;
    external_urls: {
      spotify: string;
    };
  };
}) {
  return (
    <div className="flex h-16 w-full cursor-pointer items-center justify-between rounded-lg border px-2 drop-shadow-xl transition-colors duration-300 hover:bg-secondary/80 dark:bg-primary dark:hover:bg-primary/70">
      <div className="flex w-full flex-row items-center gap-2">
        <Image
          draggable={false}
          src={song.image}
          alt={song.name}
          width={120}
          height={120}
          className="size-10 rounded-sm bg-secondary"
        />
        <div className="flex w-full flex-col">
          <span className="line-clamp-1 text-sm">{song.name}</span>
          <span className="line-clamp-1 text-sm text-muted">
            {song.artists.map((_: any) => _.name).join(", ")}
          </span>
        </div>
      </div>
    </div>
  );
}
