import React from "react";
import { getTechnologies } from "@/lib/contentful";
import Tech from "@/components/cards/Tech";

export default async function Technologies() {
  async function fetchData() {
    return await getTechnologies();
  }
  const Technologies = await fetchData();
  const technologies = Technologies.find(
    (x: any) => x.category === "Development",
  );
  return (
    <div className="col-span-2 flex w-full flex-col gap-3 rounded-lg border bg-card px-5 py-5 drop-shadow-2xl xl:col-span-4">
      <div className="flex w-full flex-row items-center justify-between">
        <span className="flex flex-row items-center gap-2 text-muted">
          Technologies
        </span>
      </div>
      <div className="grid grid-cols-2 gap-x-2 gap-y-2 xl:grid-cols-4">
        {technologies.data.map((tech: any, index: number) => (
          <Tech key={index} tech={tech} />
        ))}
      </div>
    </div>
  );
}
