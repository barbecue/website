"use client";

import * as React from "react";
import { Bookmark, Home, Menu } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Icon from "@/components/Icon";
import { cn } from "@/lib/utils";
import { GoRepo } from "react-icons/go";
import { GrArticle } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { Social } from "@/components/layouts/Navbar";

export function CommandMenu({
  full,
  socials,
}: {
  full: boolean;
  socials: Social[];
}) {
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  function handleRedirect(href: string, external?: boolean) {
    setOpen(false);
    if (!external) router.push(href);
    else {
      const newWindow = window.open(href, "_blank", "noopener,noreferrer");
      if (newWindow) newWindow.opener = null;
    }
  }

  const pages = [
    {
      icon: <Home className="mr-2 h-4 w-4" />,
      label: "Home",
      url: "/",
    },
    {
      icon: <GoRepo className="mr-2 h-4 w-4" />,
      label: "Repositories",
      url: "/repositories",
    },
    {
      icon: <GrArticle className="mr-2 h-4 w-4" />,
      label: "Articles",
      url: "/articles",
    },
    {
      icon: <Bookmark className="mr-2 h-4 w-4" />,
      label: "Bookmarks",
      url: "/bookmarks",
    },
  ];

  return (
    <>
      <HoverCard openDelay={250} closeDelay={250}>
        <HoverCardTrigger>
          <Button
            onClick={() => {
              setOpen(true);
            }}
            className={cn(
              "text-muted transition-colors duration-300 dark:hover:text-white",
              !full && "border-primary backdrop-blur-2xl dark:bg-primary/30",
            )}
            size="icon"
          >
            <Menu className="size-5" />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 px-1.5 font-mono text-sm font-medium text-muted-foreground opacity-100">
            ⌘/CTRL + K
          </kbd>
        </HoverCardContent>
      </HoverCard>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {pages.map((item, index) => (
              <CommandItem
                onSelect={() => handleRedirect(item.url)}
                key={index}
              >
                {item.icon}
                <span>{item.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Social">
            {socials.map((social: Social) => (
              <CommandItem
                onSelect={() => handleRedirect(social.url, true)}
                key={social.name}
              >
                <Icon icon={social.icon} className="mr-2 h-4 w-4" />
                <span>{social.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
