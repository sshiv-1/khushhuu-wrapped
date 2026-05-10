"use client";

import { useMemo } from "react";
import HeroSection from "@/components/hero/HeroSection";
import TheReceipts from "@/components/chapters/TheReceipts";
import TheShapeOfUs from "@/components/chapters/TheShapeOfUs";
import TheVocabulary from "@/components/chapters/TheVocabulary";
import TheLateNight from "@/components/chapters/TheLateNight";
import MemoryCards from "@/components/chapters/MemoryCards";
import ScallopDivider from "@/components/scrapbook/ScallopDivider";
import { generateStory } from "@/lib/story-engine";

export default function HomePage() {
  const story = useMemo(() => generateStory(), []);

  const receipts = story.chapters[0];
  const shape = story.chapters[1];
  const vocab = story.chapters[2];
  const latenight = story.chapters[3];
  const memories = story.chapters[4];

  return (
    <main className="bg-ivory">
      <HeroSection />
      <ScallopDivider />
      <TheReceipts stats={story.stats} chapter={receipts} />
      <ScallopDivider />
      <TheShapeOfUs stats={story.stats} chapter={shape} />
      <ScallopDivider />
      <TheVocabulary stats={story.stats} chapter={vocab} />
      <ScallopDivider />
      <TheLateNight stats={story.stats} chapter={latenight} />
      <ScallopDivider />
      <MemoryCards messages={story.messages} chapter={memories} />

      {/* Footer */}
      <footer className="py-16 text-center bg-cream paper-grain">
        <p className="font-handwritten text-xl text-faded-brown">
          made with care
        </p>
        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-faded-brown/50 mt-3">
          A year in messages
        </p>
      </footer>
    </main>
  );
}