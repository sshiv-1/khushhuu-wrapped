"use client";

import { motion } from "framer-motion";
import { ParsedMessage } from "@/lib/parser";
import { pickMemorableMessages } from "@/lib/story-engine";
import { Heart, Sparkles, Camera, MessageCircle } from "lucide-react";

function randomScrapbookStyle(i: number) {
  const rotations = [-2.5, 1.8, -1.2, 3, -1.5, 2.2, -3, 0.8, -0.5, 2.5, -1.8, 1.5];
  const offsets = ["-4px", "3px", "-2px", "5px", "-3px", "2px", "-5px", "4px", "-1px", "6px", "-3px", "2px"];
  return {
    rotate: rotations[i % rotations.length],
    y: offsets[i % offsets.length],
  };
}

function MessageCard({
  message,
  index,
}: {
  message: ParsedMessage;
  index: number;
}) {
  const style = randomScrapbookStyle(index);
  const date = new Date(message.timestamp).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  // Determine card flavor
  const isAffectionate = /\b(love|miss|happy|beautiful|heart|sweet|dear|baby|home|safe|peace)\b/i.test(
    message.content,
  );
  const Icon = message.isReel ? Camera : isAffectionate ? Heart : MessageCircle;

  return (
    <motion.div
      className="bg-white/70 backdrop-blur-sm rounded-soft p-5 md:p-6 paper-shadow border border-warm/30 relative"
      style={{ transform: `rotate(${style.rotate}deg) translateY(${style.y})` }}
      initial={{ opacity: 0, y: 30, rotate: style.rotate }}
      whileInView={{ opacity: 1, y: 0, rotate: style.rotate }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{
        scale: 1.02,
        rotate: 0,
        transition: { duration: 0.3 },
      }}
    >
      {/* Tiny tape detail */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-3 bg-warm/50 rounded-sm opacity-60" />

      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs opacity-60">
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
    <section className="relative py-24 md:py-36 px-6 bg-cream paper-grain">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
          className="text-center mt-20 md:mt-28"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          <p className="font-handwritten text-2xl md:text-3xl text-faded-brown mb-4">
            &mdash; yours, always
          </p>
          <p className="font-serif text-lg md:text-xl text-charcoal-light italic">
            Twelve thousand little moments.<br />
            One beautiful story.
          </p>
        </motion.div>
      </div>
    </section>
  );
}