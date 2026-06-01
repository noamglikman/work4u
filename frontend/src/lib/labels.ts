// lib/labels.ts — the single place that translates contract enum values into
// Hebrew display text (and back, for inputs). Keeping all i18n here means the
// API layer and components never hardcode Hebrew strings tied to a value.

import type {
  CrowdLevel,
  NoiseLevel,
  PriceRange,
  PriceRangeFilter,
  SeatType,
  WifiQuality,
} from '../types/api';

// ── Occupancy / crowd level ─────────────────────────────────────────
export interface OccMeta {
  key: CrowdLevel;
  label: string;
  color: string;
  soft: string;
}

export const OCC: Record<CrowdLevel, OccMeta> = {
  free: { key: 'free', label: 'פנוי', color: 'var(--w4-success)', soft: 'var(--w4-success-soft)' },
  reasonable: { key: 'reasonable', label: 'סביר', color: 'var(--w4-warn)', soft: 'var(--w4-warn-soft)' },
  crowded: { key: 'crowded', label: 'עמוס מאוד', color: 'var(--w4-danger)', soft: 'var(--w4-danger-soft)' },
};

export const CROWD_ORDER: CrowdLevel[] = ['free', 'reasonable', 'crowded'];

/** Bar height (0..100) used by the forecast graph for each crowd level. */
export const CROWD_HEIGHT: Record<CrowdLevel, number> = {
  free: 34,
  reasonable: 68,
  crowded: 100,
};

// ── Price ───────────────────────────────────────────────────────────
export const PRICE_LABEL: Record<PriceRange, string> = {
  low: '₪',
  medium: '₪₪',
  high: '₪₪₪',
};

export const PRICE_FILTER_LABEL: Record<PriceRangeFilter, string> = {
  any: 'הכל',
  low: '₪',
  medium: '₪₪',
  high: '₪₪₪',
};

/** Map a ₪-style label back to its enum (used by price button groups). */
export function priceFromLabel(label: string): PriceRangeFilter {
  const entry = (Object.entries(PRICE_FILTER_LABEL) as [PriceRangeFilter, string][]).find(
    ([, l]) => l === label,
  );
  return entry ? entry[0] : 'any';
}

// ── Wi-Fi quality ───────────────────────────────────────────────────
export const WIFI_LABEL: Record<WifiQuality, string> = {
  low: 'בינוני',
  medium: 'טוב',
  high: 'מצוין',
};

/** Approximate 1..5 strength for the small Wi-Fi indicator on cards. */
export const WIFI_STARS: Record<WifiQuality, number> = {
  low: 3,
  medium: 4,
  high: 5,
};

// ── Noise level ─────────────────────────────────────────────────────
export const NOISE_LABEL: Record<NoiseLevel, string> = {
  low: 'שקט מאוד',
  medium: 'בינוני',
  high: 'רועש',
};

// ── Seat type ───────────────────────────────────────────────────────
export const SEAT_LABEL: Record<SeatType, string> = {
  table: 'שולחן עבודה',
  sofa: 'ספה נוחה',
  bar: 'בר',
  any: 'הכל',
};

export const SEAT_OPTIONS: SeatType[] = ['table', 'sofa', 'bar', 'any'];

// ── Power outlets ───────────────────────────────────────────────────
export function powerLabel(hasOutlets: boolean): string {
  return hasOutlets ? 'שקעים זמינים' : 'אין שקעים';
}
