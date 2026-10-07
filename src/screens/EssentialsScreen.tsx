import { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { SERVICE_CATEGORIES, TOURIST_SERVICES, type ServiceCategory, type TouristService } from '@/data/touristServices';

export default function EssentialsScreen() {
  const [category, setCategory] = useState<ServiceCategory>('luggage');
  const [selected, setSelected] = useState<TouristService | null>(null);
  const mapEl = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markers = useRef<L.Marker[]>([]);
  const visible = useMemo(() => TOURIST_SERVICES.filter(x => x.category === category), [category]);

  useEffect(() => {
    if (!mapEl.current || map.current) return;
    map.current = L.map(mapEl.current, { zoomControl:false }).setView([35.90,14.45],10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution:'&copy; OpenStreetMap contributors', maxZoom:19 }).addTo(map.current);
    L.control.zoom({position:'bottomright'}).addTo(map.current);
  }, []);

  useEffect(() => {
    const m = map.current; if (!m) return;
    markers.current.forEach(x => m.removeLayer(x)); markers.current=[];
    const cat = SERVICE_CATEGORIES.find(x => x.id === category)!;
    visible.forEach(service => {
      const icon=L.divIcon({className:'',html:`<div style="width:38px;height:38px;border-radius:50%;background:white;border:3px solid #0891b2;display:flex;align-items:center;justify-content:center;font-size:19px;box-shadow:0 2px 8px rgba(0,0,0,.25)">${cat.icon}</div>`,iconSize:[38,38],iconAnchor:[19,19]});
      const marker=L.marker([service.latitude,service.longitude],{icon}).addTo(m);
      marker.on('click',()=>setSelected(service)); markers.current.push(marker);
    });
    if (visible.length) m.fitBounds(L.latLngBounds(visible.map(x=>[x.latitude,x.longitude] as [number,number])),{padding:[70,70],maxZoom:14});
  }, [visible,category]);

  const cat = SERVICE_CATEGORIES.find(x=>x.id===category)!;
  return <div className="relative h-full">
    <div ref={mapEl} className="absolute inset-0" />
    <div className="absolute inset-x-0 top-0 z-[1000] bg-white/95 px-4 pb-3 pt-10 shadow-sm backdrop-blur">
      <h1 className="text-xl font-bold text-gray-900">Useful in Malta</h1>
      <p className="mb-3 text-sm text-gray-500">Choose one category to keep the map clear.</p>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {SERVICE_CATEGORIES.map(x=><button key={x.id} onClick={()=>{setCategory(x.id);setSelected(null)}} className={`shrink-0 rounded-full px-3 py-2 text-sm font-semibold ${category===x.id?'bg-cyan-600 text-white':'bg-white text-gray-600 ring-1 ring-gray-200'}`}>{x.icon} {x.label}</button>)}
      </div>
    </div>
    <div className="absolute bottom-4 left-4 z-[999] rounded-full bg-white/95 px-3 py-2 text-xs font-semibold text-gray-600 shadow">{cat.icon} Showing {cat.label} only</div>
    {selected && <div className="absolute inset-x-3 bottom-4 z-[1001] rounded-2xl bg-white p-4 shadow-2xl">
      <button onClick={()=>setSelected(null)} className="float-right text-gray-400">✕</button>
      <p className="text-xs font-bold uppercase tracking-wide text-cyan-600">{cat.icon} {cat.label} · {selected.area}</p>
      <h2 className="mt-1 text-lg font-bold text-gray-900">{selected.name}</h2><p className="mt-1 text-sm text-gray-500">{selected.note}</p>
      <button onClick={()=>window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selected.name+' '+selected.area+' Malta')}`,'_blank','noopener,noreferrer')} className="mt-3 w-full rounded-xl bg-gray-900 py-3 font-semibold text-white">Open in Maps</button>
    </div>}
  </div>;
}
