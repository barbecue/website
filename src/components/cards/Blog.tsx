import React from "react";
import moment from "moment/moment";
import Link from "next/link";

export default function Blog({
  article,
  fullPage = false,
}: {
  article: {
    title: string;
    description: string;
    slug: string;
    sys: {
      firstPublishedAt: string;
    };
  };
  fullPage?: boolean;
}) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="flex h-20 w-full cursor-pointer flex-col items-start justify-center gap-1 rounded-lg border px-2 drop-shadow-xl transition-colors duration-300 hover:bg-secondary/80 dark:bg-primary dark:hover:bg-primary/70 xl:h-16 xl:gap-0"
    >
      <div className="flex w-full items-center justify-between">
        <span className="w-52 truncate text-sm xl:w-full">{article.title}</span>
        <span className="text-[13px] text-muted">
          {moment(article.sys.firstPublishedAt).format("DD/MM/YYYY")}
        </span>
      </div>
      <span className="line-clamp-1 text-xs text-muted">
        {article.description}
      </span>
    </Link>
  );
}
