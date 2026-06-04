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
const ITEM_HEIGHT = 120;

export default function Slide_TheNicknames() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const wheelLock = useRef(false);
  const touchStartY = useRef(0);
  const isJaanu = activeIndex === JAANU_INDEX;

  // Measure container height
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.clientHeight);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Helper: scroll parent horizontal container by one slide
  const scrollParent = useCallback((direction: 1 | -1) => {
    const parent = containerRef.current?.closest("[data-horizontal-scroll]") as HTMLElement | null;
    if (parent) {
      parent.scrollBy({ left: direction * window.innerWidth, behavior: "smooth" });
    }
  }, []);

  // Wheel + touch handlers
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (wheelLock.current) return;

      if (e.deltaY > 30) {
        if (activeIndex < NICKNAMES.length - 1) {
          setActiveIndex((i) => Math.min(i + 1, NICKNAMES.length - 1));
          wheelLock.current = true;
          setTimeout(() => { wheelLock.current = false; }, 400);
        } else {
          // Already at JAANU — pass to parent horizontal scroll
          scrollParent(1);
          wheelLock.current = true;
          setTimeout(() => { wheelLock.current = false; }, 600);
        }
      } else if (e.deltaY < -30) {
        if (activeIndex > 0) {
          setActiveIndex((i) => Math.max(i - 1, 0));
          wheelLock.current = true;
          setTimeout(() => { wheelLock.current = false; }, 400);
        } else {
          // Already at first name — pass to parent horizontal scroll
          scrollParent(-1);
          wheelLock.current = true;
          setTimeout(() => { wheelLock.current = false; }, 600);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const diff = touchStartY.current - e.changedTouches[0].clientY;
      if (diff > 30) {
        if (activeIndex < NICKNAMES.length - 1) {
          setActiveIndex((i) => Math.min(i + 1, NICKNAMES.length - 1));
        } else {
          scrollParent(1);
        }
      } else if (diff < -30) {
        if (activeIndex > 0) {
          setActiveIndex((i) => Math.max(i - 1, 0));
        } else {
          scrollParent(-1);
        }
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeIndex, scrollParent]);

  // Transform offset — center the active item
  const listOffset = containerHeight / 2 - activeIndex * ITEM_HEIGHT - ITEM_HEIGHT / 2;

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

  const getFontSize = (nick: Nickname, index: number, active: boolean): string => {
    if (index === JAANU_INDEX && isJaanu) {
      return "clamp(8rem, 25vw, 20rem)";
    }
    if (!active) {
      return "clamp(2rem, 8vw, 6rem)";
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
      className="wrapped-slide flex-col !gap-0"
      style={{
        backgroundColor: isJaanu ? "#0a0800" : "#121212",
        transition: "background-color 0.8s ease",
        overflow: "hidden",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes jaanuPulse {
          0%, 100% { color: #f5c842; }
          50% { color: #fff8e1; }
        }
      `}} />

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

      {/* Controlled list container — overflow hidden, no scroll */}
      <div
        ref={containerRef}
        className="flex-1 w-full relative"
        style={{ overflow: "hidden" }}
      >
        {/* The moving list */}
        <div
          style={{
            transform: `translateY(${listOffset}px)`,
            transition: "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          {NICKNAMES.map((nick, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={idx}
                style={{
                  height: ITEM_HEIGHT,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={getItemStyle(idx)}
                  className="flex flex-col items-center gap-4"
                >
                  <span
                    style={{
                      fontFamily: nick.font,
                      fontSize: getFontSize(nick, idx, isActive),
                      fontStyle: nick.font.includes("Cormorant") || nick.font.includes("Playfair") ? "italic" : "normal",
                      fontWeight: nick.font.includes("Playfair") ? 700 : 400,
                      color: nick.color || "#FFFFFF",
                      whiteSpace: "nowrap",
                      display: "block",
                      textAlign: "center",
                      letterSpacing: nick.font.includes("Bebas") ? "0.15em" : "0.02em",
                      lineHeight: 1,
                      animation: idx === JAANU_INDEX && isJaanu ? "jaanuPulse 2s ease-in-out infinite" : "none",
                      transition: "font-size 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    }}
                  >
                    {nick.text}
                  </span>

                  {/* JAANU subtitle */}
                  <AnimatePresence>
                    {idx === JAANU_INDEX && isJaanu && (
                      <>
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
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5, delay: 2 }}
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontStyle: "italic",
                            fontSize: "0.75rem",
                            color: "#535353",
                            letterSpacing: "0.02em",
                            marginTop: "4px",
                          }}
                        >
                          (tried my ass off to integrate &apos;THE SONG&apos; here but as usual spotify ki mkc)
                        </motion.p>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
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
