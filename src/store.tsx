import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { MaltaPlace, RouteStop } from '@/types';
import { MALTA_PLACES, DEMO_PLACE_IDS } from '@/data/places';
import { nearestNeighborOrder } from '@/lib/route';

type Screen = 'home' | 'plan' | 'trip' | 'essentials' | 'map';

interface AppState {
  screen: Screen;
  selectedPlaces: MaltaPlace[];
  stops: RouteStop[];
  selectedStopIdx: number | null;
  goHome: () => void;
  goPlan: () => void;
  startBuildRoute: () => void;
  goMap: () => void;
  goEssentials: () => void;
  addPlace: (place: MaltaPlace) => void;
  removePlace: (placeId: string) => void;
  clearSelection: () => void;
  createRoute: () => void;
  createSuggestedRoute: (placeIds: string[]) => void;
  loadDemo: () => void;
  resetTrip: () => void;
  openStop: (idx: number) => void;
  closeStop: () => void;
  completeStop: (idx: number) => void;
  skipStop: (idx: number) => void;
}

const Ctx = createContext<AppState | null>(null);

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const saved = (() => {
    try { return JSON.parse(localStorage.getItem('malta-guide-trip-v1') || '{}'); } catch { return {}; }
  })();
  const [screen, setScreen] = useState<Screen>('home');
  const [selectedPlaces, setSelectedPlaces] = useState<MaltaPlace[]>(saved.selectedPlaces || []);
  const [stops, setStops] = useState<RouteStop[]>(saved.stops || []);
  const [selectedStopIdx, setSelectedStopIdx] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('malta-guide-trip-v1', JSON.stringify({ selectedPlaces, stops }));
  }, [selectedPlaces, stops]);

  const buildRoute = (places: MaltaPlace[]) => {
    const ordered = nearestNeighborOrder(places);
    setSelectedPlaces(places);
    setStops(ordered.map((place, i) => ({ place, status: 'upcoming' as const, originalIndex: i })));
    setSelectedStopIdx(null);
    setScreen('map');
  };

  const value = useMemo<AppState>(() => ({
    screen,
    selectedPlaces,
    stops,
    selectedStopIdx,
    goHome: () => { setScreen('home'); },
    goPlan: () => { setScreen('plan'); },
    startBuildRoute: () => { setScreen('trip'); },
    goMap: () => { setScreen(stops.length ? 'map' : 'trip'); },
    goEssentials: () => { setScreen('essentials'); },
    addPlace: (place) => {
      setSelectedPlaces((prev) =>
        prev.some((p) => p.id === place.id) ? prev : [...prev, place]
      );
    },
    removePlace: (placeId) => {
      setSelectedPlaces((prev) => prev.filter((p) => p.id !== placeId));
    },
    clearSelection: () => setSelectedPlaces([]),
    createRoute: () => buildRoute(selectedPlaces),
    createSuggestedRoute: (placeIds) => buildRoute(placeIds.map((id) => MALTA_PLACES.find((p) => p.id === id)).filter(Boolean) as MaltaPlace[]),
    loadDemo: () => buildRoute(DEMO_PLACE_IDS.map((id) => MALTA_PLACES.find((p) => p.id === id)).filter(Boolean) as MaltaPlace[]),
    resetTrip: () => { setSelectedPlaces([]); setStops([]); setSelectedStopIdx(null); localStorage.removeItem('malta-guide-trip-v1'); setScreen('home'); },
    openStop: (idx) => setSelectedStopIdx(idx),
    closeStop: () => setSelectedStopIdx(null),
    completeStop: (idx) => {
      setStops((prev) =>
        prev.map((s, i) => (i === idx ? { ...s, status: 'completed' as const } : s))
      );
      setSelectedStopIdx(null);
    },
    skipStop: (idx) => {
      setStops((prev) => {
        const updated = prev.map((s, i) =>
          i === idx ? { ...s, status: 'skipped' as const } : s
        );
        const remaining = updated.filter((s) => s.status === 'upcoming');
        const reordered = nearestNeighborOrder(remaining.map((s) => s.place));
        const reorderedStops: RouteStop[] = reordered.map((p) => {
          const orig = updated.find((s) => s.place.id === p.id)!;
          return { ...orig };
        });
        const completed = updated.filter((s) => s.status === 'completed');
        const skipped = updated.filter((s) => s.status === 'skipped');
        // Keep completed in their original order, then reordered remaining, then skipped at the end
        return [...completed, ...reorderedStops, ...skipped];
      });
      setSelectedStopIdx(null);
    },
  }), [screen, selectedPlaces, stops, selectedStopIdx]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
