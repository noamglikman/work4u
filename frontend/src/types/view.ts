// types/view.ts — view models the UI components consume.
// These are produced from the raw API types (types/api.ts) by lib/mappers.ts.
// They carry Hebrew display labels + derived/placeholder fields (distance,
// placeholder colour/emoji, tags) so the components stay dumb and presentational.

import type {
  CrowdLevel,
  NoiseLevel,
  PriceRange,
  Rating,
  WifiQuality,
} from './api';

/** Venue as shown in list cards and on the map. */
export interface VenuePreview {
  id: string;
  name: string;
  /** Short locality derived from the address (e.g. "נחלת בנימין, ת״א"). */
  area: string;
  address: string;
  /** Raw coordinates — used for map projection + distance. */
  lat: number;
  lng: number;
  /** Distance from the user in km (undefined if location unknown). */
  distanceKm?: number;
  /** Human distance string ("290 מ׳" / "1.1 ק״מ" / "" when unknown). */
  distanceLabel: string;
  priceRange: PriceRange;
  priceLabel: string; // ₪ / ₪₪ / ₪₪₪
  wifiQuality: WifiQuality;
  /** 1..5 strength used by the small Wi-Fi indicator. */
  wifiStars: number;
  noiseLevel: NoiseLevel;
  hasPowerOutlets: boolean;
  crowdLevel: CrowdLevel;
  rating: number;
  /** Real photo URL (S3) when present, otherwise undefined → placeholder. */
  imageUrl?: string;
  /** Deterministic placeholder colour for the striped Photo block. */
  accent: string;
  /** Deterministic placeholder emoji. */
  emoji: string;
  /** Derived Hebrew tag chips (quiet / power / fast wifi / cheap…). */
  tags: string[];
  /** Opening hours, when the backend includes them on the summary. */
  openingHours?: string;
}

/** Full venue detail page model. */
export interface VenueView extends VenuePreview {
  openingHours: string;
  description: string;
  /** Gallery image URLs (S3). Empty → placeholder tiles. */
  imageUrls: string[];
  forecast: ForecastBar[];
  wifiLabel: string;
  noiseLabel: string;
  powerLabel: string;
}

/** A single forecast bar, ready for the graph. */
export interface ForecastBar {
  hour: string; // "09:00"
  hourShort: string; // "9"
  crowdLevel: CrowdLevel;
  /** 0..100 bar height. */
  value: number;
}

/** A rating row in the "My ratings" history view. */
export interface RatingView extends Rating {
  /** Hebrew formatted date ("28 במאי 2026"). */
  dateLabel: string;
  crowdLevel: CrowdLevel;
  accent: string;
  emoji: string;
}
