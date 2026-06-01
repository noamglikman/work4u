// api/services.ts — the service contract the UI depends on.
// Both the mock adapter and the live (AWS) adapter implement `Api`, so swapping
// between them is a single decision made in api/index.ts.

import type {
  Rating,
  RatingInput,
  RatingUpdate,
  UploadUrlResponse,
  UserPreferences,
  UserPreferencesInput,
  UserProfile,
  VenueDetail,
  VenueInput,
  VenueQuery,
  VenueSummary,
} from '../types/api';

export interface UserService {
  /** GET /users/me */
  me(): Promise<UserProfile>;
}

export interface VenueService {
  /** GET /venues */
  list(query?: VenueQuery): Promise<VenueSummary[]>;
  /** GET /venues/{venueId} */
  get(venueId: string): Promise<VenueDetail>;
  /** POST /admin/venues (admin) */
  create(input: VenueInput): Promise<{ venueId: string; createdAt: string }>;
  /** PUT /admin/venues/{venueId} (admin) */
  update(venueId: string, input: VenueInput): Promise<{ venueId: string; updatedAt: string }>;
  /** DELETE /admin/venues/{venueId} (admin, soft delete) */
  remove(venueId: string): Promise<{ venueId: string; isActive: boolean }>;
  /** POST /admin/venues/{venueId}/images/upload-url (admin) */
  uploadUrl(
    venueId: string,
    fileName: string,
    contentType: string,
  ): Promise<UploadUrlResponse>;
}

export interface PreferenceService {
  /** GET /preferences */
  get(): Promise<UserPreferences>;
  /** POST /preferences */
  save(input: UserPreferencesInput): Promise<UserPreferences>;
}

export interface RatingService {
  /** POST /ratings */
  submit(input: RatingInput): Promise<Rating>;
  /** GET /ratings/my */
  listMine(): Promise<Rating[]>;
  /** PUT /ratings/{ratingId} */
  update(ratingId: string, input: RatingUpdate): Promise<{ ratingId: string; updatedAt: string }>;
  /** DELETE /ratings/{ratingId} */
  remove(ratingId: string): Promise<{ ratingId: string }>;
}

export interface StorageService {
  /**
   * Full presigned-URL upload (api-contract §8.4 + AWS guide §6):
   * ask the backend for a short-lived PUT URL, upload the file straight to S3,
   * and return the public image URL to store on the venue record.
   */
  uploadVenuePhoto(venueId: string, file: File): Promise<string>;
}

export interface Api {
  users: UserService;
  venues: VenueService;
  preferences: PreferenceService;
  ratings: RatingService;
  storage: StorageService;
}
