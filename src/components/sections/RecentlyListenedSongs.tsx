import React from "react";
import SongCard from "@/components/cards/Song";
import spotifyWebApi from "spotify-web-api-node";
const spotifyApi = new spotifyWebApi();

export interface Song {
  image: string | null;
  artists: SpotifyApi.ArtistObjectSimplified[];
  name: string;
  id: string;
  external_urls: SpotifyApi.ExternalUrlObject;
}

export default async function RecentlyListenedSongs() {
  const {
    SPOTIFY_CLIENT_ID = "",
    SPOTIFY_CLIENT_SECRET = "",
    SPOTIFY_REFRESH_TOKEN = "",
  } = process.env;

  let recentlyPlayed: Song[] = [];

  try {
    await spotifyApi.setCredentials({
      clientId: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
    });

    await spotifyApi.setRefreshToken(SPOTIFY_REFRESH_TOKEN);

    const data = await spotifyApi.refreshAccessToken();
    spotifyApi.setAccessToken(data.body.access_token);

    const List = await spotifyApi.getMyRecentlyPlayedTracks({ limit: 20 });

    recentlyPlayed = List.body.items
      .map(({ track }) => ({ ...track }))
      .map(({ album, name, id }) => ({ ...album, name, id }))
      .map(({ images, external_urls, artists, name, id }) => ({
        images,
        external_urls,
        artists,
        name,
        id,
      }))
      .map(({ images, external_urls, artists, name, id }) => ({
        image: images[1]?.url || null,
        external_urls,
        artists,
        name,
        id,
      }))
      .filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i)
      .slice(0, 8);
  } catch (error) {
    console.error("Error fetching recently played songs:", error);
  }

  return (
    <div className="flex w-full flex-col gap-3 rounded-lg border bg-card px-5 py-5 drop-shadow-2xl xl:col-span-2">
      <div className="flex w-full flex-row items-center justify-between">
        <span className="flex flex-row items-center gap-2 text-muted">
          Recently Listened Songs
        </span>
      </div>
      <div className="grid grid-cols-1 gap-x-3 gap-y-2 lg:grid-cols-2">
        {recentlyPlayed?.length ? (
          recentlyPlayed?.map((song, index) => (
            <SongCard song={song} key={index} />
          ))
        ) : (
          <span className="col-span-1 flex items-center justify-center text-muted-foreground lg:col-span-2">
            There is nothing to see.
          </span>
        )}
      </div>
    </div>
  );
}
