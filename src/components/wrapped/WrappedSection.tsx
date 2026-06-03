"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Slide01_TheYear from "./Slide01_TheYear";
import Slide02_TheMessages from "./Slide02_TheMessages";
import Slide03_TheReels from "./Slide03_TheReels";
import Slide04_TheHour from "./Slide04_TheHour";
import Slide_TheDistance from "./Slide_TheDistance";
import Slide05_TheWeekBegins from "./Slide05_TheWeekBegins";
import Slide06_TheWeekCount from "./Slide06_TheWeekCount";
import Slide07_TheSplit from "./Slide07_TheSplit";
import Slide08_ThePeakHour from "./Slide08_ThePeakHour";
import Slide09_TheReelsWeek from "./Slide09_TheReelsWeek";
import Slide10_TheEmoji from "./Slide10_TheEmoji";
import Slide11_TheHearts from "./Slide11_TheHearts";
import Slide12_TheReelThatSaidIt from "./Slide12_TheReelThatSaidIt";
import Slide13_TheTransition from "./Slide13_TheTransition";
import Slide14_ThePlaylist from "./Slide14_ThePlaylist";
import { AudioProvider, useAudioContext } from "./AudioContext";
import { SpotifyTrack } from "@/lib/spotify";

const TOTAL_SLIDES = 15;

function MuteToggle() {
  const { isMuted, toggleMute } = useAudioContext();
  return (
    <button 
      onClick={toggleMute}
      className="fixed top-6 right-6 z-50 bg-[#121212]/80 backdrop-blur-md border border-white/10 p-2.5 rounded-full text-white hover:scale-105 transition-transform"
      aria-label={isMuted ? "Unmute" : "Mute"}
    >
      {isMuted ? (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
      ) : (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
      )}
    </button>
  );
}

export default function WrappedSection({ tracks = [] }: { tracks?: SpotifyTrack[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    setActiveSlide(idx);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <AudioProvider>
      <MuteToggle />
      <div className="relative">
        <div ref={scrollRef} className="wrapped-scroll" aria-label="One Year — Wrapped">
          {/* Part One: The Year */}
          <Slide01_TheYear isActive={activeSlide === 0} previewUrl={tracks[0]?.previewUrl} />
          <Slide02_TheMessages isActive={activeSlide === 1} previewUrl={tracks[1]?.previewUrl} />
          <Slide03_TheReels isActive={activeSlide === 2} previewUrl={tracks[2]?.previewUrl} />
          <Slide04_TheHour isActive={activeSlide === 3} previewUrl={tracks[3]?.previewUrl} />

          {/* Part Two: The Week */}
          <Slide_TheDistance isActive={activeSlide === 4} previewUrl={tracks[4]?.previewUrl} />
          
          {/* Transition: no audio */}
          <Slide05_TheWeekBegins isActive={activeSlide === 5} />
          
          <Slide06_TheWeekCount isActive={activeSlide === 6} previewUrl={tracks[5]?.previewUrl} />
          <Slide07_TheSplit isActive={activeSlide === 7} previewUrl={tracks[6]?.previewUrl} />
          <Slide08_ThePeakHour isActive={activeSlide === 8} previewUrl={tracks[7]?.previewUrl} />
          <Slide09_TheReelsWeek isActive={activeSlide === 9} previewUrl={tracks[8]?.previewUrl} />
          <Slide10_TheEmoji isActive={activeSlide === 10} previewUrl={tracks[9]?.previewUrl} />
          <Slide11_TheHearts isActive={activeSlide === 11} previewUrl={tracks[10]?.previewUrl} />
          <Slide12_TheReelThatSaidIt isActive={activeSlide === 12} previewUrl={tracks[11]?.previewUrl} />

          {/* Part Three: The Music */}
          {/* Transition: no audio */}
          <Slide13_TheTransition isActive={activeSlide === 13} />
          
          <Slide14_ThePlaylist isActive={activeSlide === 14} previewUrl={tracks[12]?.previewUrl} />
        </div>

        {/* Navigation dots */}
        <div className="wrapped-dots" aria-hidden>
          {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
            <div
              key={i}
              className={`wrapped-dot ${activeSlide === i ? "wrapped-dot--active" : ""}`}
            />
          ))}
        </div>
      </div>
    </AudioProvider>
  );
}
