"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function Slide03_TheReels() {
  return (
    <div className="wrapped-slide bg-sp-dark px-6">
      <motion.div
        className="flex flex-col items-center gap-7 text-center"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.p variants={item} className="font-sans text-xs uppercase tracking-[0.25em] text-sp-green">
          Reels Shared
        </motion.p>

        <motion.h2
          variants={item}
          className="font-serif italic font-normal text-sp-white leading-none"
          style={{ fontSize: "clamp(4.5rem, 12vw, 9rem)" }}
        >
          254
        </motion.h2>

        <motion.p variants={item} className="font-serif italic text-sm text-sp-muted tracking-wide max-w-xs">
          254 things that made one of you think of the other.
        </motion.p>
      </motion.div>
    </div>
  );
}
