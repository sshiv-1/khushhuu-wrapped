"use client";

import { motion } from "framer-motion";

export default function Slide13b_TheLetter() {
  const paragraphs = [
    "there's something i've wanted to say for a while",
    "when my account disappeared it wasn't me trying to erase you from my life\ni did something i was genuinely embarrassed about and i ended up deactivating everything because i couldn't get out of my own head\nthat's not an excuse for anything that happened i just never explained it properly",
    "i also ended up reading a lot of our old chats recently\nand if i'm being honest i miss you more than i'd like to admit",
    "but more than that i wanted to thank you\nregardless of whether we ever end up talking the way we used to or not\nyou brought back a version of me i thought was gone\nyou reminded me that i can still care deeply about someone\nthat i can still get excited to see a notification\nthat i can still feel things instead of just thinking about them\nfor that i'll always be grateful",
    "and for introducing me to game of thrones because now i'm permanently cursed",
    "take care of yourself khushee"
  ];

  return (
    <div 
      className="wrapped-slide flex flex-col items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: "#0d0d1a" }}
    >
      {/* SVG Noise filter for subtle grain */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.12] mix-blend-overlay z-0" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      <motion.div
        className="relative z-10 w-full max-w-[580px] px-8 py-12 flex flex-col"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
      >
        <motion.p
          className="text-center"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "0.85rem",
            color: "#555566",
            marginBottom: "3rem",
          }}
          variants={{
            hidden: { opacity: 0, y: 8 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
          }}
        >
          something i should have said sooner
        </motion.p>

        <div className="flex flex-col gap-6 w-full text-left">
          {paragraphs.map((text, i) => (
            <motion.p
              key={i}
              style={{
                fontFamily: "'Lora', serif",
                fontSize: "clamp(0.95rem, 2.5vw, 1.15rem)",
                lineHeight: 1.9,
                color: "#e8e8f0",
                fontWeight: 400,
                whiteSpace: "pre-line",
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

        <motion.p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "0.95rem",
            color: "#555566",
            marginTop: "2.5rem",
            textAlign: "left"
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
  );
}
