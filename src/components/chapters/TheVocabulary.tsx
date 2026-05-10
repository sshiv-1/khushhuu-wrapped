"use client";

import { motion } from "framer-motion";
import { StoryStats } from "@/lib/stats";

export default function TheVocabulary({
  stats,
  chapter,
}: {
  stats: StoryStats;
  chapter: { lead: string; beats: any[] };
}) {
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
            Chapter Three
          </p>
          <h2 className="font-display text-chapter text-charcoal mb-6">
            The Vocabulary
          </h2>
          <p className="font-serif text-quote text-charcoal-light italic max-w-xl mx-auto">
            {chapter.lead}
          </p>
        </motion.div>

        {/* Top emojis */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-faded-brown mb-8">
            Your emoji language
          </p>
          <div className="flex flex-wrap gap-3 md:gap-5 justify-center">
            {stats.topEmojis.slice(0, 10).map(([emoji, count], i) => (
              <motion.div
                key={`emoji-${i}`}
                className="flex flex-col items-center gap-2 bg-white/60 backdrop-blur-sm rounded-soft px-4 py-3 md:px-5 md:py-4 paper-shadow border border-warm/30"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.6, ease: "easeOut" }}
              >
                <span className="text-3xl md:text-4xl">{emoji}</span>
                <span className="font-sans text-xs text-faded-brown">{count}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats woven into narrative */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <motion.div
            className="text-center p-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <p className="font-serif text-5xl text-sage-dark mb-3">{stats.shortMessagePct}%</p>
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-faded-brown mb-3">
              Short messages
            </p>
            <p className="font-serif text-sm text-charcoal-light italic">
              Quick replies, big energy
            </p>
          </motion.div>
          <motion.div
            className="text-center p-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.12 }}
          >
            <p className="font-serif text-5xl text-sage-dark mb-3">{stats.avgMessageLength}</p>
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-faded-brown mb-3">
              Avg characters
            </p>
            <p className="font-serif text-sm text-charcoal-light italic">
              The average message
            </p>
          </motion.div>
          <motion.div
            className="text-center p-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.24 }}
          >
            <p className="font-serif text-5xl text-sage-dark mb-3">{stats.topEmojis.length}</p>
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-faded-brown mb-3">
              Unique emojis
            </p>
            <p className="font-serif text-sm text-charcoal-light italic">
              A whole language in pictures
            </p>
          </motion.div>
        </div>

        {/* Narrative */}
        <motion.p
          className="text-center font-serif text-quote text-charcoal-light italic max-w-xl mx-auto mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8 }}
        >
          {chapter.beats[0]?.narrative}
        </motion.p>
      </div>
    </section>
  );
}