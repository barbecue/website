import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isDevelopment = process.env.NODE_ENV === "development";

export const getFont = async () => {
  const fontUrl = new URL("@/assets/fonts/Geist-Medium.ttf", import.meta.url);
  const response = await fetch(fontUrl);
  const font = await response.arrayBuffer();
  return font;
};
