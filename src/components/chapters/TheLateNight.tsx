"use client";

import { motion } from "framer-motion";
import { StoryStats } from "@/lib/stats";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const HOUR_LABELS_SHORT = [
  "12a", "1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a",
  "12p", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p",
];

export default function TheLateNight({
  stats,
  chapter,
}: {
  stats: StoryStats;
  chapter: { lead: string; beats: any[] };
}) {
  const maxHeat = Math.max(...stats.hourHeatmap.flat());
  const peakH = stats.peakHour;

  return (
    <section className="relative py-24 md:py-36 px-6 bg-ivory paper-grain">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-sage-dark mb-4">
            Chapter Four
          </p>
          <h2 className="font-display text-chapter text-charcoal mb-6">
            The {stats.peakHourFormatted} Hour
          </h2>
          <p className="font-serif text-quote text-charcoal-light italic max-w-xl mx-auto">
            {chapter.lead}
          </p>
        </motion.div>

        {/* Large heatmap */}
        <motion.div
          className="paper-shadow bg-white/50 rounded-soft p-6 md:p-10 border border-warm/30 mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-faded-brown mb-8 text-center">
            The conversation pulse
          </p>
          <div className="overflow-x-auto">
            <div className="grid gap-[3px] min-w-[700px]" style={{ gridTemplateColumns: `50px repeat(24, 1fr)` }}>
              <div />
              {HOUR_LABELS_SHORT.map((h, i) => (
                <div
                  key={h}
                  className={`text-center font-sans text-[9px] py-2 ${
                    i === peakH ? "text-sage-dark font-semibold" : "text-faded-brown/40"
                  }`}
                >
                  {i % 3 === 0 ? h : ""}
                </div>
              ))}

              {DAY_LABELS.map((day, d) => (
                <div key={day} className="contents">
                  <div className="font-sans text-[10px] text-faded-brown/60 py-1 text-right pr-2 flex items-center justify-end">
                    {day}
                  </div>
                  {stats.hourHeatmap[d].map((v, h) => {
                    const intensity = maxHeat > 0 ? v / maxHeat : 0;
                    const isPeak = h === peakH;
                    return (
                      <motion.div
                        key={`${d}-${h}`}
                        className="rounded-[2px] aspect-square relative flex items-center justify-center"
                        style={{
                          backgroundColor: `rgba(156, 175, 136, ${0.04 + intensity * 0.9})`,
                        }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: (d * 24 + h) * 0.0005, duration: 0.3 }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-sage/10" />
              <span className="font-sans text-[10px] text-faded-brown/50">quiet</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-sage/80" />
              <span className="font-sans text-[10px] text-faded-brown/50">buzzing</span>
            </div>
          </div>
        </motion.div>

        {/* Narrative insight */}
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="font-display text-6xl md:text-8xl text-sage-dark mb-4">
              {stats.peakHourFormatted}
            </p>
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-faded-brown mb-4">
              the hour that was always yours
            </p>
          </motion.div>

          <motion.p
            className="font-serif text-quote text-charcoal-light italic max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.3 }}
          >
            {chapter.beats[0]?.narrative}
          </motion.p>
        </div>
      </div>
    </section>
  );
}