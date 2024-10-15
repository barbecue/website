import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function Experience({
  experience,
}: {
  experience: {
    href: string;
    image: {
      url: string;
      width: number;
      height: number;
    };
    title: string;
    present: boolean;
    role: string;
    invert: boolean;
    startDate: string;
    endDate: string;
  };
}) {
  return (
    <Link
      href={experience.href}
      target="_blank"
      className={cn(
        "relative flex h-20 w-full animate-rainbow cursor-pointer items-center justify-between rounded-lg border px-5 transition-colors duration-300 [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] hover:bg-secondary/80 dark:bg-primary dark:hover:bg-primary/70",
        !experience.present
          ? "bg-[linear-gradient(#fff,#fff),linear-gradient(#e4e4e7_100%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0))] dark:bg-[linear-gradient(#212121,#212121),linear-gradient(#2e2e2e_100%,rgba(18,18,19,0.6)_80%)]"
          : [
              "z-10 before:absolute before:bottom-[-10%] before:left-1/2 before:z-0 before:h-1/5 before:w-full before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:bg-[length:200%] before:opacity-20 before:[filter:blur(calc(0.8*1rem))]",
              // Light Styles
              "bg-[linear-gradient(#fff,#fff),linear-gradient(#e4e4e7_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]",
              // Dark Styles
              "dark:bg-[linear-gradient(#212121,#212121),linear-gradient(#2e2e2e_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]",
            ],
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <Avatar className="size-[3.2rem] rounded-sm border p-1 dark:bg-gradient-to-br dark:from-accent dark:to-primary">
          <AvatarImage
            draggable={false}
            src={experience.image.url}
            className={cn(
              "object-cover",
              experience.invert && "invert dark:invert-0",
            )}
            alt={experience.title}
          />
          <AvatarFallback className="uppercase">
            {experience.title.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="flex flex-row items-center gap-2">
            <span>{experience.title}</span>
            {experience.present && <Badge>PRESENT</Badge>}
          </div>
          <div className="flex flex-row gap-2">
            <span className="text-sm text-muted">{experience.role}</span>
          </div>
        </div>
      </div>
      <ChevronRight className="size-5 text-muted/60" />
    </Link>
  );
}
