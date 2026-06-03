"use client";

import { useEffect, useRef } from "react";
import { useAudioContext } from "@/components/wrapped/AudioContext";

export function useSlideAudio(previewUrl: string | undefined, isActive: boolean) {
  const { isMuted, audioUnlocked } = useAudioContext();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!previewUrl) return;
    if (!audioRef.current) {
      const audio = new Audio(previewUrl);
      audio.loop = true;
      audio.volume = 0;
      audioRef.current = audio;
    }
  }, [previewUrl]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeInterval.current) {
      clearInterval(fadeInterval.current);
    }

    if (isActive && !isMuted && audioUnlocked) {
      // Fade in to 0.6 over 800ms
      audio.play().catch(() => {});
      let vol = audio.volume;
      const step = 0.05;
      const steps = 0.6 / step;
      const intervalMs = 800 / steps;
      
      fadeInterval.current = setInterval(() => {
        vol += step;
        if (vol >= 0.6) {
          audio.volume = 0.6;
          if (fadeInterval.current) clearInterval(fadeInterval.current);
        } else {
          audio.volume = vol;
        }
      }, intervalMs);
    } else {
      // Fade out to 0 over 600ms
      let vol = audio.volume;
      if (vol === 0) {
        audio.pause();
        return;
      }
      const step = 0.05;
      const steps = 0.6 / step;
      const intervalMs = 600 / steps;

      fadeInterval.current = setInterval(() => {
        vol -= step;
        if (vol <= 0) {
          audio.volume = 0;
          audio.pause();
          if (fadeInterval.current) clearInterval(fadeInterval.current);
        } else {
          audio.volume = vol;
        }
      }, intervalMs);
    }
  }, [isActive, isMuted]);

  useEffect(() => {
    return () => {
      if (fadeInterval.current) clearInterval(fadeInterval.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
}
