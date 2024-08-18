"use client";
import { Icon as Iconify } from "@iconify/react";
import React from "react";

interface Props {
  icon: string;
  className?: string;
}

const Icon = ({ icon, className }: Props) => {
  return (
    <div>
      <Iconify icon={icon} className={className} />
    </div>
  );
};

export default Icon;
