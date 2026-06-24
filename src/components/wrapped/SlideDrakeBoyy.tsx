"use client";

import { motion } from "framer-motion";

const LINES = [
  "I got everything I wanted and somehow you're still the thing I think about most",
  "I look for you in every room.",
  "The worst part isn't losing you—it's knowing nobody else feels like you",
];

const lineVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function SlideDrakeBoyy() {
  return (
    <div
      className="wrapped-slide relative overflow-hidden"
      style={{ backgroundColor: "#6B0000" }}
    >
      <motion.div
        className="w-full h-full flex flex-col justify-center"
        style={{ padding: "10vw" }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.3 } } }}
      >
        <div className="flex flex-col gap-8">
          {LINES.map((line, i) => (
            <motion.p
              key={i}
              variants={lineVariants}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.8rem, 8vw, 6rem)",
                lineHeight: 1.15,
                color: "#E8897A",
                fontWeight: 400,
                textAlign: "left",
              }}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </motion.div>

      {/* Label */}
      <span
        className="absolute bottom-6 right-6"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "0.75rem",
          color: "#E8897A",
          opacity: 0.4,
          letterSpacing: "0.08em",
        }}
      >
        yk imma a drake boyy
      </span>
    </div>
  );
}
