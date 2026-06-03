"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Dynamic import — Leaflet needs window
const MapContent = dynamic(() => import("./MapContent"), { ssr: false });

// Haversine
const LAT1 = 31.326;
const LON1 = 75.5762;
const LAT2 = 26.9124;
const LON2 = 75.7873;

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

const DISTANCE = haversine(LAT1, LON1, LAT2, LON2); // ~494

function useCountUp(target: number, duration: number, start: boolean): number {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease out cubic
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return count;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function Slide_TheDistance() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const displayDistance = useCountUp(DISTANCE, 1200, isInView);

  return (
    <div className="wrapped-slide bg-sp-dark flex-col !gap-0" ref={ref}>
      {/* Map — top half */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut" as const }}
      >
        <MapContent />
      </motion.div>

      {/* Text — bottom half */}
      <motion.div
        className="flex flex-col items-center gap-5 text-center px-6 py-10"
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
        <motion.p variants={fadeUp} className="font-sans text-xs uppercase tracking-[0.25em] text-sp-green">
          How Far
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="font-serif italic font-normal text-sp-white leading-none"
          style={{ fontSize: "clamp(3.5rem, 10vw, 7rem)" }}
        >
          {displayDistance} km
        </motion.h2>

        <motion.p variants={fadeUp} className="font-serif italic text-sm text-sp-white tracking-wide">
          can&apos;t wait to come see you
        </motion.p>

        <motion.div variants={fadeUp} className="flex items-center gap-12 mt-2">
          <span className="font-sans text-xs text-sp-muted tracking-wide">Jalandhar</span>
          <span className="font-sans text-xs text-sp-muted tracking-wide">Jaipur</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
