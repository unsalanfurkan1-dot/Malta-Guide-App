import { useApp } from '@/store';
import { ArrowRight, CalendarDays, Clock3, Compass, MapPin, Route, Sparkles, Sun } from 'lucide-react';

const moods = [
  { label: 'Beach Day', emoji: '🏖️' },
  { label: 'Adventure', emoji: '🚤' },
  { label: 'Culture', emoji: '🏛️' },
  { label: 'Food', emoji: '🍝' },
  { label: 'Sunset', emoji: '🌅' },
];

const previewEvents = [
  { title: 'Live music & events', area: 'Around Malta', time: 'Today', emoji: '🎶' },
  { title: 'Culture & local happenings', area: 'Malta & Gozo', time: 'Today', emoji: '🎭' },
  { title: 'Nightlife & evening plans', area: 'Tonight', time: 'Today', emoji: '✨' },
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
        <section className="mb-7">
          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-rose-500"><span className="h-2 w-2 animate-pulse rounded-full bg-rose-500" /> Happening today</div>
              <h2 className="mt-1 text-xl font-black text-slate-900">Today in Malta</h2>
              <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-slate-500"><CalendarDays className="h-3.5 w-3.5" /> Today's events · updated daily</p>
            </div>
            <button className="shrink-0 text-sm font-black text-cyan-700">See all →</button>
          </div>
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
            {previewEvents.map((event) => (
              <article key={event.title} className="w-56 shrink-0 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-rose-100">
                <div className="flex items-center justify-between"><span className="text-2xl">{event.emoji}</span><span className="rounded-full bg-rose-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-rose-600">Today</span></div>
                <h3 className="mt-4 font-black leading-tight text-slate-900">{event.title}</h3>
                <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-slate-500"><Clock3 className="h-3.5 w-3.5" /> {event.time} · {event.area}</p>
              </article>
            ))}
          </div>
          <p className="mt-1 text-[11px] leading-4 text-slate-400">Live event sources will replace these preview categories before launch, so expired events are never presented as current.</p>
        </section>

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
