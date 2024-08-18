import React from "react";
import { getProjects } from "@/lib/contentful";
import Project from "@/components/cards/Project";

export default async function PersonalProjects() {
  async function fetchData() {
    return await getProjects();
  }
  const projects = await fetchData();

  return (
    <div className="flex w-full flex-col gap-3 rounded-lg border bg-card px-5 py-5 drop-shadow-2xl">
      <div className="flex w-full flex-row items-center justify-between">
        <span className="text-muted">Personal Projects</span>
      </div>
      <div className="flex flex-col gap-3">
        {projects
          .sort((a: { startDate: string }, b: { startDate: string }) => {
            return (
              (new Date(b.startDate) as any) - (new Date(a.startDate) as any)
            );
          })
          .map((project: any, index: number) => (
            <Project project={project} key={index} />
          ))}
      </div>
    </div>
  );
}
