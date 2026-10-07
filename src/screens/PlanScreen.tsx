import { useApp } from '@/store';

export default function PlanScreen() {
  const { goHome } = useApp();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="mb-2 text-4xl">🧭</p>
      <h2 className="text-2xl font-bold text-gray-900">Coming Soon</h2>
      <p className="mt-2 text-gray-500">
        Plan My Day will automatically build a Malta itinerary for you.
      </p>
      <button
        onClick={goHome}
        className="mt-8 rounded-xl bg-sky-600 px-6 py-3 font-semibold text-white shadow-lg shadow-sky-500/20 active:scale-[0.98]"
      >
        Back to Home
      </button>
    </div>
  );
}
