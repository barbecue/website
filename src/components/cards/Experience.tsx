import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
      className="flex h-20 w-full cursor-pointer items-center justify-between rounded-lg border px-5 drop-shadow-xl transition-colors duration-300 hover:bg-secondary/80 dark:bg-primary dark:hover:bg-primary/70"
    >
      <div className="flex flex-row items-center gap-3">
        <Avatar className="size-[3.2rem] border p-1 dark:bg-gradient-to-br dark:from-accent dark:to-primary">
          <AvatarImage
            draggable={false}
            src={experience.image.url}
            className={cn(
              `object-cover`,
              experience.invert && "invert dark:invert-0",
            )}
            alt={experience.title}
          />
          <AvatarFallback className="uppercase">
            {experience.title.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span>{experience.title}</span>
          <div className="flex flex-row gap-2">
            <span className="text-sm text-muted">{experience.role}</span>
          </div>
        </div>
      </div>
      <ChevronRight className="size-5 text-muted/60" />
    </Link>
  );
}
