"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { useSlideAudio } from "@/hooks/useSlideAudio";
import { motion, useInView } from "framer-motion";

const MapContent = dynamic(() => import("./MapContent"), { ssr: false });

const BATHINDA_LAT = 30.2110;
const BATHINDA_LON = 74.9455;

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function useCountUp(target: number | null, duration: number, start: boolean): number {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start || target === null) return;
    let raf: number;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
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

export default function Slide_TheDistance({ isActive = false, previewUrl }: { isActive?: boolean, previewUrl?: string }) {
  useSlideAudio(previewUrl, isActive);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [herLocation, setHerLocation] = useState<[number, number] | null>(null);
  const [routeCoords, setRouteCoords] = useState<[number, number][] | null>(null);
  const [distance, setDistance] = useState<number | null>(null);

  useEffect(() => {
    if (typeof navigator !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setHerLocation([pos.coords.latitude, pos.coords.longitude]),
        () => setHerLocation([26.9124, 75.7873]) // fallback to Jaipur
      );
    } else {
      setHerLocation([26.9124, 75.7873]);
    }
  }, []);

  useEffect(() => {
    if (herLocation) {
      const fallback = () => {
        setDistance(haversine(BATHINDA_LAT, BATHINDA_LON, herLocation[0], herLocation[1]));
        setRouteCoords([[BATHINDA_LAT, BATHINDA_LON], herLocation]);
      };

      fetch(`https://router.project-osrm.org/route/v1/driving/${BATHINDA_LON},${BATHINDA_LAT};${herLocation[1]},${herLocation[0]}?overview=full&geometries=geojson`)
        .then(res => res.json())
        .then(data => {
          if (data.routes?.[0]) {
            const route = data.routes[0];
            setDistance(Math.round(route.distance / 1000));
            const coords = route.geometry.coordinates.map((c: [number, number]) => [c[1], c[0]]);
            setRouteCoords(coords);
          } else {
            fallback();
          }
        })
        .catch(fallback);
    }
  }, [herLocation]);

  const displayDistance = useCountUp(distance, 1200, isInView && distance !== null);

  return (
    <div className="wrapped-slide bg-sp-dark flex-col !gap-0" ref={ref}>
      {/* Map — top half */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut" as const }}
      >
        <MapContent herLocation={herLocation} routeCoords={routeCoords} />
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
          {distance !== null ? (
            `${displayDistance} km`
          ) : (
            <span className="text-3xl italic text-sp-muted font-serif">finding you...</span>
          )}
        </motion.h2>

        <motion.p variants={fadeUp} className="font-serif italic text-sm text-sp-white tracking-wide">
          can&apos;t wait to come see you
        </motion.p>

        <motion.div variants={fadeUp} className="flex items-center gap-12 mt-2">
          <span className="font-sans text-xs text-sp-muted tracking-wide">Bathinda</span>
          <span className="font-sans text-xs text-sp-muted tracking-wide">
            {herLocation ? "your location" : ""}
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
