// hooks/useVenues.ts — venue list + single venue, mapped to view models.

import { api } from '../api';
import type { VenueQuery } from '../types/api';
import type { LatLng } from '../lib/geo';
import { toVenuePreview, toVenueView } from '../lib/mappers';
import { useAsync } from './useAsync';

export function useVenues(query: VenueQuery, location: LatLng, enabled = true) {
  const key = JSON.stringify(query);
  const state = useAsync(
    () => api.venues.list(query).then((list) => list.map((v) => toVenuePreview(v, location))),
    [key, location.lat, location.lng],
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
  );
  return { venue: state.data, loading: state.loading, error: state.error, reload: state.reload };
}
