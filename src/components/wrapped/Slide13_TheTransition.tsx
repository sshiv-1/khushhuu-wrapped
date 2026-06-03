"use client";

import { useSlideAudio } from "@/hooks/useSlideAudio";
import { motion } from "framer-motion";

export default function Slide13_TheTransition({ isActive = false, previewUrl }: { isActive?: boolean, previewUrl?: string }) {
  useSlideAudio(previewUrl, isActive);
  return (
    <div className="wrapped-slide bg-sp-dark px-6">
      <motion.div
        className="flex flex-col items-center gap-9 text-center max-w-lg"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.2 } } }}
      >
        <motion.div
          className="w-10 h-px bg-sp-dim"
          variants={{
            hidden: { opacity: 0, scaleX: 0 },
            show: { opacity: 1, scaleX: 1, transition: { duration: 0.8, ease: "easeOut" as const } },
          }}
        />

        <motion.p
          className="font-serif italic font-normal text-sp-white leading-tight"
          style={{ fontSize: "clamp(1.9rem, 5vw, 3.25rem)" }}
          variants={{
            hidden: { opacity: 0, y: 20, scale: 0.97 },
            show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" as const } },
          }}
        >
          and this is what it sounded like.
        </motion.p>

        <motion.p
          className="font-serif italic text-sm text-sp-muted tracking-wide"
          variants={{
            hidden: { opacity: 0, y: 20, scale: 0.97 },
            show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" as const } },
          }}
        >
          24 songs. picked on purpose.
        </motion.p>
      </motion.div>
    </div>
  );
}
