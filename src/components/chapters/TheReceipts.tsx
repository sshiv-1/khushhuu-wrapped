"use client";

import { motion } from "framer-motion";
import { StoryStats } from "@/lib/parser";

function ReceiptCard({
  stat,
  title,
  narrative,
  delay,
}: {
  stat: string;
  title: string;
  narrative: string;
  delay: number;
}) {
  return (
    <motion.div
      className="bg-white/60 backdrop-blur-sm rounded-soft p-6 md:p-8 paper-shadow border border-warm/40 relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, delay, ease: "easeOut" }}
    >
      <p className="font-serif text-4xl md:text-5xl text-charcoal mb-3 tracking-tight">
        {stat}
      </p>
      <p className="font-sans text-xs uppercase tracking-[0.2em] text-faded-brown mb-3">
        {title}
      </p>
      <p className="font-serif text-sm md:text-base text-charcoal-light italic leading-relaxed">
        {narrative}
      </p>
    </motion.div>
  );
}

function firstSentence(text: string | undefined): string {
  if (!text) return "";
  return text.split(". ")[0] + ".";
}

export default function TheReceipts({
  stats,
  chapter,
}: {
  stats: StoryStats;
  chapter: { lead: string; beats: { narrative?: string }[] };
}) {
  const cards = [
    {
      stat: stats.totalMessages.toLocaleString(),
      title: "Messages exchanged",
      narrative: firstSentence(chapter.beats[0]?.narrative),
    },
    {
      stat: stats.daysSpan.toString(),
      title: "Days of conversation",
      narrative: firstSentence(chapter.beats[1]?.narrative),
    },
    {
      stat: stats.reelsShared.toString(),
      title: "Reels Shared",
      narrative: firstSentence(chapter.beats[2]?.narrative),
    },
    {
      stat: stats.attachmentsTotal.toString(),
      title: "Photos, videos & more",
      narrative: firstSentence(chapter.beats[3]?.narrative),
    },
  ];

  return (
    <section className="relative py-28 md:py-40 px-6 bg-cream paper-grain">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20 md:mb-28"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4 }}
        >
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-sage-dark mb-4">
            Chapter One
          </p>
          <h2 className="font-display text-chapter text-charcoal mb-6">
            The Receipts
          </h2>
          <p className="font-serif text-quote text-charcoal-light italic max-w-xl mx-auto">
            {chapter.lead}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {cards.map((card, i) => (
            <ReceiptCard key={card.title} {...card} delay={i * 0.12} />
          ))}
        </div>

        <motion.p
          className="text-center font-handwritten text-xl text-faded-brown mt-20 md:mt-28"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, delay: 0.5 }}
        >
          each one mattered
        </motion.p>
      </div>
    </section>
  );
}