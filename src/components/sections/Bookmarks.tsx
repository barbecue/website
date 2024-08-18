import React from "react";
import Link from "next/link";
import { getRaindrops } from "@/lib/raindrop";
import moment from "moment";
import Bookmark from "@/components/cards/Bookmark";
import { Button } from "@/components/ui/button";

async function fetchData() {
  return await getRaindrops();
}

export default async function Bookmarks({
  fullPage = false,
}: {
  fullPage?: boolean;
}) {
  const bookmarks = await fetchData();
  const sortedBookmarks = bookmarks.items.sort(
    (a: any, b: any) =>
      new Date(b.created).getTime() - new Date(a.created).getTime(),
  );
  const displayedBookmarks = fullPage
    ? sortedBookmarks
    : sortedBookmarks.slice(0, 4);

  const renderBookmarks = sortedBookmarks.map(
    (bookmark: any, index: number) => (
      <React.Fragment key={bookmark.link}>
        {(index === 0 ||
          new Date(bookmark.created).toDateString() !==
            new Date(sortedBookmarks[index - 1].created).toDateString()) && (
          <span className="my-1 w-full text-lg font-medium text-muted">
            {moment(bookmark.created).format("LL")}
          </span>
        )}
        <Bookmark bookmark={bookmark} />
      </React.Fragment>
    ),
  );
  return (
    <div
      className={`${!fullPage && "col-span-2 rounded-lg border bg-card p-5"} flex w-full flex-col gap-3 drop-shadow-2xl`}
    >
      {!fullPage && (
        <div className="flex w-full flex-row items-center justify-between">
          <span className="text-muted">Recently Added Bookmarks</span>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="!h-5 !px-2 !py-3"
          >
            <Link
              href="/bookmarks"
              className="flex flex-row items-center gap-1 text-muted"
            >
              View More
            </Link>
          </Button>
        </div>
      )}

      <div className="flex flex-col gap-2">
        {fullPage
          ? renderBookmarks
          : displayedBookmarks.map((bookmark: any, index: number) => (
              <Bookmark fullPage={fullPage} bookmark={bookmark} key={index} />
            ))}
      </div>
    </div>
  );
}
