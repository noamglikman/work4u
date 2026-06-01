// types/api.ts — EXACT mirror of the backend API contract (api-contract.md).
// These describe what the API Gateway / Lambda returns over the wire.
// camelCase field names; English enum values. Do not add UI-only fields here —
// derived/display fields live in types/view.ts and are produced by lib/mappers.ts.

// ── Enums (string unions matching the contract) ─────────────────────
export type PriceRange = 'low' | 'medium' | 'high';
/** Some filters/preferences allow "any" in addition to the three tiers. */
export type PriceRangeFilter = PriceRange | 'any';
export type WifiQuality = 'low' | 'medium' | 'high';
export type NoiseLevel = 'low' | 'medium' | 'high';
export type SeatType = 'table' | 'sofa' | 'bar' | 'any';
export type CrowdLevel = 'free' | 'reasonable' | 'crowded';
export type UserRole = 'USER' | 'ADMIN';

export type ApiErrorCode =
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'VALIDATION_ERROR'
  | 'NOT_FOUND'
  | 'SERVER_ERROR'
  | 'DUPLICATE_RESOURCE'
  | 'INVALID_LOCATION'
  | 'METHOD_NOT_ALLOWED';

// ── Global response envelope (§5) ───────────────────────────────────
export interface ApiSuccess<T> {
  success: true;
  message: string;
  data: T;
}
export interface ApiFailure {
  success: false;
  message: string;
  errorCode: ApiErrorCode | string;
}
export type ApiEnvelope<T> = ApiSuccess<T> | ApiFailure;

// ── Resources ───────────────────────────────────────────────────────

/** GET /users/me (§7.1, §9.1) */
export interface UserProfile {
  userId: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

/** Preferences (§7.2/7.3, §9.2) */
export interface UserPreferences {
  userId?: string;
  quietEnvironment: boolean;
  needPowerOutlet: boolean;
  wifiQuality: WifiQuality;
  preferredSeatType: SeatType;
  priceRange: PriceRange;
  updatedAt?: string;
}

/** Body for POST /preferences (no server-managed fields). */
export type UserPreferencesInput = Omit<UserPreferences, 'userId' | 'updatedAt'>;

/** A single point in a venue's hourly crowd forecast (§7.5). */
export interface ForecastPoint {
  hour: string; // "09:00"
  crowdLevel: CrowdLevel;
}

/** Venue summary as returned by GET /venues (§7.4). */
export interface VenueSummary {
  venueId: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  priceRange: PriceRange;
  wifiQuality: WifiQuality;
  noiseLevel: NoiseLevel;
  hasPowerOutlets: boolean;
  averageRating: number;
  currentCrowdLevel: CrowdLevel;
  mainImageUrl?: string;
  isActive?: boolean;
  /**
   * Optional extra the backend MAY include on summaries; used by the client-side
   * "open now" filter. Always present on VenueDetail.
   */
  openingHours?: string;
}

/** Full venue as returned by GET /venues/{venueId} (§7.5, §9.3). */
export interface VenueDetail extends VenueSummary {
  openingHours: string;
  description: string;
  imageUrls: string[];
  forecast: ForecastPoint[];
}

/** Body for POST /admin/venues and PUT /admin/venues/{id} (§8.1/8.2). */
export interface VenueInput {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  openingHours: string;
  priceRange: PriceRange;
  wifiQuality: WifiQuality;
  noiseLevel: NoiseLevel;
  hasPowerOutlets: boolean;
  description: string;
  imageUrls: string[];
}

/** Rating (§7.6, §9.4). */
export interface Rating {
  ratingId: string;
  userId?: string;
  venueId: string;
  venueName?: string;
  crowdLevel: CrowdLevel;
  wifiRating: number; // 1..5
  noiseRating: number; // 1..5
  comment?: string;
  createdAt: string;
  updatedAt?: string;
}

/** Body for POST /ratings. */
export interface RatingInput {
  venueId: string;
  crowdLevel: CrowdLevel;
  wifiRating: number;
  noiseRating: number;
  comment?: string;
}

/** Body for PUT /ratings/{ratingId}. */
export type RatingUpdate = Omit<RatingInput, 'venueId'>;

/** Query parameters accepted by GET /venues (§7.4). */
export interface VenueQuery {
  lat?: number;
  lng?: number;
  radiusKm?: number;
  search?: string;
  priceRange?: PriceRangeFilter;
  wifiQuality?: WifiQuality;
  quietEnvironment?: boolean;
  needPowerOutlet?: boolean;
}

/** Response of POST /admin/venues/{id}/images/upload-url (§8.4). */
export interface UploadUrlResponse {
  uploadUrl: string;
  imageUrl: string;
}
