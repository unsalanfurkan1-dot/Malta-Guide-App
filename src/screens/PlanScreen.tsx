import { useState } from 'react';
import { useApp } from '@/store';
import { ArrowLeft, Clock3, Sparkles } from 'lucide-react';

const PLANS = {
  quick: { title: 'Half day', subtitle: 'A compact first taste of Malta', ids: ['valletta', 'upper-barrakka', 'mdina'] },
  classic: { title: 'Full day', subtitle: 'History, harbour and west-coast views', ids: ['valletta', 'upper-barrakka', 'mdina', 'rabat', 'dingli-cliffs'] },
  coast: { title: 'Coast & sunset', subtitle: 'South coast scenery and a sunset finish', ids: ['marsaxlokk', 'blue-grotto', 'dingli-cliffs'] },
};

export default function PlanScreen() {
  const { goHome, createSuggestedRoute } = useApp();
  const [selected, setSelected] = useState<keyof typeof PLANS>('classic');
  const plan = PLANS[selected];

  return (
    <div className="h-full overflow-y-auto bg-gray-50 px-5 pb-8 pt-8">
      <button onClick={goHome} className="mb-5 flex items-center gap-2 text-sm font-semibold text-gray-500"><ArrowLeft className="h-4 w-4" />Home</button>
      <div className="rounded-3xl bg-gradient-to-br from-sky-500 to-cyan-600 p-6 text-white shadow-lg">
        <Sparkles className="h-8 w-8" />
        <h2 className="mt-4 text-2xl font-bold">Plan my Malta day</h2>
        <p className="mt-2 text-sky-50">Pick the kind of day you have. We’ll create a ready-to-use route.</p>
      </div>
      <p className="mb-3 mt-6 text-sm font-bold text-gray-900">How much time do you have?</p>
      <div className="space-y-3">
        {Object.entries(PLANS).map(([key, item]) => (
          <button key={key} onClick={() => setSelected(key as keyof typeof PLANS)} className={`flex w-full items-center gap-4 rounded-2xl p-4 text-left shadow-sm ring-1 ${selected === key ? 'bg-cyan-50 ring-cyan-300' : 'bg-white ring-gray-100'}`}>
            <div className="rounded-xl bg-white p-3 shadow-sm"><Clock3 className="h-5 w-5 text-cyan-600" /></div>
            <div className="flex-1"><p className="font-bold text-gray-900">{item.title}</p><p className="text-sm text-gray-500">{item.subtitle}</p><p className="mt-1 text-xs font-medium text-cyan-700">{item.ids.length} stops</p></div>
          </button>
        ))}
      </div>
      <button onClick={() => createSuggestedRoute(plan.ids)} className="mt-6 w-full rounded-2xl bg-gray-900 py-4 text-lg font-bold text-white shadow-lg">Create my {plan.title.toLowerCase()} plan</button>
      <p className="mt-3 text-center text-xs text-gray-400">No account needed. Your current trip is saved on this device.</p>
    </div>
  );
}
