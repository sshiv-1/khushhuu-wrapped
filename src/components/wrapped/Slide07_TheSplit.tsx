"use client";

import { useSlideAudio } from "@/hooks/useSlideAudio";
import { motion } from "framer-motion";
import { weekHerMessages, weekHisMessages } from "@/data/weekData";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function Slide07_TheSplit({ isActive = false, previewUrl }: { isActive?: boolean, previewUrl?: string }) {
  useSlideAudio(previewUrl, isActive);
  return (
    <div className="wrapped-slide bg-sp-dark px-6">
      <motion.div
        className="flex flex-col items-center gap-10 text-center"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={item} className="flex items-end justify-center gap-8 md:gap-14">
          {/* Her — slightly larger */}
          <div className="flex flex-col items-center gap-3">
            <span
              className="font-serif italic font-normal text-sp-white leading-none"
              style={{ fontSize: "clamp(4rem, 11vw, 8.5rem)" }}
            >
              {weekHerMessages}
            </span>
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-sp-green">
              Her
            </span>
          </div>

          {/* Divider */}
          <span
            className="font-serif font-normal text-sp-dim leading-none"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", paddingBottom: "0.6em" }}
            aria-hidden
          >
            |
          </span>

          {/* You — slightly smaller */}
          <div className="flex flex-col items-center gap-3">
            <span
              className="font-serif italic font-normal text-sp-white leading-none"
              style={{ fontSize: "clamp(3.5rem, 9.5vw, 7.5rem)" }}
            >
              {weekHisMessages}
            </span>
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-sp-green">
              You
            </span>
          </div>
        </motion.div>

        <motion.p variants={item} className="font-serif italic text-sm text-sp-muted tracking-wide max-w-xs">
          almost even. you were both showing up.
        </motion.p>
      </motion.div>
    </div>
  );
}
