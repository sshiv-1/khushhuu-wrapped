"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function ChapterWrapper({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      className={`relative py-24 md:py-36 px-6 ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto">{children}</div>
    </motion.section>
  );
}