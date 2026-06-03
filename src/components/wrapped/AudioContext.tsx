"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  audioUnlocked: boolean;
  unlockAudio: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  
  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    if (!audioUnlocked) setAudioUnlocked(true);
  };
  
  const unlockAudio = () => setAudioUnlocked(true);

  return (
    <AudioContext.Provider value={{ isMuted, toggleMute, audioUnlocked, unlockAudio }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudioContext() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudioContext must be used within AudioProvider");
  return ctx;
}
