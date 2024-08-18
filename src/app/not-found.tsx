import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border bg-card px-5 py-14 drop-shadow-2xl">
      <Image
        draggable={false}
        src="/assets/images/memoji-3.png"
        alt="@tuna.one"
        width={250}
        height={250}
        quality={100}
        className="size-40 drop-shadow-xl"
      />
      <h1 className="text-2xl font-semibold">Not Found</h1>
      <span className="text-muted">The page does not exist.</span>
      <Button variant="outline" asChild>
        <Link href="/">Back To Home</Link>
      </Button>
    </div>
  );
}
