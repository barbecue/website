"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { cn } from "@/lib/utils";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { CommandMenu } from "@/components/CommandMenu";

export interface Social {
  name: string;
  url: string;
  icon: string;
  sys: {
    publishedAt: string;
  };
}

export default function Navbar({ socials }: { socials: Social[] }) {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [full, setFullWidth] = useState<boolean>(true);

  useEffect(() => {
    const unsub = scrollY.on("change", (latest) => {
      const previous = scrollY.getPrevious();
      if (previous !== undefined && latest >= previous && latest >= 40)
        setFullWidth(false);
      else if (previous !== undefined && latest <= previous && latest <= 40)
        setFullWidth(true);
    });

    return () => {
      unsub();
    };
  }, [pathname, scrollY]);

  return (
    <motion.div
      className={cn(
        !full
          ? "top-5 max-w-xs rounded-[50px] bg-card/30 backdrop-blur-2xl lg:max-w-sm"
          : "top-0 max-w-6xl rounded-lg bg-card",
        "sticky z-50 mx-auto mt-5 flex w-full items-center justify-between border px-5 py-2.5 drop-shadow-2xl transition-all duration-500 ease-in-out",
      )}
    >
      <div className="transition duration-300">
        <Link
          className={cn(pathname !== "/" ? "text-muted" : "dark:text-white")}
          href="/"
        >
          tuna.one
        </Link>
        <span
          className={cn(
            "transition-opacity duration-300",
            pathname === "/" && "opacity-0",
          )}
        >
          /{pathname.split("/")[1]}
        </span>
      </div>
      <div className="flex flex-row gap-2">
        <ThemeSwitcher full={full} />
        <CommandMenu full={full} socials={socials} />
      </div>
    </motion.div>
  );
}
