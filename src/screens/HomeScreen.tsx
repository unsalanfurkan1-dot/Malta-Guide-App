import { useApp } from '@/store';
import { Compass, Route, Sparkles } from 'lucide-react';

export default function HomeScreen() {
  const { goPlan, startBuildRoute, loadDemo } = useApp();

  return (
    <div className="flex min-h-screen flex-col items-center justify-between px-6 pt-16 pb-8">
      <div className="flex flex-col items-center text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-600 shadow-lg shadow-sky-500/30">
          <Compass className="h-10 w-10 text-white" strokeWidth={2} />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Explore Malta Your Way
        </h1>
        <p className="mt-3 text-lg text-gray-500">
          Plan the perfect Malta day.
        </p>
      </div>

      <div className="flex w-full max-w-sm flex-col gap-3">
        <button
          onClick={goPlan}
          className="group flex items-center gap-4 rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-600 p-5 text-left shadow-lg shadow-sky-500/20 transition active:scale-[0.98]"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-lg font-bold text-white">Plan My Day</p>
            <p className="text-sm text-sky-50/80">Create a Malta trip for me</p>
          </div>
        </button>

        <button
          onClick={startBuildRoute}
          className="group flex items-center gap-4 rounded-2xl bg-white p-5 text-left shadow-lg shadow-gray-200/50 ring-1 ring-gray-100 transition active:scale-[0.98]"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-50">
            <Route className="h-6 w-6 text-cyan-600" />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">Build My Route</p>
            <p className="text-sm text-gray-500">I already know where I want to go</p>
          </div>
        </button>
      </div>

      <button
        onClick={loadDemo}
        className="text-sm font-semibold text-cyan-600 underline-offset-4 hover:underline"
      >
        Try Malta Demo
      </button>
    </div>
  );
}
