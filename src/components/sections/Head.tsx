import React from "react";
import { Button } from "@/components/ui/button";
import { FaCopy, FaEnvelope } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

export default function Head() {
  return (
    <div className="relative flex flex-col-reverse items-center justify-between gap-4 xl:flex-row xl:gap-0">
      <div className="flex flex-col items-center gap-5 text-center xl:w-1/2 xl:items-start xl:text-start">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">I&apos;m Tuna</h1>
          <span className="text-muted xl:text-xl">
            Self taught full-stack developer from Turkey. Making projects with
            💓
          </span>
        </div>
        <div className="flex flex-row gap-2">
          <Button asChild size="sm" className="flex flex-row gap-1">
            <Link href="mailto:me@tuna.one">
              <FaEnvelope /> Contact Me
            </Link>
          </Button>
        </div>
      </div>
      <Image
        draggable={false}
        src="/assets/images/memoji-2.png"
        alt="@tuna.one"
        width={250}
        height={250}
        priority={true}
        quality={100}
        className="size-40 select-none rounded-full border bg-gradient-to-br to-primary drop-shadow-2xl dark:from-accent/40"
      />
    </div>
  );
}
