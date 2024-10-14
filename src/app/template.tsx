"use client";
import React from "react";
import { motion } from "framer-motion";
import { useAnimationKey } from "@/lib/animation-key";
import Navbar from "@/components/layouts/Navbar";

export default function Template({ children }: { children: React.ReactNode }) {
  const animationKey = useAnimationKey();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      key={animationKey}
      className="relative mx-auto flex max-w-6xl flex-col items-center justify-center gap-8 py-6"
    >
      {children}
    </motion.div>
  );
}
