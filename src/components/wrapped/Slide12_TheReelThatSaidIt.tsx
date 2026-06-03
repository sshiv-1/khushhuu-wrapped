"use client";

import { useSlideAudio } from "@/hooks/useSlideAudio";
import { motion } from "framer-motion";

const cards = [
  {
    type: "video",
    src: "/01.mp4",
    lyric: "Opposites always attract, how you happy, then get mad?\nBut I want you bad and she wanna make up"
  },
  {
    type: "video",
    src: "/02.mp4",
    lyric: "I'ma crash out 'cause you mine\nI'ma pull up, get behind you"
  },
  {
    type: "video",
    src: "/03.mp4",
    lyric: "How do you feel?\nIs it anything like I feel?\nOr should I chill?"
  },
  {
    type: "image",
    src: "/04.jpeg",
    lyric: "Think I like you best when you're dressed in black from head to toe\nThink I like you best when you're just with me and no one else"
  },
  {
    type: "image",
    src: "/05.jpeg",
    lyric: "You'll never love yourself half as much as I love you"
  },
  {
    type: "image",
    src: "/06.jpeg",
    lyric: "You be on my back like a cardigan"
  },
  {
    type: "image",
    src: "/07.jpeg",
    lyric: "And I'll take some time\nJust to be thankful\nThat I had days full of you, you"
  }
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function Slide12_TheSoundtrack({ isActive = false, previewUrl }: { isActive?: boolean, previewUrl?: string }) {
  useSlideAudio(previewUrl, isActive);
  return (
    <div className="wrapped-slide bg-sp-dark flex-col justify-center relative overflow-hidden">
      
      {/* Header */}
      <motion.div
        className="w-full text-center px-6 mb-8 mt-12 md:mt-0 md:mb-12"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: "easeOut" as const }}
      >
        <p className="font-sans text-sm md:text-base uppercase tracking-[0.25em] text-sp-green font-semibold">
          The Soundtrack To This
        </p>
      </motion.div>

      {/* Cards Scroll Container */}
      <motion.div
        className="flex w-full overflow-x-auto gap-4 px-8 pb-8 items-start"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        <style dangerouslySetInnerHTML={{ __html: `::-webkit-scrollbar { display: none; }` }} />
        
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            className="flex-shrink-0 flex flex-col overflow-hidden"
            style={{
              width: 280,
              backgroundColor: "#1a1a1a",
              borderRadius: 12,
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
            whileHover={{ scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } }}
          >
            {/* Media */}
            <div className="w-full relative bg-black" style={{ aspectRatio: card.type === "video" ? "9/16" : "4/5" }}>
              {card.type === "video" ? (
                <video
                  src={card.src}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={card.src}
                  alt="Memory"
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable={false}
                />
              )}
            </div>

            {/* Lyric */}
            <div className="p-4 flex-grow flex items-center">
              <p className="font-serif italic text-sp-white text-sm whitespace-pre-wrap leading-relaxed">
                {card.lyric}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
