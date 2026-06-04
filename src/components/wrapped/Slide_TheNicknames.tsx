"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Nickname {
  text: string;
  font: string;
  color?: string;
  short?: boolean;
}

const NICKNAMES: Nickname[] = [
  { text: "khushuu", font: "'Great Vibes', cursive" },
  { text: "MS KHUSHI SAINI", font: "'Special Elite', cursive" },
  { text: "MS JAGRITI KI HG", font: "'Yatra One', cursive" },
  { text: "sweetie", font: "'Pacifico', cursive" },
  { text: "bitch", font: "'Bebas Neue', sans-serif", short: true },
  { text: "aalu", font: "'Fredoka One', cursive", short: true },
  { text: "aalu bukhara", font: "'Righteous', cursive" },
  { text: "tiramisu", font: "'Cormorant Garamond', serif" },
  { text: "chipmunk", font: "'Boogaloo', cursive" },
  { text: "pucchu", font: "'Caveat', cursive", short: true },
  { text: "bb", font: "'VT323', monospace", short: true },
  { text: "baby", font: "'Dancing Script', cursive", short: true },
  { text: "mommy 😝", font: "'Press Start 2P', cursive" },
  { text: "khushupuchu", font: "'Satisfy', cursive" },
  { text: "cutu", font: "'Lobster', cursive", short: true },
  { text: "JAANU", font: "'Playfair Display', serif", color: "#f5c842", short: true },
];

const JAANU_INDEX = 15;

