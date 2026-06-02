"use client";

import { motion } from "framer-motion";

export default function Slide05_TheWeekBegins() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory px-6">
      <motion.div
        className="flex flex-col items-center gap-9 text-center max-w-lg"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.2 } } }}
      >
        {/* Thin rule — the pause before the pivot */}
        <motion.div
          className="w-10 h-px bg-faded-brown/35"
          variants={{
            hidden: { opacity: 0, scaleX: 0 },
            show: { opacity: 1, scaleX: 1, transition: { duration: 0.8, ease: "easeOut" } },
          }}
        />

        <motion.p
          className="font-serif italic font-normal text-ink leading-tight"
          style={{ fontSize: "clamp(1.9rem, 5vw, 3.25rem)" }}
          variants={{
            hidden: { opacity: 0, y: 20, scale: 0.97 },
            show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
          }}
        >
          and then there was last week.
        </motion.p>

        <motion.p
          className="font-serif italic text-sm text-faded-brown tracking-wide"
          variants={{
            hidden: { opacity: 0, y: 20, scale: 0.97 },
            show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
          }}
        >
          may 28. the conversation picked back up.
        </motion.p>
      </motion.div>
    </div>
  );
}
