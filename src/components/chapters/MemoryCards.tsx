"use client";

import { motion } from "framer-motion";
import { ParsedMessage } from "@/lib/parser";
import { pickMemorableMessages } from "@/lib/story-engine";
import { Heart, Camera, MessageCircle } from "lucide-react";

function scrapbookStyle(i: number) {
  const rotations = [-2, 1.5, -1, 2.5, -1.2, 1.8, -2.5, 0.8, -0.5, 2, -1.5, 1.2];
  const offsets = ["-3px", "2px", "-2px", "4px", "-2px", "1px", "-4px", "3px", "-1px", "5px", "-2px", "2px"];
  const tapeOffsets = ["45%", "52%", "48%", "55%", "42%", "50%", "47%", "53%", "44%", "51%", "46%", "54%"];
  const tapeRotations = [-1, 0.5, -0.3, 1, -0.8, 0.2, -1.2, 0.7, -0.5, 0.8, -0.4, 1.1];
  return {
    rotate: rotations[i % rotations.length],
    y: offsets[i % offsets.length],
    tapeLeft: tapeOffsets[i % tapeOffsets.length],
    tapeRotate: tapeRotations[i % tapeRotations.length],
  };
}

function MessageCard({
  message,
  index,
}: {
  message: ParsedMessage;
  index: number;
}) {
  const style = scrapbookStyle(index);
  const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const d = new Date(message.timestamp);
  const date = `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}`;

  // Determine card flavor
  const isAffectionate = /\b(love|miss|happy|beautiful|heart|sweet|dear|baby|home|safe|peace)\b/i.test(
    message.content,
  );
  const Icon = message.isReel ? Camera : isAffectionate ? Heart : MessageCircle;

  return (
    <motion.div
      className="bg-white/70 backdrop-blur-sm rounded-soft p-5 md:p-6 paper-shadow border border-warm/30 relative"
      style={{ transform: `rotate(${style.rotate}deg) translateY(${style.y})` }}
      initial={{ opacity: 0, y: 24, rotate: style.rotate }}
      whileInView={{ opacity: 1, y: 0, rotate: style.rotate }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay: index * 0.07, ease: "easeOut" }}
      whileHover={{
        scale: 1.015,
        rotate: 0,
        transition: { duration: 0.4, ease: "easeOut" },
      }}
    >
      {/* Scrapbook tape detail — varied position and slight rotation */}
      <div
        className="absolute -top-2 -translate-x-1/2 w-12 h-3 rounded-sm"
        style={{
          left: style.tapeLeft,
          transform: `translateX(-50%) rotate(${style.tapeRotate}deg)`,
          background: "linear-gradient(135deg, rgba(232,223,213,0.7) 0%, rgba(232,223,213,0.4) 100%)",
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        }}
      />

      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs opacity-50">
          <Icon size={12} />
        </span>
        <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-faded-brown">
          {date}
        </p>
      </div>

      <p className="font-serif text-sm md:text-base text-charcoal leading-relaxed line-clamp-4">
        {message.content || (message.isReel ? "Shared a reel" : "Shared a moment")}
      </p>

      {message.isReel && (
        <p className="font-sans text-[10px] text-sage-dark mt-2 flex items-center gap-1">
          <Camera size={10} /> reel
        </p>
      )}
    </motion.div>
  );
}

export default function MemoryCards({
  messages,
  chapter,
}: {
  messages: ParsedMessage[];
  chapter: { lead: string };
}) {
  const memorableMessages = pickMemorableMessages(messages);

  return (
    <section className="relative py-28 md:py-40 px-6 bg-cream paper-grain">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-20 md:mb-28"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4 }}
        >
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-sage-dark mb-4">
            Chapter Five
          </p>
          <h2 className="font-display text-chapter text-charcoal mb-6">
            Memory Cards
          </h2>
          <p className="font-serif text-quote text-charcoal-light italic max-w-xl mx-auto">
            {chapter.lead}
          </p>
        </motion.div>

        {/* Scrapbook grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {memorableMessages.map((msg, i) => (
            <MessageCard key={`${msg.timestamp}-${i}`} message={msg} index={i} />
          ))}
        </div>

        {/* Empty state */}
        {memorableMessages.length === 0 && (
          <motion.p
            className="text-center font-serif text-quote text-charcoal-light italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Every message carries a memory. These are just a few.
          </motion.p>
        )}

        {/* Closing */}
        <motion.div
          className="text-center mt-24 md:mt-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
        >
          <p className="font-handwritten text-2xl md:text-3xl text-faded-brown mb-4">
            &mdash; from that year
          </p>
          <p className="font-serif text-lg md:text-xl text-charcoal-light italic leading-relaxed">
            Some conversations never really ended.<br />
            This was one of them.
          </p>
        </motion.div>
      </div>
    </section>
  );
}