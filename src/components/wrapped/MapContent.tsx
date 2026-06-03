"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Polyline, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default icon paths (not needed for CircleMarker but just in case)
delete (L.Icon.Default.prototype as Record<string, unknown>)._getIconUrl;

const JALANDHAR: [number, number] = [31.326, 75.5762];
const JAIPUR: [number, number] = [26.9124, 75.7873];

export default function MapContent() {
  // Center between the two cities
  const center: [number, number] = [
    (JALANDHAR[0] + JAIPUR[0]) / 2,
    (JALANDHAR[1] + JAIPUR[1]) / 2,
  ];

  return (
    <MapContainer
      center={center}
      zoom={5}
      zoomControl={false}
      scrollWheelZoom={false}
      dragging={false}
      doubleClickZoom={false}
      touchZoom={false}
      attributionControl={false}
      style={{ height: "50vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      {/* Dashed route line */}
      <Polyline
        positions={[JALANDHAR, JAIPUR]}
        pathOptions={{
          color: "#1DB954",
          weight: 2,
          opacity: 0.8,
          dashArray: "8, 8",
        }}
      />

      {/* Jalandhar — "you" */}
      <CircleMarker
        center={JALANDHAR}
        radius={6}
        pathOptions={{ color: "#1DB954", fillColor: "#1DB954", fillOpacity: 1, weight: 0 }}
      >
        <Tooltip
          direction="top"
          offset={[0, -10]}
          permanent
          className="map-label"
        >
          you
        </Tooltip>
      </CircleMarker>

      {/* Jaipur — "her" */}
      <CircleMarker
        center={JAIPUR}
        radius={6}
        pathOptions={{ color: "#1DB954", fillColor: "#1DB954", fillOpacity: 1, weight: 0 }}
      >
        <Tooltip
          direction="bottom"
          offset={[0, 10]}
          permanent
          className="map-label"
        >
          her
        </Tooltip>
      </CircleMarker>
    </MapContainer>
  );
}
