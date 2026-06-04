"use client";

import { motion } from "framer-motion";
import { SlideBg } from "@/components/wrapped/SlideAssets";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function Slide04_TheHour() {
  return (
    <div className="wrapped-slide bg-sp-dark px-6 relative overflow-hidden">
      <SlideBg src="/bg-purple-wave.jpg" opacity={0.16} />
      <motion.div
        className="relative z-10 flex flex-col items-center gap-7 text-center"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.p variants={item} className="font-sans text-xs uppercase tracking-[0.25em] text-sp-green">
          When the Year Peaked
        </motion.p>

        <motion.h2
          variants={item}
          className="font-serif italic font-normal text-sp-white leading-none"
          style={{ fontSize: "clamp(4.5rem, 12vw, 9rem)" }}
        >
          12AM
        </motion.h2>

        <motion.p variants={item} className="font-serif italic text-sm text-sp-muted tracking-wide max-w-xs">
          the hour when distractions faded and it was just you two.
        </motion.p>
      </motion.div>
    </div>
  );
}
