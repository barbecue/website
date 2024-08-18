import React from "react";
import { getAllPostSlugs, getPost } from "@/lib/contentful";
import { notFound } from "next/navigation";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import Image from "next/image";
import moment from "moment";
import { isDevelopment } from "@/lib/utils";
import { draftMode } from "next/headers";
import readingDuration from "reading-duration";

export async function generateStaticParams() {
  const allPosts = await getAllPostSlugs();
  return allPosts.map((post: any) => ({ slug: post.slug }));
}

async function fetchData(slug: string) {
  const { isEnabled } = draftMode();
  const data = await getPost(slug, isDevelopment ? true : isEnabled);
  if (!data) notFound();
  return data;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const data = await fetchData(slug);
  const {
    cover: { url: image, width, height },
    title,
    content: { json },
    sys: { firstPublishedAt },
  } = data;
  const plainText = documentToPlainTextString(json);
  const readingTime = readingDuration(plainText, {
    wordsPerMinute: 100,
    emoji: false,
  });

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 rounded-lg border bg-card px-5 py-4 drop-shadow-2xl">
      <Image
        src={image}
        width={width}
        height={height}
        alt={title}
        draggable={false}
        className="h-96 rounded-lg object-cover"
      />
      <div className="flex flex-col gap-2 px-4">
        <h1 className="text-4xl font-medium capitalize">{title}</h1>
        <span className="text-xl text-muted">
          {moment(firstPublishedAt).format("LL")}, {readingTime}
        </span>
      </div>
      <div className="prose prose-invert w-full max-w-full px-4">
        {documentToReactComponents(json)}
      </div>
    </div>
  );
}
