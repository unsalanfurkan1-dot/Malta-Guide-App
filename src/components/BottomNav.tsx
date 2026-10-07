import { useApp } from '@/store';
import { Home, Map as MapIcon, Compass } from 'lucide-react';

export default function BottomNav() {
  const { screen, goHome, startBuildRoute } = useApp();

  const items = [
    { id: 'home' as const, label: 'Home', icon: Home, action: goHome },
    { id: 'trip' as const, label: 'Trip', icon: Compass, action: startBuildRoute },
    { id: 'map' as const, label: 'Map', icon: MapIcon, action: () => {} },
  ];

  // Only show if there are stops for the map tab to be meaningful
  return (
    <nav className="flex items-center justify-around border-t border-gray-100 bg-white/95 px-2 pb-5 pt-2 backdrop-blur">
      {items.map((item) => {
        const active = screen === item.id;
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={item.action}
            className={`flex flex-1 flex-col items-center gap-0.5 py-1.5 transition ${
              active ? 'text-cyan-600' : 'text-gray-400'
            }`}
          >
            <Icon className="h-6 w-6" strokeWidth={active ? 2.5 : 2} />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
