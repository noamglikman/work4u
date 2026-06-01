// api/mock/store.ts — in-memory implementation of the Api, backed by seed data.
// Mutations persist for the session so the app feels real (add a rating, delete
// it, publish a venue…). Everything is contract-shaped, so the UI can't tell the
// difference between this and the live backend.

import type {
  Rating,
  UserPreferences,
  VenueDetail,
  VenueSummary,
} from '../../types/api';
import type { Api } from '../services';
import { ApiError } from '../errors';
import { haversineKm } from '../../lib/geo';
import { normalizeText } from '../../lib/format';
import { SEED_PREFERENCES, SEED_RATINGS, SEED_VENUES } from './data';

const LATENCY_MS = 160;
const delay = () => new Promise<void>((r) => setTimeout(r, LATENCY_MS));

let nextId = 1000;
const newId = (prefix: string) => `${prefix}-${(nextId++).toString(36)}${Date.now().toString(36)}`;

// Mutable session state (cloned from the seeds).
const venues = SEED_VENUES.map((v) => ({ ...v }));
let ratings: Rating[] = SEED_RATINGS.map((r) => ({ ...r }));
let preferences: UserPreferences = { ...SEED_PREFERENCES };

const WIFI_RANK = { low: 1, medium: 2, high: 3 } as const;

function toSummary(v: (typeof venues)[number]): VenueSummary {
  const { openingHours: _oh, description: _d, imageUrls: _i, forecast: _f, ...summary } = v;
  // Keep openingHours on the summary so the "open now" filter can work offline.
  return { ...summary, openingHours: v.openingHours };
}

function venueName(venueId: string): string {
  return venues.find((v) => v.venueId === venueId)?.name ?? '';
}

export const mockApi: Api = {
  users: {
    async me() {
      await delay();
      return {
        userId: preferences.userId ?? 'mock-user-123',
        email: 'noa@work4u.co.il',
        role: 'USER',
        createdAt: '2026-01-01T10:00:00Z',
      };
    },
  },

  venues: {
    async list(query = {}) {
      await delay();
      const search = query.search ? normalizeText(query.search) : '';
      return venues
        .filter((v) => v.isActive !== false)
        .filter((v) => {
          if (
            search &&
            !(normalizeText(v.name).includes(search) || normalizeText(v.address).includes(search))
          )
            return false;
          if (query.priceRange && query.priceRange !== 'any' && v.priceRange !== query.priceRange)
            return false;
          if (query.wifiQuality && WIFI_RANK[v.wifiQuality] < WIFI_RANK[query.wifiQuality])
            return false;
          if (query.quietEnvironment && v.noiseLevel !== 'low') return false;
          if (query.needPowerOutlet && !v.hasPowerOutlets) return false;
          if (
            query.lat != null &&
            query.lng != null &&
            query.radiusKm != null &&
            haversineKm({ lat: query.lat, lng: query.lng }, { lat: v.latitude, lng: v.longitude }) >
              query.radiusKm
          )
            return false;
          return true;
        })
        .map(toSummary);
    },

    async get(venueId) {
      await delay();
      const v = venues.find((x) => x.venueId === venueId);
      if (!v) throw new ApiError('Venue not found', 'NOT_FOUND', 404);
      const detail: VenueDetail = {
        ...toSummary(v),
        openingHours: v.openingHours,
        description: v.description,
        imageUrls: v.imageUrls,
        forecast: v.forecast,
      };
      return detail;
    },

    async create(input) {
      await delay();
      const venueId = newId('venue');
      const createdAt = new Date().toISOString();
      venues.unshift({
        venueId,
        ...input,
        averageRating: 0,
        currentCrowdLevel: 'free',
        mainImageUrl: input.imageUrls[0] ?? '',
        isActive: true,
        forecast: [],
      });
      return { venueId, createdAt };
    },

    async update(venueId, input) {
      await delay();
      const v = venues.find((x) => x.venueId === venueId);
      if (!v) throw new ApiError('Venue not found', 'NOT_FOUND', 404);
      Object.assign(v, input, { mainImageUrl: input.imageUrls[0] ?? v.mainImageUrl });
      return { venueId, updatedAt: new Date().toISOString() };
    },

    async remove(venueId) {
      await delay();
      const v = venues.find((x) => x.venueId === venueId);
      if (!v) throw new ApiError('Venue not found', 'NOT_FOUND', 404);
      v.isActive = false;
      return { venueId, isActive: false };
    },

    async uploadUrl(venueId, fileName) {
      await delay();
      return {
        uploadUrl: `https://mock-s3.local/${venueId}/${fileName}?signed=mock`,
        imageUrl: `https://mock-s3.local/${venueId}/${fileName}`,
      };
    },
  },

  preferences: {
    async get() {
      await delay();
      return { ...preferences };
    },
    async save(input) {
      await delay();
      preferences = { userId: preferences.userId, ...input, updatedAt: new Date().toISOString() };
      return { ...preferences };
    },
  },

  ratings: {
    async submit(input) {
      await delay();
      const rating: Rating = {
        ratingId: newId('rating'),
        userId: 'mock-user-123',
        venueId: input.venueId,
        venueName: venueName(input.venueId),
        crowdLevel: input.crowdLevel,
        wifiRating: input.wifiRating,
        noiseRating: input.noiseRating,
        comment: input.comment ?? '',
        createdAt: new Date().toISOString(),
      };
      ratings = [rating, ...ratings];
      return rating;
    },
    async listMine() {
      await delay();
      return ratings.map((r) => ({ ...r }));
    },
    async update(ratingId, input) {
      await delay();
      const r = ratings.find((x) => x.ratingId === ratingId);
      if (!r) throw new ApiError('Rating not found', 'NOT_FOUND', 404);
      Object.assign(r, input, { updatedAt: new Date().toISOString() });
      return { ratingId, updatedAt: r.updatedAt! };
    },
    async remove(ratingId) {
      await delay();
      ratings = ratings.filter((x) => x.ratingId !== ratingId);
      return { ratingId };
    },
  },

  storage: {
    async uploadVenuePhoto(_venueId, file) {
      await delay();
      // Real, previewable URL for the selected file so the demo shows the photo.
      return URL.createObjectURL(file);
    },
  },
};
