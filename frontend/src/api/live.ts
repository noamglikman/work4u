// api/live.ts — the real AWS adapter. Maps each Api method to its API-contract
// endpoint via the http client (which attaches the Cognito JWT and unwraps the
// response envelope). Used when VITE_USE_MOCK=false and config is present.

import type {
  Rating,
  UploadUrlResponse,
  UserPreferences,
  UserProfile,
  VenueDetail,
  VenueSummary,
} from '../types/api';
import type { Api } from './services';
import { http } from './http';
import { ApiError } from './errors';

export const liveApi: Api = {
  users: {
    me: () => http.get<UserProfile>('/users/me'),
  },

  venues: {
    list: (query = {}) => http.get<VenueSummary[]>('/venues', { ...query }),
    get: (venueId) => http.get<VenueDetail>(`/venues/${encodeURIComponent(venueId)}`),
    create: (input) =>
      http.post<{ venueId: string; createdAt: string }>('/admin/venues', input),
    update: (venueId, input) =>
      http.put<{ venueId: string; updatedAt: string }>(
        `/admin/venues/${encodeURIComponent(venueId)}`,
        input,
      ),
    remove: (venueId) =>
      http.del<{ venueId: string; isActive: boolean }>(
        `/admin/venues/${encodeURIComponent(venueId)}`,
      ),
    uploadUrl: (venueId, fileName, contentType) =>
      http.post<UploadUrlResponse>(
        `/admin/venues/${encodeURIComponent(venueId)}/images/upload-url`,
        { fileName, contentType },
      ),
  },

  preferences: {
    get: () => http.get<UserPreferences>('/preferences'),
    save: (input) => http.post<UserPreferences>('/preferences', input),
  },

  ratings: {
    submit: (input) => http.post<Rating>('/ratings', input),
    listMine: () => http.get<Rating[]>('/ratings/my'),
    update: (ratingId, input) =>
      http.put<{ ratingId: string; updatedAt: string }>(
        `/ratings/${encodeURIComponent(ratingId)}`,
        input,
      ),
    remove: (ratingId) =>
      http.del<{ ratingId: string }>(`/ratings/${encodeURIComponent(ratingId)}`),
  },

  storage: {
    async uploadVenuePhoto(venueId, file) {
      // 1) ask the backend for a short-lived presigned PUT URL
      const { uploadUrl, imageUrl } = await liveApi.venues.uploadUrl(
        venueId,
        file.name,
        file.type || 'application/octet-stream',
      );
      // 2) upload the bytes straight to S3 (no auth header — the URL is signed)
      const res = await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type || 'application/octet-stream' },
        body: file,
      });
      if (!res.ok) {
        throw new ApiError(`S3 upload failed (HTTP ${res.status})`, 'SERVER_ERROR', res.status);
      }
      // 3) the public URL to persist on the venue record
      return imageUrl;
    },
  },
};
