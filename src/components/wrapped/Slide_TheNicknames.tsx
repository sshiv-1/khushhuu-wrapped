"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Nickname {
  text: string;
  font: string;
  color?: string;
  larger?: boolean;
}

const NICKNAMES: Nickname[] = [
  { text: "khushuu", font: "'Great Vibes', cursive" },
  { text: "MS KHUSHI SAINI", font: "'Special Elite', cursive" },
  { text: "MS JAGRITI KI HG", font: "'Yatra One', cursive" },
  { text: "sweetie", font: "'Pacifico', cursive" },
  { text: "bitch", font: "'Bebas Neue', sans-serif" },
  { text: "aalu", font: "'Fredoka One', cursive" },
  { text: "aalu bukhara", font: "'Righteous', cursive" },
  { text: "tiramisu", font: "'Cormorant Garamond', serif" },
  { text: "chipmunk", font: "'Boogaloo', cursive" },
  { text: "pucchu", font: "'Caveat', cursive" },
  { text: "bb", font: "'VT323', monospace" },
  { text: "baby", font: "'Dancing Script', cursive" },
  { text: "mommy 😝", font: "'Press Start 2P', cursive" },
  { text: "khushupuchu", font: "'Satisfy', cursive" },
  { text: "cutu", font: "'Lobster', cursive" },
  { text: "JAANU", font: "'Playfair Display', serif", color: "#f5c842", larger: true },
];

const JAANU_INDEX = 15;

export default function Slide_TheNicknames() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const stopTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fadeOutRef = useRef<NodeJS.Timeout | null>(null);

  // Intersection Observer to detect centered name
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = itemRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { root: container, threshold: 0.8 }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Audio trigger on JAANU
  useEffect(() => {
    if (activeIndex !== JAANU_INDEX) {
      // Clean up if scrolled away
      if (audioRef.current) {
        const audio = audioRef.current;
        if (fadeOutRef.current) clearInterval(fadeOutRef.current);
        if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current);
        const quickFade = setInterval(() => {
          if (audio.volume > 0.05) {
            audio.volume = Math.max(audio.volume - 0.1, 0);
          } else {
            clearInterval(quickFade);
            audio.pause();
            audioRef.current = null;
          }
        }, 50);
      }
      return;
    }

    // JAANU is active — play audio
    const audio = new Audio("/jaanu.mp3");
    audio.currentTime = 38;
    audio.volume = 0;
    audioRef.current = audio;

    const fadeIn = setInterval(() => {
      if (audio.volume < 0.7) {
        audio.volume = Math.min(audio.volume + 0.07, 0.7);
      } else {
        clearInterval(fadeIn);
      }
    }, 100);

    audio.play().catch(console.error);

    // Fade out and stop at ~1:05 (27 seconds after 0:38)
    stopTimeoutRef.current = setTimeout(() => {
      fadeOutRef.current = setInterval(() => {
        if (audio.volume > 0.05) {
          audio.volume = Math.max(audio.volume - 0.07, 0);
        } else {
          clearInterval(fadeOutRef.current!);
          audio.pause();
        }
      }, 100);
    }, 25500);

    return () => {
      clearInterval(fadeIn);
      if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current);
      if (fadeOutRef.current) clearInterval(fadeOutRef.current);
      audio.pause();
      audioRef.current = null;
    };
  }, [activeIndex]);

  const getItemStyle = useCallback(
    (index: number): React.CSSProperties => {
      const diff = Math.abs(index - activeIndex);
      if (diff === 0) {
        return {
          opacity: 1,
          transform: "scale(1)",
          filter: "blur(0px)",
          transition: "all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
        };
      } else if (diff === 1) {
        return {
          opacity: 0.3,
          transform: "scale(0.85)",
          filter: "blur(4px)",
          transition: "all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
        };
      } else {
        return {
          opacity: 0.1,
          transform: "scale(0.75)",
          filter: "blur(8px)",
          transition: "all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
        };
      }
    },
    [activeIndex]
  );

  return (
    <div className="wrapped-slide bg-sp-dark flex-col !gap-0 overflow-hidden">
      {/* Header */}
      <motion.div
        className="w-full text-center px-6 pt-14 pb-4"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: "easeOut" as const }}
      >
        <p className="font-sans text-sm uppercase tracking-[0.25em] text-sp-green font-semibold">
          Things That Mean You
        </p>
      </motion.div>

      {/* Vertical scroll snap container */}
      <div
        ref={scrollRef}
        className="flex-1 w-full overflow-y-auto snap-y snap-mandatory"
        style={{
          maxHeight: "70vh",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          .nicknames-scroll::-webkit-scrollbar { display: none; }
        `}} />

        {NICKNAMES.map((nick, idx) => (
          <div
            key={idx}
            ref={(el) => { itemRefs.current[idx] = el; }}
            className="snap-center flex items-center justify-center nicknames-scroll"
            style={{ height: "33.333%", minHeight: "33.333%" }}
          >
            <div style={getItemStyle(idx)}>
              <span
                style={{
                  fontFamily: nick.font,
                  fontSize: nick.larger ? "clamp(3rem, 8vw, 5rem)" : nick.text === "mommy 😝" ? "clamp(1rem, 3vw, 1.5rem)" : "clamp(2rem, 6vw, 3.5rem)",
                  fontStyle: nick.font.includes("Cormorant") || nick.font.includes("Playfair") ? "italic" : "normal",
                  fontWeight: nick.font.includes("Playfair") ? 700 : 400,
                  color: nick.color || "#FFFFFF",
                  whiteSpace: "nowrap",
                  display: "block",
                  textAlign: "center",
                  letterSpacing: nick.font.includes("Bebas") ? "0.15em" : "0.02em",
                }}
              >
                {nick.text}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll indicator — disappears when JAANU is reached */}
      <AnimatePresence>
        {activeIndex < JAANU_INDEX && (
          <motion.div
            className="pb-8 pt-2 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#B3B3B3"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <polyline points="6 9 12 15 18 9" />
            </motion.svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
