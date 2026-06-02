"use client";

import { motion } from "framer-motion";

const PLAYLIST_URL =
  "https://open.spotify.com/playlist/3q1my4gJY55vZMqUDXfP7w?si=c300bb02525d40ed&pt=85075c33892f78b3297062568f673a5c";

// Minimal Spotify logo — just the circle + bars, monochrome
function SpotifyIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="opacity-50"
    >
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

export default function SpotifyButton() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 bg-ivory">
      <motion.a
        href={PLAYLIST_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 px-8 py-4 border border-warm rounded-full text-faded-brown bg-ivory"
        style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)" }}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" as const }}
        whileHover={{ y: -3, boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}
      >
        <SpotifyIcon />
        <span className="font-sans text-xs uppercase tracking-[0.25em]">
          luv luv luv
        </span>
      </motion.a>
    </div>
  );
}
