import { ImageResponse } from "next/og";
import OpenGraphImage from "@/components/og-image";
import { sharedImage } from "@/app/shared-metadata";
import { getPageSeo } from "@/lib/contentful";
import { getFont } from "@/lib/utils";

export const runtime = "edge";
export const alt = "Bookmarks";
export const size = {
  width: sharedImage.width,
  height: sharedImage.height,
};
export const contentType = sharedImage.type;

export default async function Image() {
  const seoData = (await getPageSeo("bookmarks")) ?? {};
  const { title, description, imageTitle, imageDescription } = seoData;

  return new ImageResponse(
    (
      <OpenGraphImage
        title={imageTitle || title}
        description={imageDescription || description}
        url="bookmarks"
      />
    ),
    {
      ...size,
      fonts: [
        {
          name: "Geist",
          data: await getFont(),
          style: "normal",
          weight: 500,
        },
      ],
    },
  );
}
