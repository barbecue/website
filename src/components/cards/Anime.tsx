import React from "react";
import Image from "next/image";

export default function Anime({
  anime,
}: {
  anime: {
    animeTitle: string;
    animeImagePath: string;
    score: number;
    numWatchedEpisodes: number;
    animeNumEpisodes: number;
  };
}) {
  return (
    <div className="flex h-16 w-full cursor-pointer items-center justify-between rounded-lg border px-2 drop-shadow-xl transition-colors duration-300 hover:bg-secondary/80 dark:bg-primary dark:hover:bg-primary/70">
      <div className="flex flex-row items-center gap-2">
        <Image
          draggable={false}
          src={anime.animeImagePath}
          width={120}
          height={120}
          className="size-10 rounded-sm bg-secondary object-cover"
          alt={anime.animeTitle}
        />
        <div className="flex flex-col">
          <span className="w-52 truncate text-sm">{anime.animeTitle}</span>
          <span className="text-sm text-muted">
            {anime.numWatchedEpisodes}/
            {anime.animeNumEpisodes ? anime.animeNumEpisodes : "~"} Epsiodes
          </span>
        </div>
      </div>
    </div>
  );
}
