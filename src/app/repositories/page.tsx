import React from "react";
import Repositories from "@/components/sections/Repositories";

export const revalidate = 3600;

export default function Page() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border bg-card px-5 py-4 drop-shadow-2xl">
      <Repositories fullPage={true} />
    </div>
  );
}
