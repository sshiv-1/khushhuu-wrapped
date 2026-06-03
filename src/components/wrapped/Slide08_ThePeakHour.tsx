"use client";

import { useSlideAudio } from "@/hooks/useSlideAudio";
import { motion } from "framer-motion";
import { weekPeakHour, weekPeakHourCount } from "@/data/weekData";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function Slide08_ThePeakHour({ isActive = false, previewUrl }: { isActive?: boolean, previewUrl?: string }) {
  useSlideAudio(previewUrl, isActive);
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
          This Week's Hour
        </motion.p>

        <motion.h2
          variants={item}
          className="font-serif italic font-normal text-sp-white leading-none"
          style={{ fontSize: "clamp(4.5rem, 12vw, 9rem)" }}
        >
          {weekPeakHour}
        </motion.h2>

        <motion.p variants={item} className="font-serif italic text-sm text-sp-muted tracking-wide">
          every evening, without fail.
        </motion.p>

        <motion.p variants={item} className="font-sans text-xs text-sp-dim tracking-wide">
          {weekPeakHourCount} messages in a single hour.
        </motion.p>
      </motion.div>
    </div>
  );
}
