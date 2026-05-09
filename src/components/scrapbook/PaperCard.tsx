"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function PaperCard({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`bg-white/60 backdrop-blur-sm rounded-soft p-6 md:p-8 paper-shadow border border-warm/40 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {/* Tape detail */}
      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-10 h-2.5 bg-warm/40 rounded-sm opacity-50" />

      {children}
    </motion.div>
  );
}