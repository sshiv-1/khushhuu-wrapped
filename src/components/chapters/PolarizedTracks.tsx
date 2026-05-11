"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SpotifyTrack } from "@/lib/spotify";
import PolaroidTrack from "./PolaroidTrack";

export default function PolarizedTracks() {
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const res = await fetch("/api/spotify");
        if (!res.ok) throw new Error("Failed to fetch tracks");
        const data = await res.json();
        setTracks(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchTracks();
  }, []);

  if (error) return null; // Gracefully hide section if API fails

  return (
    <section className="relative py-28 md:py-40 px-6 bg-paper paper-grain overflow-hidden">
      {/* Background aesthetic details */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-cream to-transparent opacity-60" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-cream to-transparent opacity-60" />

      {/* Subtle dust particles */}
      <motion.div
        className="absolute top-[15%] right-[10%] w-1.5 h-1.5 rounded-full bg-charcoal/10"
        animate={{ y: [0, -20, 0], opacity: [0.5, 0.2, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[40%] left-[5%] w-2 h-2 rounded-full bg-charcoal/5"
        animate={{ y: [0, 15, 0], opacity: [0.3, 0.1, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <motion.div
          className="text-center mb-24 md:mb-32"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4 }}
        >
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-sage-dark mb-4">
            Chapter Six
          </p>
          <h2 className="font-display text-chapter text-charcoal mb-6">
            Polarized Tracks
          </h2>
          <p className="font-serif text-quote text-charcoal-light italic max-w-xl mx-auto">
            The songs that stayed between everything.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14 max-w-5xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white/40 border border-warm/20 rounded-paper p-4 h-[380px] polaroid-skeleton"
                style={{
                  transform: `rotate(${i % 2 === 0 ? 1 : -1}deg)`,
                  marginTop: `${i * 12}px`,
                }}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-8 md:gap-14 px-4 md:px-0 relative">
            {tracks.map((track, index) => (
              <div
                key={`${track.title}-${index}`}
                className="w-full sm:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2.5rem)] max-w-[320px]"
              >
                <PolaroidTrack track={track} index={index} />
              </div>
            ))}
          </div>
        )}

        {/* Ending handwritten note */}
        {!loading && tracks.length > 0 && (
          <motion.div
            className="text-center mt-32 md:mt-40 relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            <p className="font-handwritten text-2xl md:text-3xl text-faded-brown rotate-[-1deg]">
              &mdash; always on repeat
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
