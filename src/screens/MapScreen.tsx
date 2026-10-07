import { useApp } from '@/store';
import MapView from '@/components/MapView';
import { Navigation, Check, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function MapScreen() {
  const { stops, selectedStopIdx, openStop, closeStop, completeStop, skipStop, goHome } = useApp();
  const [showNavMsg, setShowNavMsg] = useState(false);

  const navigateToStop = () => {
    if (!activeStop) return;
    const { latitude, longitude } = activeStop.place;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`, '_blank', 'noopener,noreferrer');
    setShowNavMsg(true);
  };

  const completedCount = stops.filter((s) => s.status === 'completed').length;
  const totalCount = stops.length;
  const activeStopIdx = selectedStopIdx !== null ? selectedStopIdx : null;
  const activeStop = activeStopIdx !== null ? stops[activeStopIdx] : null;

  // Compute display number for the active stop
  let displayNum = 0;
  if (activeStop && activeStop.status === 'upcoming') {
    let n = completedCount + 1;
    for (let i = 0; i < stops.length; i++) {
      if (stops[i].status === 'completed') continue;
      if (i === activeStopIdx) { displayNum = n; break; }
      if (stops[i].status === 'upcoming') n++;
    }
  }

  return (
    <div className="relative flex h-screen flex-col">
      {/* Map fills the screen */}
      <div className="relative flex-1">
        <MapView
          stops={stops}
          selectedStopIdx={selectedStopIdx}
          onMarkerClick={openStop}
        />

        {/* Top bar with progress */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[1000] p-4">
          <div className="pointer-events-auto mx-auto flex max-w-md items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
            <button
              onClick={goHome}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
            >
              <ChevronDown className="h-5 w-5" />
            </button>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900">
                {completedCount} of {totalCount} completed
              </p>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
                  style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom card when a stop is selected */}
      {activeStop && (
        <div className="absolute inset-x-0 bottom-0 z-[1001] animate-slide-up">
          <div className="mx-auto max-w-md rounded-t-3xl bg-white p-5 shadow-2xl ring-1 ring-gray-100">
            <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-gray-200" />

            <div className="flex items-start justify-between">
              <div>
                <div className="mb-1 flex items-center gap-2">
                  {activeStop.status === 'completed' ? (
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-white">
                      <Check className="h-4 w-4" strokeWidth={3} />
                    </span>
                  ) : activeStop.status === 'skipped' ? (
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-400 text-white">
                      <X className="h-4 w-4" strokeWidth={3} />
                    </span>
                  ) : (
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-600 text-sm font-bold text-white">
                      {displayNum}
                    </span>
                  )}
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Stop {displayNum || '—'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{activeStop.place.name}</h3>
                <p className="text-sm text-gray-400">{activeStop.place.category}</p>
              </div>
              <button
                onClick={closeStop}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {showNavMsg && (
              <div className="mt-3 rounded-xl bg-sky-50 px-4 py-2.5 text-center text-sm font-medium text-sky-700">
                Opening directions in Google Maps…
              </div>
            )}

            <div className="mt-4 flex gap-3">
              <button
                onClick={navigateToStop}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-sky-600 py-3 font-semibold text-white transition active:scale-[0.97]"
              >
                <Navigation className="h-5 w-5" />
                Navigate
              </button>
              {activeStop.status === 'upcoming' && (
                <>
                  <button
                    onClick={() => completeStop(activeStopIdx!)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 py-3 font-semibold text-white transition active:scale-[0.97]"
                  >
                    <Check className="h-5 w-5" strokeWidth={3} />
                    Completed
                  </button>
                  <button
                    onClick={() => skipStop(activeStopIdx!)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-200 py-3 font-semibold text-gray-700 transition active:scale-[0.97]"
                  >
                    <X className="h-5 w-5" strokeWidth={3} />
                    Skip
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
