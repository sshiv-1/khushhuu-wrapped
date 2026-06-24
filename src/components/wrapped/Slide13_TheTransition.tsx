"use client";

import { motion } from "framer-motion";

const STEAM_LINES = ["OOOOOOOOOOO", "OOHHHHHHHHH", "HHHHHHHHHHH"];

function SteamLine({ text, delay }: { text: string; delay: number }) {
  const steamVariant = {
    hidden: {
      opacity: 0,
      y: 40,
      filter: "blur(12px)",
      letterSpacing: "0.15em",
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      letterSpacing: "normal",
      transition: {
        duration: 1.2,
        delay,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  const ghostStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    pointerEvents: "none",
    fontFamily: "inherit",
    fontSize: "inherit",
    fontWeight: "inherit",
    fontStyle: "inherit",
    letterSpacing: "inherit",
    textAlign: "center",
  };

  return (
    <motion.div className="relative w-full text-center" variants={steamVariant}>
      {/* Ghost wisp 1 */}
      <motion.span
        style={{ ...ghostStyle, zIndex: 0 }}
        initial={{ opacity: 0.06, y: 0, filter: "blur(4px)" }}
        animate={{ opacity: 0, y: -60, filter: "blur(20px)" }}
        transition={{ duration: 2, delay: delay + 1.0, ease: "easeOut" }}
        aria-hidden
      >
        {text}
      </motion.span>
      {/* Ghost wisp 2 */}
      <motion.span
        style={{ ...ghostStyle, zIndex: 0 }}
        initial={{ opacity: 0.03, y: 0, filter: "blur(6px)" }}
        animate={{ opacity: 0, y: -100, filter: "blur(20px)" }}
        transition={{ duration: 2, delay: delay + 1.3, ease: "easeOut" }}
        aria-hidden
      >
        {text}
      </motion.span>
      {/* Real text */}
      <span className="relative" style={{ zIndex: 1 }}>
        {text}
      </span>
    </motion.div>
  );
}

export default function Slide13_TheTransition() {
  const lineVariants = {
    hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" as const } },
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

        {/* Steam OOOOH block */}
        <motion.div
          className="font-serif italic font-medium text-sp-white w-full mt-4"
          style={{
            fontSize: "clamp(2rem, 7vw, 4rem)",
            lineHeight: 1.1,
            textShadow: "0 0 20px rgba(255,255,255,0.3)",
          }}
          variants={{ hidden: {}, show: {} }}
        >
          {STEAM_LINES.map((line, i) => (
            <SteamLine key={i} text={line} delay={0.3 + i * 0.4} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

