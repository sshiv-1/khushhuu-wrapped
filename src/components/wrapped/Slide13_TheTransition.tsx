"use client";

import { motion } from "framer-motion";

export default function Slide13_TheTransition() {
  const lineVariants = {
    hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  const ohhhVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95, filter: "blur(12px)" },
    show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 2, ease: "easeOut" as const } },
  };

  return (
    <div className="wrapped-slide bg-sp-dark px-6">
      <motion.div
        className="flex flex-col items-center justify-center gap-7 text-center max-w-2xl w-full"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.7 } } }}
      >
        <motion.p
          className="font-serif italic font-normal text-[#b3b3b3] leading-tight"
          style={{ fontSize: "clamp(1.4rem, 4vw, 2.25rem)" }}
          variants={lineVariants}
        >
          The way I breathe you in
        </motion.p>

        <motion.p
          className="font-serif italic font-normal text-[#b3b3b3] leading-tight"
          style={{ fontSize: "clamp(1.4rem, 4vw, 2.25rem)" }}
          variants={lineVariants}
        >
          It&apos;s the texture of your skin
        </motion.p>

        <motion.p
          className="font-serif italic font-normal text-[#dedede] leading-tight"
          style={{ fontSize: "clamp(1.4rem, 4vw, 2.25rem)" }}
          variants={lineVariants}
        >
          I wanna wrap my arms around you, baby
        </motion.p>

        <motion.p
          className="font-serif italic font-normal text-[#dedede] leading-tight"
          style={{ fontSize: "clamp(1.4rem, 4vw, 2.25rem)" }}
          variants={lineVariants}
        >
          Never let you go,
        </motion.p>

        <motion.p
          className="font-serif italic font-medium text-sp-white leading-tight break-all px-2 mt-4"
          style={{ 
            fontSize: "clamp(2rem, 7vw, 4rem)",
            letterSpacing: "0.15em",
            textShadow: "0 0 20px rgba(255,255,255,0.3)"
          }}
          variants={ohhhVariants}
        >
          OOOOOOOOOOOOOHHHHHHHHHHHHHHHHHHH
        </motion.p>
      </motion.div>
    </div>
  );
}
