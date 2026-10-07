import { useApp } from '@/store';
import { MALTA_PLACES } from '@/data/places';
import { Plus, X, MapPin, ArrowRight } from 'lucide-react';
import type { PlaceCategory } from '@/types';

const CATEGORY_COLORS: Record<PlaceCategory, string> = {
  City: 'bg-sky-100 text-sky-700',
  Garden: 'bg-green-100 text-green-700',
  Town: 'bg-blue-100 text-blue-700',
  Historic: 'bg-amber-100 text-amber-700',
  Cliffs: 'bg-stone-200 text-stone-700',
  'Fishing Village': 'bg-cyan-100 text-cyan-700',
  Nature: 'bg-emerald-100 text-emerald-700',
  Beach: 'bg-yellow-100 text-yellow-700',
  Attraction: 'bg-pink-100 text-pink-700',
  Ferry: 'bg-indigo-100 text-indigo-700',
  Gozo: 'bg-orange-100 text-orange-700',
};

export default function TripScreen() {
  const { selectedPlaces, addPlace, removePlace, createRoute, goHome } = useApp();
  const selectedIds = new Set(selectedPlaces.map((p) => p.id));

  return (
    <div className="flex min-h-screen flex-col">
      <div className="sticky top-0 z-10 border-b border-gray-100 bg-white/90 px-6 pb-4 pt-12 backdrop-blur">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Where do you want to go?</h2>
          <button
            onClick={goHome}
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          {selectedPlaces.length > 0
            ? `${selectedPlaces.length} place${selectedPlaces.length > 1 ? 's' : ''} selected`
            : 'Tap places to add them to your route'}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {selectedPlaces.length > 0 && (
          <div className="mb-4">
            <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Your Stops
            </p>
            <div className="space-y-2">
              {selectedPlaces.map((p, i) => (
                <div
                  key={p.id}
                  className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm ring-1 ring-gray-100"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-600 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{p.name}</p>
                    <p className="text-xs text-gray-400">{p.category}</p>
                  </div>
                  <button
                    onClick={() => removePlace(p.id)}
                    className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
          Malta, Gozo & Comino
        </p>
        <div className="space-y-2">
          {MALTA_PLACES.map((place) => {
            const isSelected = selectedIds.has(place.id);
            return (
              <button
                key={place.id}
                onClick={() => (isSelected ? removePlace(place.id) : addPlace(place))}
                className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition active:scale-[0.99] ${
                  isSelected
                    ? 'bg-cyan-50 ring-1 ring-cyan-200'
                    : 'bg-white shadow-sm ring-1 ring-gray-100 hover:ring-gray-200'
                }`}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${CATEGORY_COLORS[place.category]}`}>
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{place.name}</p>
                  <p className="text-xs text-gray-400">{place.category}</p>
                </div>
                <div className={`flex h-7 w-7 items-center justify-center rounded-full ${isSelected ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                  {isSelected ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {selectedPlaces.length >= 1 && (
        <div className="sticky bottom-0 border-t border-gray-100 bg-white/90 p-4 backdrop-blur">
          <button
            onClick={createRoute}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-600 py-4 text-lg font-bold text-white shadow-lg shadow-sky-500/20 transition active:scale-[0.98]"
          >
            Create My Route
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
