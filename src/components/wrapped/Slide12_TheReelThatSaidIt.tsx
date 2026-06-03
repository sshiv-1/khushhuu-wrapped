"use client";

import { motion } from "framer-motion";
import { weekMemorableReel } from "@/data/weekData";

export default function Slide12_TheReelThatSaidIt() {
  return (
    <div className="wrapped-slide bg-sp-dark px-8 md:px-20">
      <motion.div
        className="flex flex-col items-center gap-10 text-center max-w-2xl"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.2 } } }}
      >
        <motion.span
          className="font-serif text-sp-dim leading-none select-none"
          style={{ fontSize: "clamp(4rem, 10vw, 7rem)", lineHeight: 0.8 }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { duration: 0.7, ease: "easeOut" as const } },
          }}
          aria-hidden
        >
          &ldquo;
        </motion.span>

        <motion.blockquote
          className="font-serif italic font-normal text-sp-white leading-relaxed"
          style={{ fontSize: "clamp(1.2rem, 2.6vw, 1.9rem)" }}
          variants={{
            hidden: { opacity: 0, y: 20, scale: 0.97 },
            show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" as const } },
          }}
        >
          {weekMemorableReel.text}
        </motion.blockquote>

        <motion.p
          className="font-sans text-xs uppercase tracking-[0.25em] text-sp-muted"
          variants={{
            hidden: { opacity: 0, y: 20, scale: 0.97 },
            show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" as const } },
          }}
        >
          a reel. sent. {weekMemorableReel.date}.
        </motion.p>
      </motion.div>
    </div>
  );
}
