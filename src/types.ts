export type PlaceCategory =
  | 'City' | 'Garden' | 'Town' | 'Historic' | 'Cliffs'
  | 'Fishing Village' | 'Nature' | 'Beach' | 'Attraction' | 'Ferry' | 'Gozo';

export interface MaltaPlace {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  category: PlaceCategory;
  area?: string;
  description?: string;
  visitMinutes?: number;
}

export type StopStatus = 'upcoming' | 'completed' | 'skipped';

export interface RouteStop {
  place: MaltaPlace;
  status: StopStatus;
  originalIndex: number;
}
