"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-ivory paper-grain">
      {/* Subtle floating accent */}
      <motion.div
        className="absolute top-1/4 left-[15%] text-sage-light/30 text-8xl select-none pointer-events-none font-serif"
        animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        ~
      </motion.div>
      <motion.div
        className="absolute bottom-1/4 right-[12%] text-sage-light/20 text-7xl select-none pointer-events-none font-serif"
        animate={{ y: [0, 10, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        *
      </motion.div>

      {/* Centerpiece */}
      <div className="text-center px-6 z-10">
        <motion.p
          className="font-handwritten text-2xl md:text-3xl text-faded-brown mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        >
          a year of
        </motion.p>

        <motion.h1
          className="font-serif text-hero text-charcoal mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
        >
          One Year
        </motion.h1>

        <motion.p
          className="font-display text-quote text-charcoal-light italic max-w-lg mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.8 }}
        >
          of messages, reels, laughter,<br />
          and a thousand little moments<br />
          that became something beautiful
        </motion.p>

        {/* Tiny handwritten accent */}
        <motion.p
          className="font-handwritten text-lg text-faded-brown mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5 }}
        >
          a love archive
        </motion.p>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2, duration: 1.5 }}
      >
        <span className="font-sans text-xs uppercase tracking-[0.25em] text-faded-brown">
          Scroll
        </span>
        <motion.div
          className="w-px h-10 bg-faded-brown/30"
          animate={{ scaleY: [1, 1.6, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}