import type { VenueQuery, VenueSummary } from '../types/api';
import type { LatLng } from '../lib/geo';
import { api } from '../api';
import { useAsync } from './useAsync';
import { toVenuePreview, toVenueView } from '../lib/mappers';

function normalizeText(value: unknown): string {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

function venueDedupeKey(venue: VenueSummary): string {
  const raw = venue as unknown as Record<string, unknown>;

  const name = normalizeText(raw.name);
  const address = normalizeText(raw.address);
  const city = normalizeText(raw.city);
  const venueId = normalizeText(raw.venueId);

  if (name && address) {
    return `${name}|${address}`;
  }

  if (name && city) {
    return `${name}|${city}`;
  }

  return venueId || JSON.stringify(raw);
}

function dedupeVenues(list: VenueSummary[]): VenueSummary[] {
  const seen = new Set<string>();
  const result: VenueSummary[] = [];

  for (const venue of list) {
    const key = venueDedupeKey(venue);

    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    result.push(venue);
  }

  return result;
}

export function useVenues(query: VenueQuery, location: LatLng, enabled = true) {
  const state = useAsync(
    () =>
      api.venues
        .list(query)
        .then((list) => dedupeVenues(list).map((v) => toVenuePreview(v, location))),
    [query, location.lat, location.lng],
    enabled,
  );

  return { venues: state.data ?? [], loading: state.loading, error: state.error, reload: state.reload };
}

export function useVenue(venueId: string | null, location: LatLng) {
  const state = useAsync(
    () =>
      venueId
        ? api.venues.get(venueId).then((d) => toVenueView(d, location))
        : Promise.resolve(null),
    [venueId, location.lat, location.lng],
    Boolean(venueId),
  );

  return { venue: state.data, loading: state.loading, error: state.error, reload: state.reload };
}
