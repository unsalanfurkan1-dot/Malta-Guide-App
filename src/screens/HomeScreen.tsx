import { useApp } from '@/store';
import { ArrowRight, Compass, MapPin, Route, Sparkles, Sun } from 'lucide-react';

const moods = [
  { label: 'Beach Day', emoji: '🏖️' },
  { label: 'Adventure', emoji: '🚤' },
  { label: 'Culture', emoji: '🏛️' },
  { label: 'Food', emoji: '🍝' },
  { label: 'Sunset', emoji: '🌅' },
];

export default function HomeScreen() {
  const { goPlan, startBuildRoute, loadDemo, goEssentials } = useApp();

  return (
    <div className="min-h-screen overflow-y-auto bg-[#fffaf2] pb-8">
      <section className="relative overflow-hidden rounded-b-[2.5rem] bg-gradient-to-br from-cyan-500 via-sky-500 to-blue-600 px-6 pb-8 pt-12 text-white shadow-xl shadow-sky-200/50">
        <div className="absolute -right-14 -top-12 h-48 w-48 rounded-full bg-yellow-300/25 blur-2xl" />
        <div className="absolute -bottom-20 -left-12 h-44 w-44 rounded-full bg-cyan-200/25 blur-2xl" />
        <div className="relative">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold tracking-wide"><Compass className="h-5 w-5" /> MALTA GUIDE</div>
            <div className="flex items-center gap-1 rounded-full bg-white/20 px-3 py-1.5 text-sm font-semibold backdrop-blur"><Sun className="h-4 w-4 text-yellow-200" /> Explore mode</div>
          </div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-100">Your island. Your day.</p>
          <h1 className="mt-2 max-w-sm text-4xl font-black leading-[1.05] tracking-tight">Malta is waiting. What are you up for?</h1>
          <p className="mt-4 max-w-sm text-base leading-6 text-white/85">Beaches, old cities, hidden corners and sunset stops — build a day that feels like you.</p>
          <button onClick={goPlan} className="mt-6 flex items-center gap-2 rounded-2xl bg-yellow-300 px-5 py-3.5 font-black text-slate-900 shadow-lg shadow-slate-900/10 transition active:scale-[0.98]">
            <Sparkles className="h-5 w-5" /> Plan my Malta day <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      <main className="mx-auto max-w-md px-5 pt-7">
        <div className="flex items-end justify-between">
          <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-500">Pick your vibe</p><h2 className="mt-1 text-xl font-black text-slate-900">What sounds good today?</h2></div>
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {moods.map((m) => <button key={m.label} onClick={goPlan} className="shrink-0 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-800 shadow-sm ring-1 ring-orange-100 transition active:scale-95"><span className="mr-2 text-lg">{m.emoji}</span>{m.label}</button>)}
        </div>

        <button onClick={loadDemo} className="mt-5 w-full overflow-hidden rounded-3xl bg-slate-900 p-5 text-left text-white shadow-xl">
          <div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Ready-made adventure</p><h3 className="mt-1 text-xl font-black">Explore Malta highlights</h3><p className="mt-1 text-sm text-white/65">Valletta → Mdina → Dingli & more</p></div><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10"><MapPin className="h-6 w-6 text-yellow-300" /></div></div>
        </button>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button onClick={startBuildRoute} className="rounded-3xl bg-white p-4 text-left shadow-sm ring-1 ring-slate-100"><Route className="h-6 w-6 text-cyan-600" /><p className="mt-3 font-black text-slate-900">Build my route</p><p className="mt-1 text-xs leading-4 text-slate-500">Already know your stops?</p></button>
          <button onClick={goEssentials} className="rounded-3xl bg-orange-50 p-4 text-left shadow-sm ring-1 ring-orange-100"><span className="text-2xl">🧳</span><p className="mt-3 font-black text-slate-900">Useful nearby</p><p className="mt-1 text-xs leading-4 text-slate-500">Luggage, parking, pharmacy & transport</p></button>
        </div>
      </main>
    </div>
  );
}
