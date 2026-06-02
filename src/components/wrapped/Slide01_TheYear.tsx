"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.97 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Slide01_TheYear() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory px-6">
      <motion.div
        className="flex flex-col items-center gap-7 text-center"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Label */}
        <motion.p
          variants={item}
          className="font-sans text-xs uppercase tracking-[0.25em] text-faded-brown"
        >
          A Year in Messages
        </motion.p>

        {/* Hero */}
        <motion.h2
          variants={item}
          className="font-serif italic font-normal text-ink leading-none"
          style={{ fontSize: "clamp(4.5rem, 12vw, 9rem)" }}
        >
          One Year
        </motion.h2>

        {/* Flavor */}
        <motion.p
          variants={item}
          className="font-serif italic text-sm text-faded-brown tracking-wide"
        >
          365 days. it never really stopped.
        </motion.p>
      </motion.div>
    </div>
  );
}
