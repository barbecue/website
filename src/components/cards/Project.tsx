import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import moment from "moment/moment";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { FaFileArchive } from "react-icons/fa";
import { cn } from "@/lib/utils";

export default function Project({
  project,
}: {
  project: {
    href: string;
    image: {
      url: string;
      width: number;
      height: number;
    };
    deprecated: boolean;
    title: string;
    invert: boolean;
    role: string;
  };
}) {
  return (
    <Link
      href={project.href}
      target="_blank"
      className="flex h-20 w-full cursor-pointer items-center justify-between rounded-lg border px-5 drop-shadow-xl transition-colors duration-300 dark:bg-primary dark:hover:bg-primary/70"
    >
      <div className="flex flex-row items-center gap-3">
        <Avatar className="size-[3.2rem] rounded-sm border p-1.5 dark:bg-gradient-to-br dark:from-accent dark:to-primary">
          <AvatarImage
            draggable={false}
            src={project.image.url}
            className={cn(
              "object-cover",
              project.invert && "invert dark:invert-0",
            )}
            alt={project.title}
          />
          <AvatarFallback className="uppercase">
            {project.title.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="flex flex-row items-center gap-2">
            {project.title}
            {project.deprecated && (
              <span className="flex h-5 flex-row items-center gap-1 rounded-full border border-red-500/50 bg-destructive/40 px-2 text-xs text-white drop-shadow-xl">
                DEPRECATED
              </span>
            )}
          </span>
          <div className="flex flex-row gap-2">
            <span className="text-sm text-muted">{project.role}</span>
          </div>
        </div>
      </div>
      <ChevronRight className="size-5 text-muted/60" />
    </Link>
  );
}
