"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Polyline, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;

const JAIPUR: [number, number] = [26.9124, 75.7873];

function FitBounds({ myLocation }: { myLocation: [number, number] }) {
  const map = useMap();
  
  useEffect(() => {
    if (myLocation) {
      const bounds = L.latLngBounds([myLocation, JAIPUR]);
      map.fitBounds(bounds, { padding: [50, 50], animate: true, duration: 1 });
    }
  }, [map, myLocation]);

  return null;
}

export default function MapContent({ myLocation }: { myLocation: [number, number] | null }) {
  // Center fallback or map center
  const center: [number, number] = myLocation 
    ? [ (myLocation[0] + JAIPUR[0]) / 2, (myLocation[1] + JAIPUR[1]) / 2 ]
    : [26.9124, 75.7873]; // default around Jaipur if loading

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

      {myLocation && (
        <>
          <FitBounds myLocation={myLocation} />
          
          <Polyline
            positions={[myLocation, JAIPUR]}
            pathOptions={{
              color: "#1DB954",
              weight: 2,
              opacity: 0.8,
              dashArray: "8, 8",
            }}
          />

          <CircleMarker
            center={myLocation}
            radius={6}
            pathOptions={{ color: "#1DB954", fillColor: "#1DB954", fillOpacity: 1, weight: 0 }}
          >
            <Tooltip
              direction="top"
              offset={[0, -10]}
              permanent
              className="map-label"
            >
              your current location
            </Tooltip>
          </CircleMarker>
        </>
      )}

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
          Jaipur, Rajasthan
        </Tooltip>
      </CircleMarker>
    </MapContainer>
  );
}
