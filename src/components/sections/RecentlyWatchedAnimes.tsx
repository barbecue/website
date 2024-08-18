import React from "react";
import Anime from "@/components/cards/Anime";
import malScraper from "mal-scraper";

export default async function RecentlyWatchedAnimes() {
  const List = await malScraper.getWatchListFromUser(
    process.env.NEXT_PUBLIC_MYANIMELIST || "",
    0,
    "anime",
  );
  const animeList = List.sort(
    (anime1: any, anime2: any) => anime2.updatedAt - anime1.updatedAt,
  )
    .filter((x) => x.numWatchedEpisodes !== 0)
    .slice(0, 4);

  return (
    <div className="col-span-1 flex w-full flex-col gap-3 rounded-lg border bg-card px-5 py-5 drop-shadow-2xl">
      <div className="flex w-full flex-row items-center justify-between">
        <span className="flex flex-row items-center gap-2 text-muted">
          Recently Watched Animes
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {animeList.map((anime: any, index) => (
          <Anime anime={anime} key={index} />
        ))}
      </div>
    </div>
  );
}
