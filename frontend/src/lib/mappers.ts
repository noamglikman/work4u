// lib/mappers.ts — convert raw API resources into UI view models.
// This is the seam that lets the SAME components render mock data and real
// backend data identically: both go through these functions.

import type { Rating, VenueDetail, VenueSummary } from '../types/api';
import type { ForecastBar, RatingView, VenuePreview, VenueView } from '../types/view';
import {
  CROWD_HEIGHT,
  NOISE_LABEL,
  PRICE_LABEL,
  WIFI_LABEL,
  WIFI_STARS,
  powerLabel,
} from './labels';
import { formatDistance, haversineKm, type LatLng } from './geo';
import {
  formatHebrewDate,
  placeholderColor,
  placeholderEmoji,
  shortArea,
  shortHour,
} from './format';

/** Derive Hebrew tag chips from a venue's structured attributes. */
export function deriveTags(v: VenueSummary): string[] {
  const tags: string[] = [];
  if (v.noiseLevel === 'low') tags.push('שקט');
  if (v.hasPowerOutlets) tags.push('שקעים');
  if (v.wifiQuality === 'high') tags.push('אינטרנט מהיר');
  if (v.priceRange === 'low') tags.push('מחיר טוב');
  if (v.averageRating >= 4.6) tags.push('מדורג גבוה');
  return tags;
}

/** Treat empty/blank image URLs as "no image". */
function cleanUrl(url: string | undefined): string | undefined {
  const u = (url ?? '').trim();
  return u.length > 0 ? u : undefined;
}

export function toVenuePreview(v: VenueSummary, user?: LatLng): VenuePreview {
  const distanceKm = user ? haversineKm(user, { lat: v.latitude, lng: v.longitude }) : undefined;
  return {
    id: v.venueId,
    name: v.name,
    area: shortArea(v.address),
    address: v.address,
    lat: v.latitude,
    lng: v.longitude,
    distanceKm,
    distanceLabel: formatDistance(distanceKm),
    priceRange: v.priceRange,
    priceLabel: PRICE_LABEL[v.priceRange],
    wifiQuality: v.wifiQuality,
    wifiStars: WIFI_STARS[v.wifiQuality],
    noiseLevel: v.noiseLevel,
    hasPowerOutlets: v.hasPowerOutlets,
    crowdLevel: v.currentCrowdLevel,
    rating: v.averageRating,
    imageUrl: cleanUrl(v.mainImageUrl),
    accent: placeholderColor(v.venueId),
    emoji: placeholderEmoji(v.venueId),
    tags: deriveTags(v),
    openingHours: v.openingHours,
  };
}

export function toForecastBars(forecast: VenueDetail['forecast']): ForecastBar[] {
  return forecast.map((p) => ({
    hour: p.hour,
    hourShort: shortHour(p.hour),
    crowdLevel: p.crowdLevel,
    value: CROWD_HEIGHT[p.crowdLevel],
  }));
}

export function toVenueView(v: VenueDetail, user?: LatLng): VenueView {
  const preview = toVenuePreview(v, user);
  return {
    ...preview,
    openingHours: v.openingHours,
    description: v.description,
    imageUrls: (v.imageUrls ?? []).map(cleanUrl).filter((u): u is string => Boolean(u)),
    forecast: toForecastBars(v.forecast),
    wifiLabel: WIFI_LABEL[v.wifiQuality],
    noiseLabel: NOISE_LABEL[v.noiseLevel],
    powerLabel: powerLabel(v.hasPowerOutlets),
  };
}

export function toRatingView(r: Rating): RatingView {
  return {
    ...r,
    dateLabel: formatHebrewDate(r.createdAt),
    accent: placeholderColor(r.venueId),
    emoji: placeholderEmoji(r.venueId),
  };
}

/**
 * Index of the forecast bar nearest to the given wall-clock hour (0–23),
 * used to highlight "now" on the graph. Returns -1 if no forecast.
 */
export function nowForecastIndex(forecast: ForecastBar[], hour: number): number {
  if (forecast.length === 0) return -1;
  let best = 0;
  let bestDiff = Infinity;
  forecast.forEach((b, i) => {
    const h = parseInt(b.hour.split(':')[0] ?? '0', 10);
    const diff = Math.abs(h - hour);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = i;
    }
  });
  return best;
}
