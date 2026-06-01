// lib/filters.ts — UI filter state and its translation to the API query
// parameters defined in api-contract §7.4. Keeping this here means both the
// mock adapter and the real GET /venues receive identical, contract-correct
// parameters — the core of "ready for integration".

import type { PriceRangeFilter, VenueQuery } from '../types/api';
import type { LatLng } from './geo';

export interface Filters {
  radiusKm: number;
  quiet: boolean;
  power: boolean;
  wifi: boolean;
  /** "open now" — applied client-side (no contract query param). */
  open: boolean;
  price: PriceRangeFilter;
}

export const DEFAULT_FILTERS: Filters = {
  radiusKm: 5,
  quiet: false,
  power: false,
  wifi: false,
  open: false,
  price: 'any',
};

/** Build the GET /venues query params from the UI filter + search + location. */
export function buildVenueQuery(filters: Filters, search: string, location: LatLng): VenueQuery {
  const q: VenueQuery = {
    lat: location.lat,
    lng: location.lng,
    radiusKm: filters.radiusKm,
  };
  const term = search.trim();
  if (term) q.search = term;
  if (filters.price !== 'any') q.priceRange = filters.price;
  if (filters.wifi) q.wifiQuality = 'high';
  if (filters.quiet) q.quietEnvironment = true;
  if (filters.power) q.needPowerOutlet = true;
  return q;
}
