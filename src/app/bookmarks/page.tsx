import React from "react";
import Bookmarks from "@/components/sections/Bookmarks";
import { getPageSeo } from "@/lib/contentful";

export default function Page() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border bg-card px-5 py-4 drop-shadow-2xl">
      <Bookmarks fullPage={true} />
    </div>
  );
}

export async function generateMetadata() {
  const seoData = await getPageSeo("bookmarks");
  if (!seoData) {
    // @ts-ignore
    return null;
  }

  const { title, description } = seoData;
  const siteUrl = "/bookmarks";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: siteUrl,
    },
    alternates: {
      canonical: siteUrl,
    },
  };
}
