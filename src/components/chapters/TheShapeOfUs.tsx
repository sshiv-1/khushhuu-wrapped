"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { StoryStats } from "@/lib/stats";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function TheShapeOfUs({
  stats,
  chapter,
}: {
  stats: StoryStats;
  chapter: { lead: string; beats: any[] };
}) {
  const maxHeat = Math.max(...stats.hourHeatmap.flat());

  return (
    <section className="relative py-28 md:py-40 px-6 bg-ivory paper-grain">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-20 md:mb-28"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4 }}
        >
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-sage-dark mb-4">
            Chapter Two
          </p>
          <h2 className="font-display text-chapter text-charcoal mb-6">
            The Shape of Us
          </h2>
          <p className="font-serif text-quote text-charcoal-light italic max-w-xl mx-auto">
            {chapter.lead}
          </p>
        </motion.div>

        {/* Monthly rhythm chart */}
        <motion.div
          className="mb-20 paper-shadow bg-white/50 rounded-soft p-6 md:p-10 border border-warm/30"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1 }}
        >
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-faded-brown mb-8 text-center">
            The rhythm of a year
          </p>
          <div className="flex items-end gap-1 md:gap-2 h-48 justify-center">
            {Object.entries(stats.monthlyCounts)
              .sort()
              .map(([month, count], i) => {
                const maxCount = Math.max(...Object.values(stats.monthlyCounts));
                const height = (count / maxCount) * 100;
                const monthNames = [
                  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
                ];
                const mIdx = parseInt(month.split("-")[1]) - 1;
                return (
                  <motion.div
                    key={month}
                    className="flex flex-col items-center gap-2 flex-1 max-w-[40px]"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.8 }}
                  >
                    <span className="font-sans text-[10px] text-faded-brown">
                      {count}
                    </span>
                    <motion.div
                      className="w-full bg-sage/50 rounded-t-sm"
                      initial={{ height: 0 }}
                      whileInView={{ height: `${height}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06, duration: 1, ease: "easeOut" }}
                    />
                    <span className="font-sans text-[10px] uppercase text-faded-brown/60">
                      {monthNames[mIdx]}
                    </span>
                  </motion.div>
                );
              })}
          </div>
        </motion.div>

        {/* Heatmap */}
        <motion.div
          className="paper-shadow bg-white/50 rounded-soft p-6 md:p-10 border border-warm/30"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.15 }}
        >
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-faded-brown mb-8 text-center">
            When you talked most
          </p>
          <div className="overflow-x-auto heatmap-scroll">
            <div className="inline-grid grid-cols-[40px_repeat(24,1fr)] gap-px min-w-[600px] w-full">
              {/* Header hours */}
              <div />
              {Array.from({ length: 24 }).map((_, h) => (
                <div key={`hour-${h}`} className="text-center font-sans text-[9px] text-faded-brown/50 py-1">
                  {h % 3 === 0 ? `${h}h` : ""}
                </div>
              ))}

              {/* Days */}
              {DAYS.map((day, d) => (
                <Fragment key={day}>
                  <div className="font-sans text-[10px] text-faded-brown py-1 pr-2 text-right">
                    {day}
                  </div>
                  {Array.from({ length: 24 }).map((_, h) => {
                    const v = stats.hourHeatmap[d][h];
                    const intensity = maxHeat > 0 ? v / maxHeat : 0;
                    return (
                      <motion.div
                        key={`${d}-${h}`}
                        className="rounded-sm aspect-square"
                        style={{
                          backgroundColor: `rgba(156, 175, 136, ${intensity * 0.85})`,
                        }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.05 }}
                      />
                    );
                  })}
                </Fragment>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Insight */}
        <motion.p
          className="text-center font-serif text-quote text-charcoal-light italic max-w-lg mx-auto mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8 }}
        >
          {chapter.beats[0]?.narrative ?? ""}
        </motion.p>
      </div>
    </section>
  );
}