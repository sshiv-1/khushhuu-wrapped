"use client";

import { motion } from "framer-motion";

export default function Slide13b_TheLetter() {
  const paragraphs = [
    "there's something i've wanted to say for a while.",
    "when my account disappeared — it wasn't me trying to erase you from my life. i did something i was genuinely embarrassed about, and i ended up deactivating everything because i couldn't get out of my own head. that's not an excuse for anything that happened. i just never explained it properly.",
    "i also ended up reading a lot of our old chats recently. and if i'm being honest — i miss you more than i'd like to admit.",
    "but more than that, i wanted to thank you. regardless of whether we ever end up talking the way we used to or not — you brought back a version of me i thought was gone. you reminded me that i can still care deeply about someone. that i can still get excited to see a notification. that i can still feel things instead of just thinking about them. for that, i'll always be grateful.",
    "and for introducing me to game of thrones — because now i'm permanently cursed.",
    "take care of yourself, khushee.",
  ];

  return (
    <div
      className="wrapped-slide flex flex-col items-center relative overflow-hidden"
      style={{ backgroundColor: "#0d0d1a" }}
    >
      {/* SVG Noise filter for subtle grain */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.08] mix-blend-soft-light z-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* Scrollable inner container */}
      <div className="relative z-10 w-full max-w-[540px] px-7 py-14 md:py-16 overflow-y-auto flex-1 flex flex-col justify-center"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <motion.div
          className="flex flex-col"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.18 } } }}
        >
          {/* Header */}
          <motion.p
            className="text-center"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "0.85rem",
              color: "#555566",
              marginBottom: "2.5rem",
              letterSpacing: "0.04em",
            }}
            variants={{
              hidden: { opacity: 0, y: 8 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
            }}
          >
            something i should have said sooner
          </motion.p>

          {/* Letter body */}
          <div className="flex flex-col gap-5 w-full text-left">
            {paragraphs.map((text, i) => (
              <motion.p
                key={i}
                style={{
                  fontFamily: "'Lora', serif",
                  fontSize: "clamp(0.9rem, 2.2vw, 1.05rem)",
                  lineHeight: 1.85,
                  color: i === 0 ? "#d0d0e0" : i === paragraphs.length - 1 ? "#c8c8d8" : "#dcdce8",
                  fontWeight: 400,
                  letterSpacing: "0.01em",
                }}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
                }}
              >
                {text}
              </motion.p>
            ))}
          </div>

          {/* Signature */}
          <motion.p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "1rem",
              color: "#555566",
              marginTop: "2.5rem",
              textAlign: "left",
            }}
            variants={{
              hidden: { opacity: 0, y: 8 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.3 } },
            }}
          >
            — shiv
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
