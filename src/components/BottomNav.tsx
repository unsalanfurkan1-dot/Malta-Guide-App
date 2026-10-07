import { useApp } from '@/store';
import { Home, Map as MapIcon, Compass, LifeBuoy } from 'lucide-react';

export default function BottomNav() {
  const { screen, stops, goHome, startBuildRoute, goMap, goEssentials } = useApp();
  const items = [
    { id: 'home' as const, label: 'Home', icon: Home, action: goHome, disabled: false },
    { id: 'trip' as const, label: 'Trip', icon: Compass, action: startBuildRoute, disabled: false },
    { id: 'essentials' as const, label: 'Useful', icon: LifeBuoy, action: goEssentials, disabled: false },
    { id: 'map' as const, label: 'Map', icon: MapIcon, action: goMap, disabled: stops.length === 0 },
  ];
  return <nav className="flex items-center justify-around border-t border-gray-100 bg-white/95 px-2 pb-5 pt-2 backdrop-blur">
    {items.map((item) => { const active = screen === item.id; const Icon = item.icon; return (
      <button key={item.id} disabled={item.disabled} onClick={item.action} className={`flex flex-1 flex-col items-center gap-0.5 py-1.5 transition ${item.disabled ? 'opacity-30' : active ? 'text-cyan-600' : 'text-gray-400'}`}>
        <Icon className="h-6 w-6" strokeWidth={active ? 2.5 : 2} /><span className="text-xs font-medium">{item.label}</span>
      </button>
    );})}
  </nav>;
}
