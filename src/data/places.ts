import type { MaltaPlace } from '@/types';

export const MALTA_PLACES: MaltaPlace[] = [
  { id: 'valletta', name: 'Valletta', latitude: 35.8989, longitude: 14.5144, category: 'City' },
  { id: 'upper-barrakka', name: 'Upper Barrakka Gardens', latitude: 35.8937, longitude: 14.5140, category: 'Garden' },
  { id: 'sliema', name: 'Sliema', latitude: 35.9121, longitude: 14.5017, category: 'Town' },
  { id: 'st-julians', name: "St. Julian's", latitude: 35.9249, longitude: 14.4868, category: 'Town' },
  { id: 'mdina', name: 'Mdina', latitude: 35.8850, longitude: 14.4028, category: 'Historic' },
  { id: 'rabat', name: 'Rabat', latitude: 35.8810, longitude: 14.3970, category: 'Historic' },
  { id: 'dingli-cliffs', name: 'Dingli Cliffs', latitude: 35.8583, longitude: 14.3847, category: 'Cliffs' },
  { id: 'marsaxlokk', name: 'Marsaxlokk', latitude: 35.8422, longitude: 14.5375, category: 'Fishing Village' },
  { id: 'blue-grotto', name: 'Blue Grotto', latitude: 35.8292, longitude: 14.4544, category: 'Nature' },
  { id: 'mellieha', name: 'Mellieha', latitude: 35.8436, longitude: 14.3500, category: 'Town' },
  { id: 'golden-bay', name: 'Golden Bay', latitude: 35.9189, longitude: 14.3369, category: 'Beach' },
  { id: 'popeye-village', name: 'Popeye Village', latitude: 35.9156, longitude: 14.3467, category: 'Attraction' },
  { id: 'cirkewwa', name: 'Cirkewwa', latitude: 36.0056, longitude: 14.3356, category: 'Ferry' },
  { id: 'victoria-gozo', name: 'Victoria Gozo', latitude: 36.0478, longitude: 14.2622, category: 'Gozo' },
];

export const DEMO_PLACE_IDS = ['valletta', 'upper-barrakka', 'mdina', 'rabat', 'dingli-cliffs'];
