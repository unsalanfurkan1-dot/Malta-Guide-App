import { useApp } from '@/store';
import { ArrowRight, CalendarDays, Compass, MapPin, Route, Sparkles } from 'lucide-react';

export default function HomeScreen() {
  const { goPlan, startBuildRoute, loadDemo, goEssentials } = useApp();
  return (
    <div className="min-h-screen bg-[#f7faf9] pb-24 text-slate-900">
      <header className="bg-gradient-to-br from-[#087e9c] to-[#14b8a6] px-5 pb-8 pt-8 text-white">
        <div className="mx-auto max-w-md">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-extrabold tracking-wide"><Compass size={19}/> MALTA GUIDE</span>
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">☀️ Explore Malta</span>
          </div>
          <h1 className="mt-7 text-3xl font-black leading-tight">Your Malta adventure starts here.</h1>
          <p className="mt-2 text-sm text-white/85">Discover places, plan your day and find what’s happening.</p>
          <button onClick={goPlan} className="mt-5 flex w-full items-center justify-between rounded-2xl bg-white px-5 py-4 text-left font-extrabold text-[#086c83] shadow-lg">
            <span className="flex items-center gap-3"><Sparkles size={21}/> Plan my day</span><ArrowRight size={20}/>
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-md space-y-6 px-5 pt-6">
        <section>
          <div className="flex items-center justify-between">
            <div><p className="text-xs font-extrabold uppercase tracking-wider text-rose-600">Discover today</p><h2 className="mt-1 text-xl font-black">What's happening in Malta?</h2></div>
            <CalendarDays className="text-rose-500" size={24}/>
          </div>
          <div className="mt-3 rounded-2xl border border-rose-100 bg-white p-4">
            <p className="text-sm font-bold">Today's events</p>
            <p className="mt-1 text-sm text-slate-500">Live event listings are coming soon. We’ll only show verified events for the selected day.</p>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-black">What would you like to do?</h2>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <button onClick={startBuildRoute} className="rounded-2xl bg-white p-4 text-left shadow-sm ring-1 ring-slate-100"><Route className="text-cyan-600"/><strong className="mt-3 block text-sm">Build a route</strong><span className="mt-1 block text-xs text-slate-500">Choose places to visit</span></button>
            <button onClick={goEssentials} className="rounded-2xl bg-white p-4 text-left shadow-sm ring-1 ring-slate-100"><MapPin className="text-orange-500"/><strong className="mt-3 block text-sm">Useful places</strong><span className="mt-1 block text-xs text-slate-500">Parking, luggage & more</span></button>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-black">Explore your way</h2>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
            {['🏖️ Beaches','🏛️ Culture','🌅 Sunset','🚤 Adventure','🍝 Food'].map(label => <button key={label} onClick={goPlan} className="shrink-0 rounded-full bg-white px-4 py-2.5 text-sm font-bold shadow-sm ring-1 ring-slate-100">{label}</button>)}
          </div>
        </section>
        <button onClick={loadDemo} className="flex w-full items-center justify-between rounded-2xl bg-slate-900 px-5 py-4 text-left text-white"><span><strong className="block">Try a Malta highlights trip</strong><span className="text-xs text-white/65">Valletta · Mdina · Dingli Cliffs</span></span><ArrowRight/></button>
      </main>
    </div>
  );
}
