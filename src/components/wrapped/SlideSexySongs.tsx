"use client";

import { motion } from "framer-motion";

const lineVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const LYRICS = [
  "I just get closer to the truth",
  "There's just somethin' about you, baby",
  "All of these songs are for you",
];

export default function SlideSexySongs() {
  return (
    <div
      className="wrapped-slide relative overflow-hidden"
      style={{ backgroundColor: "#1a2f25" }}
    >
      <motion.div
        className="w-full h-full flex flex-col justify-center"
        style={{ padding: "10vw" }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.25, delayChildren: 0 } } }}
      >
        {/* Section 1 — The Joke */}
        <motion.p
          variants={lineVariants}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "1rem",
            color: "#7BA898",
            opacity: 0.5,
            marginBottom: "1.5rem",
          }}
        >
          (say hi to Ankit from my side 🫡)
        </motion.p>

        <motion.p
          variants={lineVariants}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2.2rem, 6vw, 5rem)",
            lineHeight: 1.15,
            color: "#7BA898",
            fontWeight: 400,
            textAlign: "left",
          }}
        >
          Fuck your coworker, she a hatin&apos;-ass ho
        </motion.p>

        {/* Divider */}
        <motion.div
          variants={lineVariants}
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "#7BA898",
            opacity: 0.2,
            margin: "2.5rem 0",
          }}
        />

        {/* Section 2 — The Affectionate Part */}
        <div className="flex flex-col gap-6">
          {LYRICS.map((line, i) => (
            <motion.p
              key={i}
              variants={lineVariants}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                lineHeight: 1.15,
                color: i === 2 ? "#a8c8b8" : "#7BA898",
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
          color: "#7BA898",
          opacity: 0.3,
          letterSpacing: "0.05em",
          textAlign: "right",
          maxWidth: "200px",
          lineHeight: 1.4,
        }}
      >
        $ome $exy $ongs 4 U — PARTYNEXTDOOR × Drake
      </span>
    </div>
  );
}
