export type ServiceCategory = 'luggage' | 'toilets' | 'parking' | 'pharmacy' | 'transport';
export interface TouristService { id:string; name:string; category:ServiceCategory; area:string; latitude:number; longitude:number; note:string; }
export const SERVICE_CATEGORIES = [
  { id:'luggage' as const, label:'Luggage', icon:'🧳' },
  { id:'toilets' as const, label:'Toilets', icon:'🚻' },
  { id:'parking' as const, label:'Parking', icon:'🅿️' },
  { id:'pharmacy' as const, label:'Pharmacy', icon:'💊' },
  { id:'transport' as const, label:'Transport', icon:'⛴️' },
];
export const TOURIST_SERVICES: TouristService[] = [
  { id:'luggage-valletta', name:'Luggage storage options', category:'luggage', area:'Valletta', latitude:35.8989, longitude:14.5144, note:'Storage options around central Valletta.' },
  { id:'luggage-sliema', name:'Luggage storage options', category:'luggage', area:'Sliema', latitude:35.9121, longitude:14.5017, note:'Storage options around central Sliema.' },
  { id:'toilets-valletta', name:'Public toilet options', category:'toilets', area:'Valletta', latitude:35.8975, longitude:14.5125, note:'Check the map listing for current access information.' },
  { id:'parking-valletta', name:'Parking options', category:'parking', area:'Valletta', latitude:35.8957, longitude:14.5085, note:'Parking options around the capital.' },
  { id:'parking-mdina', name:'Parking options', category:'parking', area:'Mdina / Rabat', latitude:35.8843, longitude:14.4043, note:'Parking options near Mdina and Rabat.' },
  { id:'pharmacy-sliema', name:'Pharmacy options', category:'pharmacy', area:'Sliema', latitude:35.9117, longitude:14.5012, note:'Check current opening hours before travelling.' },
  { id:'transport-sliema', name:'Sliema ferry area', category:'transport', area:'Sliema', latitude:35.9094, longitude:14.5068, note:'Harbour transport connection.' },
  { id:'transport-cirkewwa', name:'Cirkewwa ferry terminal', category:'transport', area:'North Malta', latitude:35.9876, longitude:14.3291, note:'Main Malta ferry departure point for Gozo.' },
];
