"use client";

import { motion } from "framer-motion";
import { SpotifyTrack } from "@/lib/spotify";

// ── Emotional captions pool ──
// Curated poetic lines assigned based on song index + title hints
const CAPTIONS = [
  "Everything felt quieter that night.",
  "We didn't need to say anything.",
  "The kind of song you replay at 2 AM.",
  "It was raining. We didn't care.",
  "Some songs just understand.",
  "That drive home. Windows down.",
  "I think of you every time this plays.",
  "The night stretched on forever.",
  "We were somewhere between lost and found.",
  "A song that holds the whole sky.",
  "It was always this one.",
  "Quiet enough to hear everything.",
  "The kind of night you don't want to end.",
  "Something shifted when this came on.",
  "Still can't hear it without smiling.",
  "Late night. No plans. Just this.",
  "The city looked different that night.",
  "We kept rewinding it.",
  "Time moved slower somehow.",
  "It played and we just — stayed.",
];

// Optional per-song caption overrides (by song title substring, case-insensitive)
const CAPTION_OVERRIDES: Record<string, string> = {
  // Add manual overrides here, e.g.:
  // "off my face": "Everything felt quieter that night.",
};

// ── Mood detection ──
// Songs that should feel darker / moodier
const DARK_MOOD_HINTS = [
  "weeknd", "playboi carti", "travis scott", "night", "dark", "die",
  "drugs", "blinding", "starboy", "after hours", "heartless", "party",
  "rather lie",
];

function detectMood(track: SpotifyTrack): "warm" | "dark" | "dreamy" {
  const searchStr = `${track.title} ${track.artist} ${track.album}`.toLowerCase();
  if (DARK_MOOD_HINTS.some((hint) => searchStr.includes(hint))) return "dark";
  return "warm";
}

// ── Scrapbook variation data ──
const ROTATIONS = [-2.5, 1.8, -1.2, 2.2, -0.8, 1.5, -2, 0.6, -1.5, 2.8, -0.5, 1.2, -1.8, 2, -2.2];
const VERTICAL_OFFSETS = [0, 18, 6, 28, 12, 35, 4, 22, 14, 8, 30, 2, 20, 10, 26];
const TAPE_STYLES = ["sage", "warm", "beige", "sage", "warm", "beige", "sage", "warm"] as const;
const TAPE_POSITIONS = ["42%", "55%", "48%", "60%", "45%", "52%", "50%", "58%"];
const TAPE_ROTATIONS = [-2, 1.5, -0.5, 2, -1, 0.8, -1.5, 1.2];

// Faked "memory timestamps" — curated for emotional texture
const TIMESTAMPS = [
  "Jun 14, 04:20 PM",
  "Jul 02, 09:15 AM",
  "Aug 21, 11:45 PM",
  "Sep 08, 02:30 AM",
  "Oct 15, 07:50 PM",
  "Nov 03, 12:10 AM",
  "May 27, 10:35 PM",
  "Dec 24, 11:58 PM",
  "Jan 12, 03:40 AM",
  "Feb 14, 09:00 PM",
  "Mar 20, 06:20 PM",
  "Apr 05, 01:15 AM",
  "Jul 18, 08:45 PM",
  "Aug 30, 04:00 AM",
  "Sep 22, 05:30 PM",
];

function getCaption(track: SpotifyTrack, index: number): string {
  // Check overrides first
  const titleLower = track.title.toLowerCase();
  for (const [key, caption] of Object.entries(CAPTION_OVERRIDES)) {
    if (titleLower.includes(key)) return caption;
  }
  // Fall back to pool
  return CAPTIONS[index % CAPTIONS.length];
}

export default function PolaroidTrack({
  track,
  index,
}: {
  track: SpotifyTrack;
  index: number;
}) {
  const mood = detectMood(track);
  const rotation = ROTATIONS[index % ROTATIONS.length];
  const verticalOffset = VERTICAL_OFFSETS[index % VERTICAL_OFFSETS.length];
  const tapeStyle = mood === "dark" ? "dark" : TAPE_STYLES[index % TAPE_STYLES.length];
  const tapeLeft = TAPE_POSITIONS[index % TAPE_POSITIONS.length];
  const tapeRotation = TAPE_ROTATIONS[index % TAPE_ROTATIONS.length];
  const timestamp = TIMESTAMPS[index % TIMESTAMPS.length];
  const caption = getCaption(track, index);

  const isDark = mood === "dark";

  return (
    <motion.a
      href={track.spotifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`polaroid-frame ${isDark ? "polaroid-frame--dark" : ""} block rounded-paper p-3 pb-5 md:p-4 md:pb-6 cursor-pointer relative no-underline`}
      style={{
        marginTop: `${verticalOffset}px`,
        transform: `rotate(${rotation}deg)`,
      }}
      initial={{ opacity: 0, y: 30, rotate: rotation }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{
        y: -4,
        rotate: 0,
        transition: { duration: 0.45, ease: "easeOut" },
      }}
    >
      {/* Tape strip */}
      <div
        className={`tape-strip tape-strip--${tapeStyle}`}
        style={{
          top: "-7px",
          left: tapeLeft,
          transform: `translateX(-50%) rotate(${tapeRotation}deg)`,
        }}
      />

      {/* Album artwork */}
      <div className={`relative aspect-square overflow-hidden rounded-sm mb-3 md:mb-4 album-grain ${isDark ? "album-grain--heavy" : ""}`}>
        <img
          src={track.albumArt}
          alt={`${track.title} — ${track.artist}`}
          className="w-full h-full object-cover"
          loading="lazy"
          style={{
            filter: isDark ? "contrast(1.05) saturate(0.9)" : "none",
          }}
        />
        {/* Subtle vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isDark
              ? "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.15) 100%)"
              : "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.06) 100%)",
          }}
        />
      </div>

      {/* Song info */}
      <div className="px-1">
        <h3
          className="font-serif text-xs md:text-sm tracking-wide leading-snug mb-1"
          style={{
            fontVariant: "small-caps",
            color: isDark ? "#3a3a3a" : "#3D3D3D",
          }}
        >
          {track.title}
        </h3>
        <p className="font-sans text-[10px] md:text-[11px] text-faded-brown tracking-wide">
          {track.artist}
        </p>

        {/* Timestamp */}
        <p
          className="font-handwritten text-[11px] md:text-xs mt-3"
          style={{ color: isDark ? "#8a7a6a" : "#b0a090" }}
        >
          {timestamp}
        </p>

        {/* Handwritten caption */}
        <p
          className="font-handwritten text-sm md:text-base mt-1 leading-snug"
          style={{ color: isDark ? "#6a6a6a" : "#a09080" }}
        >
          &ldquo;{caption}&rdquo;
        </p>
      </div>

      {/* Tiny Spotify indicator */}
      <div className="absolute bottom-2.5 right-3 opacity-25 hover:opacity-40 transition-opacity">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-faded-brown">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      </div>
    </motion.a>
  );
}
