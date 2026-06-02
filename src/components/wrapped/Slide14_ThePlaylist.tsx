"use client";

import { motion } from "framer-motion";
import { luvLuvLuvTracks } from "@/lib/spotify";

export default function Slide14_ThePlaylist() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-ivory px-6 py-28">
      <div className="w-full max-w-md mx-auto">

        {/* Playlist label */}
        <motion.p
          className="font-sans text-xs uppercase tracking-[0.25em] text-faded-brown text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          luv luv luv
        </motion.p>

        {/* Tracklist */}
        <div className="flex flex-col">
          {luvLuvLuvTracks.map((track, i) => (
            <motion.div
              key={`track-${track.order}`}
              className="flex items-baseline justify-between gap-6 py-[0.9rem] border-b border-warm/50 last:border-b-0"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.05,
                ease: "easeOut",
              }}
            >
              <span className="font-serif italic text-[0.95rem] text-ink leading-snug">
                {track.title}
              </span>
              <span className="font-sans text-[0.7rem] text-faded-brown shrink-0 text-right max-w-[40%]">
                {track.artist}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Closing runtime — the last thing on the page */}
        <motion.p
          className="font-serif italic text-xs text-faded-brown/50 text-center mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          luv luv luv — 1 hr 22 min
        </motion.p>

      </div>
    </div>
  );
}
