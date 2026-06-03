"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Polyline, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;

const BATHINDA: [number, number] = [30.2110, 74.9455];

function FitBounds({ herLocation }: { herLocation: [number, number] }) {
  const map = useMap();
  
  useEffect(() => {
    if (herLocation) {
      const bounds = L.latLngBounds([BATHINDA, herLocation]);
      map.fitBounds(bounds, { padding: [50, 50], animate: true, duration: 1 });
    }
  }, [map, herLocation]);

  return null;
}

export default function MapContent({ 
  herLocation, 
  routeCoords 
}: { 
  herLocation: [number, number] | null;
  routeCoords: [number, number][] | null;
}) {
  const center: [number, number] = herLocation 
    ? [ (BATHINDA[0] + herLocation[0]) / 2, (BATHINDA[1] + herLocation[1]) / 2 ]
    : BATHINDA;

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

      {herLocation && (
        <>
          <FitBounds herLocation={herLocation} />
          
          {routeCoords && (
            <Polyline
              positions={routeCoords}
              pathOptions={{
                color: "#1DB954",
                weight: 2,
                opacity: 0.8,
                dashArray: "8, 8",
              }}
            />
          )}

          {/* "Her" — browser geolocation */}
          <CircleMarker
            center={herLocation}
            radius={6}
            pathOptions={{ color: "#1DB954", fillColor: "#1DB954", fillOpacity: 1, weight: 0 }}
          >
            <Tooltip
              direction="bottom"
              offset={[0, 10]}
              permanent
              className="map-label"
            >
              your location
            </Tooltip>
          </CircleMarker>
        </>
      )}

      {/* Bathinda — "me" */}
      <CircleMarker
        center={BATHINDA}
        radius={6}
        pathOptions={{ color: "#1DB954", fillColor: "#1DB954", fillOpacity: 1, weight: 0 }}
      >
        <Tooltip
          direction="top"
          offset={[0, -10]}
          permanent
          className="map-label"
        >
          Bathinda, Punjab
        </Tooltip>
      </CircleMarker>
    </MapContainer>
  );
}