export default function Slide_TheNicknames() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const stopTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fadeInRef = useRef<NodeJS.Timeout | null>(null);
  const fadeOutRef = useRef<NodeJS.Timeout | null>(null);
  const isJaanu = activeIndex === JAANU_INDEX;

  // Scroll-based active detection — find closest item to container center
  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const children = container.querySelectorAll<HTMLDivElement>("[data-nick-idx]");
    if (!children.length) return;
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.top + containerRect.height / 2;
    let closest = 0;
    let closestDist = Infinity;
    children.forEach((child, i) => {
      const rect = child.getBoundingClientRect();
      const childCenter = rect.top + rect.height / 2;
      const dist = Math.abs(childCenter - containerCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // JAANU audio trigger
  useEffect(() => {
    if (activeIndex !== JAANU_INDEX) {
      // Clean up if scrolled away
      if (audioRef.current) {
        const audio = audioRef.current;
        if (fadeInRef.current) clearInterval(fadeInRef.current);
        if (fadeOutRef.current) clearInterval(fadeOutRef.current);
        if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current);
        const quickFade = setInterval(() => {
          if (audio.volume > 0.05) {
            audio.volume = Math.max(audio.volume - 0.1, 0);
          } else {
            clearInterval(quickFade);
            audio.pause();
          }
        }, 50);
        audioRef.current = null;
      }
      return;
    }

    const audio = new Audio("/jaanu.mp3");
    audio.currentTime = 38;
    audio.volume = 0;
    audioRef.current = audio;

    audio.play().catch(console.error);

    fadeInRef.current = setInterval(() => {
      if (audio.volume < 0.7) {
        audio.volume = Math.min(audio.volume + 0.07, 0.7);
      } else {
        if (fadeInRef.current) clearInterval(fadeInRef.current);
      }
    }, 100);

    stopTimeoutRef.current = setTimeout(() => {
      fadeOutRef.current = setInterval(() => {
        if (audio.volume > 0.05) {
          audio.volume = Math.max(audio.volume - 0.05, 0);
        } else {
          if (fadeOutRef.current) clearInterval(fadeOutRef.current);
          audio.pause();
        }
      }, 100);
    }, 25500);

    return () => {
      if (fadeInRef.current) clearInterval(fadeInRef.current);
      if (fadeOutRef.current) clearInterval(fadeOutRef.current);
      if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current);
      audio.pause();
      audioRef.current = null;
    };
  }, [activeIndex]);

  const getItemStyle = useCallback(
    (index: number): React.CSSProperties => {
      if (isJaanu && index !== JAANU_INDEX) {
        return {
          opacity: 0,
          transform: "scale(0.3)",
          filter: "blur(30px)",
          transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        };
      }
      const diff = Math.abs(index - activeIndex);
      if (diff === 0) {
        return {
          opacity: 1,
          transform: "scale(1)",
          filter: "blur(0px)",
          transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        };
      } else if (diff === 1) {
        return {
          opacity: 0.15,
          transform: "scale(0.7)",
          filter: "blur(12px)",
          transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        };
      } else {
        return {
          opacity: 0.05,
          transform: "scale(0.5)",
          filter: "blur(20px)",
          transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        };
      }
    },
    [activeIndex, isJaanu]
  );

  const getFontSize = (nick: Nickname, index: number): string => {
    if (index === JAANU_INDEX && isJaanu) {
      return "clamp(8rem, 25vw, 20rem)";
    }
    if (nick.short) {
      return "clamp(6rem, 20vw, 16rem)";
    }
    if (nick.text === "mommy 😝") {
      return "clamp(1.5rem, 4vw, 2.5rem)";
    }
    return "clamp(4rem, 15vw, 12rem)";
  };

  return (
    <div
      className="wrapped-slide flex-col !gap-0 overflow-hidden"
      style={{
        backgroundColor: isJaanu ? "#0a0800" : "#121212",
        transition: "background-color 0.8s ease",
      }}
    >
      {/* Header — fades away on JAANU */}
      <motion.div
        className="w-full text-center px-6 pt-14 pb-4"
        animate={{ opacity: isJaanu ? 0 : 1, y: isJaanu ? -20 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="font-sans text-sm uppercase tracking-[0.25em] text-sp-green font-semibold">
          Things That Mean You
        </p>
      </motion.div>

      {/* Vertical scroll snap container */}
      <div
        ref={scrollRef}
        className="flex-1 w-full overflow-y-scroll snap-y snap-mandatory"
        style={{
          height: isJaanu ? "85vh" : "70vh",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          transition: "height 0.5s ease",
        }}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          .nicknames-container::-webkit-scrollbar { display: none; }
          @keyframes jaanuPulse {
            0%, 100% { color: #f5c842; }
            50% { color: #fff8e1; }
          }
        `}} />

        {/* Top spacer — lets first item center */}
        <div style={{ height: "35vh", flexShrink: 0 }} />

        {NICKNAMES.map((nick, idx) => (
          <div
            key={idx}
            data-nick-idx={idx}
            className="snap-center flex items-center justify-center"
            style={{ height: "30vh", minHeight: "30vh" }}
          >
            <div
              style={getItemStyle(idx)}
              className="flex flex-col items-center gap-4"
            >
              <span
                style={{
                  fontFamily: nick.font,
                  fontSize: getFontSize(nick, idx),
                  fontStyle: nick.font.includes("Cormorant") || nick.font.includes("Playfair") ? "italic" : "normal",
                  fontWeight: nick.font.includes("Playfair") ? 700 : 400,
                  color: nick.color || "#FFFFFF",
                  whiteSpace: "nowrap",
                  display: "block",
                  textAlign: "center",
                  letterSpacing: nick.font.includes("Bebas") ? "0.15em" : "0.02em",
                  lineHeight: 1,
                  animation: idx === JAANU_INDEX && isJaanu ? "jaanuPulse 2s ease-in-out infinite" : "none",
                }}
              >
                {nick.text}
              </span>

              {/* "that's the one." subtitle on JAANU */}
              <AnimatePresence>
                {idx === JAANU_INDEX && isJaanu && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: "italic",
                      fontSize: "clamp(0.9rem, 2vw, 1.3rem)",
                      color: "#FFFFFF",
                      letterSpacing: "0.05em",
                    }}
                  >
                    that&apos;s the one.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}

        {/* Bottom spacer — lets last item center */}
        <div style={{ height: "35vh", flexShrink: 0 }} />
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
