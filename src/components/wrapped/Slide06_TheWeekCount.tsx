"use client";

import { motion } from "framer-motion";
import { weekTotalMessages } from "@/data/weekData";
import { SlideBg } from "@/components/wrapped/SlideAssets";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function Slide06_TheWeekCount() {
  return (
    <div className="wrapped-slide bg-sp-dark px-6 relative overflow-hidden">
      <SlideBg src="/bg-retro-arch.jpg" opacity={0.15} />
      <motion.div
        className="flex flex-col items-center gap-7 text-center relative z-10"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.p variants={item} className="font-sans text-xs uppercase tracking-[0.25em] text-sp-green">
          Messages in 6 Days
        </motion.p>

        <motion.h2
          variants={item}
          className="font-serif italic font-normal text-sp-white leading-none"
          style={{ fontSize: "clamp(4.5rem, 12vw, 9rem)" }}
        >
          {weekTotalMessages}
        </motion.h2>

        <motion.p variants={item} className="font-serif italic text-sm text-sp-muted tracking-wide">
          the year never really left.
        </motion.p>
      </motion.div>
    </div>
  );
}
