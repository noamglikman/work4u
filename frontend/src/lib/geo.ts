// lib/geo.ts — geographic helpers: distance, Hebrew distance formatting, and
// projecting real lat/lng onto the stylised map canvas.

export interface LatLng {
  lat: number;
  lng: number;
}

/** Default map centre when the browser hasn't shared a location (Tel Aviv). */
export const DEFAULT_LOCATION: LatLng = { lat: 32.0809, lng: 34.7806 };

const R = 6371; // Earth radius, km
const rad = (d: number) => (d * Math.PI) / 180;

/** Great-circle distance between two points, in kilometres. */
export function haversineKm(a: LatLng, b: LatLng): number {
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const lat1 = rad(a.lat);
  const lat2 = rad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

/** Format a km distance the Hebrew way: "290 מ׳" or "1.1 ק״מ". */
export function formatDistance(km: number | undefined): string {
  if (km == null || !Number.isFinite(km)) return '';
  if (km < 1) return `${Math.round(km * 1000)} מ׳`;
  return `${km.toFixed(1)} ק״מ`;
}

export interface MapPoint {
  top: number; // %
  left: number; // %
}

/**
 * Project a set of geo coordinates into 0–100% positions inside the map box,
 * normalising to the bounding box of all points (with padding) and the user's
 * location. This keeps the stylised map working with REAL coordinates: pins
 * spread out sensibly regardless of where the venues actually are.
 */
export function projectVenues(
  points: Array<{ id: string } & LatLng>,
  user: LatLng = DEFAULT_LOCATION,
): Record<string, MapPoint> {
  const all = [...points, { id: '__user__', ...user }];
  if (all.length === 0) return {};

  const lats = all.map((p) => p.lat);
  const lngs = all.map((p) => p.lng);
  let minLat = Math.min(...lats);
  let maxLat = Math.max(...lats);
  let minLng = Math.min(...lngs);
  let maxLng = Math.max(...lngs);

  // Avoid divide-by-zero when all points coincide.
  if (maxLat - minLat < 1e-6) {
    minLat -= 0.01;
    maxLat += 0.01;
  }
  if (maxLng - minLng < 1e-6) {
    minLng -= 0.01;
    maxLng += 0.01;
  }

  const PAD = 12; // % inset so pins never hug the edges
  const span = 100 - PAD * 2;

  const out: Record<string, MapPoint> = {};
  for (const p of points) {
    const x = (p.lng - minLng) / (maxLng - minLng); // 0..1 west→east
    const y = (maxLat - p.lat) / (maxLat - minLat); // 0..1 north→south
    out[p.id] = { left: PAD + x * span, top: PAD + y * span };
  }
  return out;
}

/** Where to draw the user dot on the projected map. */
export function projectUser(
  points: Array<{ id: string } & LatLng>,
  user: LatLng = DEFAULT_LOCATION,
): MapPoint {
  const projected = projectVenues([{ id: '__user__', ...user }, ...points], user);
  return projected['__user__'] ?? { top: 50, left: 50 };
}
