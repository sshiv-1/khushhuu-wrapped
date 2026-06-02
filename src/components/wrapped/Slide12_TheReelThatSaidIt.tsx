"use client";

import { motion } from "framer-motion";
import { weekMemorableReel } from "@/data/weekData";

export default function Slide12_TheReelThatSaidIt() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory px-8 md:px-20">
      <motion.div
        className="flex flex-col items-center gap-10 text-center max-w-2xl"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.2 } } }}
      >
        {/* Decorative opening mark */}
        <motion.span
          className="font-serif text-faded-brown/20 leading-none select-none"
          style={{ fontSize: "clamp(4rem, 10vw, 7rem)", lineHeight: 0.8 }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
          }}
          aria-hidden
        >
          "
        </motion.span>

        {/* Pull quote */}
        <motion.blockquote
          className="font-serif italic font-normal text-ink leading-relaxed"
          style={{ fontSize: "clamp(1.2rem, 2.6vw, 1.9rem)" }}
          variants={{
            hidden: { opacity: 0, y: 20, scale: 0.97 },
            show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
          }}
        >
          {weekMemorableReel.text}
        </motion.blockquote>

        {/* Attribution */}
        <motion.p
          className="font-sans text-xs uppercase tracking-[0.25em] text-faded-brown/70"
          variants={{
            hidden: { opacity: 0, y: 20, scale: 0.97 },
            show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
          }}
        >
          a reel. sent. {weekMemorableReel.date}.
        </motion.p>
      </motion.div>
    </div>
  );
}
