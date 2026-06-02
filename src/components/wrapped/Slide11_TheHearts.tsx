"use client";

import { motion } from "framer-motion";
import { weekHeartReactions } from "@/data/weekData";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function Slide11_TheHearts() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory px-6">
      <motion.div
        className="flex flex-col items-center gap-7 text-center"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.p variants={item} className="font-sans text-xs uppercase tracking-[0.25em] text-faded-brown">
          Times She Reacted ❤
        </motion.p>

        <motion.h2
          variants={item}
          className="font-serif italic font-normal text-ink leading-none"
          style={{ fontSize: "clamp(4.5rem, 12vw, 9rem)" }}
        >
          {weekHeartReactions}
        </motion.h2>

        <motion.p variants={item} className="font-serif italic text-sm text-faded-brown tracking-wide max-w-xs">
          she didn't have to say anything else.
        </motion.p>
      </motion.div>
    </div>
  );
}
