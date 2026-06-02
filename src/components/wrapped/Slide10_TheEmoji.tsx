"use client";

import { motion } from "framer-motion";
import { weekTopEmojis } from "@/data/weekData";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

const topEmoji = weekTopEmojis[0]; // 😭, 37 times

export default function Slide10_TheEmoji() {
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
          Most Used This Week
        </motion.p>

        {/* Emoji — system font rendering, not serif */}
        <motion.div
          variants={item}
          className="leading-none select-none"
          style={{ fontSize: "clamp(5rem, 16vw, 10rem)" }}
          aria-label={`${topEmoji.emoji} emoji`}
        >
          {topEmoji.emoji}
        </motion.div>

        <motion.p variants={item} className="font-serif italic text-sm text-faded-brown tracking-wide">
          {topEmoji.count} times. it means everything and nothing.
        </motion.p>
      </motion.div>
    </div>
  );
}
