import React from "react";
import Link from "next/link";
import Blog from "@/components/cards/Blog";
import { Button } from "@/components/ui/button";
import { getAllPosts } from "@/lib/contentful";

async function fetchData() {
  return await getAllPosts();
}

export default async function BlogPosts({
  fullPage = false,
}: {
  fullPage?: boolean;
}) {
  const articles = await fetchData();
  const displayedArticles = fullPage ? articles : articles.slice(0, 4);

  return (
    <div
      className={`${!fullPage && "col-span-2 rounded-lg border bg-card p-5"} flex w-full flex-col gap-3 drop-shadow-2xl`}
    >
      {!fullPage && (
        <div className="flex w-full flex-row items-center justify-between">
          <span className="text-muted">Recently Posted Articles</span>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="!h-5 !px-2 !py-3"
          >
            <Link
              href="/articles"
              className="flex flex-row items-center gap-1 text-muted"
            >
              View More
            </Link>
          </Button>
        </div>
      )}

      <div className="flex flex-col gap-2">
        {displayedArticles.map((article: any, index: number) => (
          <Blog fullPage={fullPage} article={article} key={index} />
        ))}
      </div>
    </div>
  );
}
