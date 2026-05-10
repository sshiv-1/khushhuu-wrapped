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
      className={`relative bg-white/60 backdrop-blur-sm rounded-soft p-6 md:p-8 paper-shadow border border-warm/40 ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: "easeOut" }}
    >
      {/* Tape detail */}
      <div
        className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-10 h-2.5 rounded-sm"
        style={{
          background: "linear-gradient(135deg, rgba(232,223,213,0.6) 0%, rgba(232,223,213,0.3) 100%)",
          transform: "translateX(-50%) rotate(-0.5deg)",
        }}
      />

      {children}
    </motion.div>
  );
}