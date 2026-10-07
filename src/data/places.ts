import type { MaltaPlace } from '@/types';

export const MALTA_PLACES: MaltaPlace[] = [
  { id: 'valletta', name: 'Valletta', latitude: 35.8989, longitude: 14.5144, category: 'City', area: 'Central Malta', description: 'Malta’s compact capital, ideal for history, streets and harbour views.', visitMinutes: 120 },
  { id: 'upper-barrakka', name: 'Upper Barrakka Gardens', latitude: 35.8937, longitude: 14.5140, category: 'Garden', area: 'Valletta', description: 'Panoramic Grand Harbour views from one of Valletta’s best-known gardens.', visitMinutes: 45 },
  { id: 'sliema', name: 'Sliema', latitude: 35.9121, longitude: 14.5017, category: 'Town', area: 'Harbour', description: 'Seafront walks, shopping and easy views across to Valletta.', visitMinutes: 90 },
  { id: 'st-julians', name: "St. Julian's", latitude: 35.9249, longitude: 14.4868, category: 'Town', area: 'Harbour', description: 'A lively waterfront area for dining, nightlife and coastal walks.', visitMinutes: 90 },
  { id: 'mdina', name: 'Mdina', latitude: 35.8850, longitude: 14.4028, category: 'Historic', area: 'Central Malta', description: 'The historic Silent City, with narrow streets and sweeping island views.', visitMinutes: 90 },
  { id: 'rabat', name: 'Rabat', latitude: 35.8810, longitude: 14.3970, category: 'Historic', area: 'Central Malta', description: 'Historic streets and sites immediately beside Mdina.', visitMinutes: 75 },
  { id: 'dingli-cliffs', name: 'Dingli Cliffs', latitude: 35.8583, longitude: 14.3847, category: 'Cliffs', area: 'West Malta', description: 'A dramatic west-coast viewpoint, especially good near sunset.', visitMinutes: 60 },
  { id: 'marsaxlokk', name: 'Marsaxlokk', latitude: 35.8422, longitude: 14.5375, category: 'Fishing Village', area: 'South Malta', description: 'Colourful fishing harbour known for its waterfront and seafood.', visitMinutes: 90 },
  { id: 'blue-grotto', name: 'Blue Grotto', latitude: 35.8292, longitude: 14.4544, category: 'Nature', area: 'South Malta', description: 'Sea cliffs and famous blue-water coastal scenery.', visitMinutes: 75 },
  { id: 'mellieha', name: 'Mellieha', latitude: 35.9603, longitude: 14.3622, category: 'Town', area: 'North Malta', description: 'Hilltop town overlooking Mellieha Bay and Malta’s north.', visitMinutes: 75 },
  { id: 'golden-bay', name: 'Golden Bay', latitude: 35.9341, longitude: 14.3443, category: 'Beach', area: 'Northwest Malta', description: 'Popular sandy beach with a wide bay and sunset views.', visitMinutes: 120 },
  { id: 'popeye-village', name: 'Popeye Village', latitude: 35.9608, longitude: 14.3413, category: 'Attraction', area: 'Mellieha', description: 'Colourful film-set attraction overlooking Anchor Bay.', visitMinutes: 120 },
  { id: 'cirkewwa', name: 'Cirkewwa', latitude: 35.9876, longitude: 14.3291, category: 'Ferry', area: 'North Malta', description: 'Main ferry departure point for Gozo.', visitMinutes: 30 },
  { id: 'victoria-gozo', name: 'Victoria, Gozo', latitude: 36.0444, longitude: 14.2398, category: 'Gozo', area: 'Gozo', description: 'Gozo’s central town and a useful base for exploring the island.', visitMinutes: 120 },
];

export const DEMO_PLACE_IDS = ['valletta', 'upper-barrakka', 'mdina', 'rabat', 'dingli-cliffs'];
