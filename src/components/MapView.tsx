import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { RouteStop } from '@/types';

interface MapViewProps {
  stops: RouteStop[];
  selectedStopIdx: number | null;
  onMarkerClick: (idx: number) => void;
}

function createNumberedIcon(number: number, state: 'upcoming' | 'next' | 'completed' | 'skipped'): L.DivIcon {
  let bg = '#0891b2';
  let color = '#ffffff';
  let content: string;

  if (state === 'completed') {
    content = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
    bg = '#16a34a';
  } else if (state === 'skipped') {
    bg = '#9ca3af';
    content = `<span style="font-size:14px;font-weight:700;opacity:0.7">${number}</span>`;
  } else if (state === 'next') {
    bg = '#f59e0b';
    content = `<span style="font-size:14px;font-weight:700">${number}</span>`;
  } else {
    content = `<span style="font-size:14px;font-weight:700">${number}</span>`;
  }

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width:32px;height:32px;border-radius:50% 50% 50% 0;
        background:${bg};color:${color};
        display:flex;align-items:center;justify-content:center;
        transform:rotate(-45deg);
        box-shadow:0 2px 6px rgba(0,0,0,0.3);
        border:2px solid white;
        ${state === 'next' ? 'animation:pulse 2s infinite;' : ''}
      ">
        <div style="transform:rotate(45deg);display:flex;align-items:center;justify-content:center;">
          ${content}
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
}

export default function MapView({ stops, selectedStopIdx, onMarkerClick }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const polylineRef = useRef<L.Polyline | null>(null);

  const completedCount = stops.filter((s) => s.status === 'completed').length;
  const firstUpcomingIdx = stops.findIndex((s) => s.status === 'upcoming');

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, {
      zoomControl: false,
      attributionControl: true,
    }).setView([35.8989, 14.5144], 11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);
    L.control.zoom({ position: 'bottomright' }).addTo(map);
    mapRef.current = map;
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear old markers
    markersRef.current.forEach((m) => map.removeLayer(m));
    markersRef.current = [];
    if (polylineRef.current) {
      map.removeLayer(polylineRef.current);
      polylineRef.current = null;
    }

    if (stops.length === 0) return;

    // Determine display number for upcoming stops (sequential)
    let upcomingNum = completedCount + 1;

    stops.forEach((stop, idx) => {
      let state: 'upcoming' | 'next' | 'completed' | 'skipped';
      let displayNum = 0;

      if (stop.status === 'completed') {
        state = 'completed';
        displayNum = 0;
      } else if (stop.status === 'skipped') {
        state = 'skipped';
        displayNum = idx + 1;
      } else {
        state = idx === firstUpcomingIdx ? 'next' : 'upcoming';
        displayNum = upcomingNum;
        upcomingNum++;
      }

      const marker = L.marker([stop.place.latitude, stop.place.longitude], {
        icon: createNumberedIcon(displayNum, state),
      }).addTo(map);

      marker.on('click', () => onMarkerClick(idx));
      markersRef.current.push(marker);
    });

    // Draw route line through upcoming stops only (skip completed and skipped)
    const routePoints = stops
      .filter((s) => s.status === 'upcoming')
      .map((s) => [s.place.latitude, s.place.longitude] as [number, number]);

    if (routePoints.length >= 2) {
      polylineRef.current = L.polyline(routePoints, {
        color: '#0891b2',
        weight: 3,
        opacity: 0.7,
        dashArray: '8 6',
      }).addTo(map);
    }

    // Fit bounds to all non-skipped stops
    const fitPoints = stops
      .filter((s) => s.status !== 'skipped')
      .map((s) => [s.place.latitude, s.place.longitude] as [number, number]);

    if (fitPoints.length > 0) {
      const bounds = L.latLngBounds(fitPoints);
      map.fitBounds(bounds, { padding: [60, 80] });
    }
  }, [stops, completedCount, firstUpcomingIdx, onMarkerClick]);

  return <div ref={containerRef} className="h-full w-full" />;
}
