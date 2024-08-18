import { ImageResponse } from "next/og";
import OpenGraphImage from "@/components/og-image";
import {
  sharedDescription,
  sharedImage,
  sharedTitle,
} from "@/app/shared-metadata";
import { getFont } from "@/lib/utils";

export const runtime = "edge";
export const alt = "Bookmarks";
export const size = {
  width: sharedImage.width,
  height: sharedImage.height,
};
export const contentType = sharedImage.type;

export default async function Image() {
  return new ImageResponse(
    (
      <OpenGraphImage
        title={sharedTitle}
        description={sharedDescription}
        url=""
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
