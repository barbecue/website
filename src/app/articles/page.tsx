import React from "react";
import BlogPosts from "@/components/sections/BlogPosts";
import { getPageSeo } from "@/lib/contentful";

export default function Page() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border bg-card px-5 py-4 drop-shadow-2xl">
      <BlogPosts fullPage={true} />
    </div>
  );
}

export async function generateMetadata() {
  const seoData = await getPageSeo("articles");
  if (!seoData) {
    // @ts-ignore
    return null;
  }

  const { title, description } = seoData;
  const siteUrl = "/articles";

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
