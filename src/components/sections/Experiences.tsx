import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronRight } from "lucide-react";
import { getExperiences } from "@/lib/contentful";
import moment from "moment";
import Link from "next/link";
import Experience from "@/components/cards/Experience";

export default async function Experiences() {
  async function fetchData() {
    return await getExperiences();
  }
  const experiences = await fetchData();

  return (
    <div className="flex w-full flex-col gap-3 rounded-lg border bg-card px-5 py-5 drop-shadow-2xl">
      <div className="flex w-full flex-row items-center justify-between">
        <span className="text-muted">Experiences</span>
      </div>
      <div className="flex flex-col gap-3">
        {experiences
          .sort((a: { startDate: string }, b: { startDate: string }) => {
            return (
              (new Date(b.startDate) as any) - (new Date(a.startDate) as any)
            );
          })
          .map((experience: any, index: number) => (
            <Experience experience={experience} key={index} />
          ))}
      </div>
    </div>
  );
}
