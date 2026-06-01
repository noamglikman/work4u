// api/mock/data.ts — seed data for the mock adapter, in EXACT API-contract shape.
// Hebrew names/addresses (it's an Israeli app) but English enum values + camelCase
// field names, just like the real DynamoDB records would be. Coordinates are real
// Tel Aviv points so distance + map projection behave correctly offline.

import type {
  CrowdLevel,
  Rating,
  UserPreferences,
  VenueDetail,
  VenueSummary,
} from '../../types/api';

/** Build an hourly forecast (08:00–21:00) from prototype-style load numbers. */
function forecast(loads: number[]): VenueDetail['forecast'] {
  const level = (n: number): CrowdLevel =>
    n >= 70 ? 'crowded' : n >= 40 ? 'reasonable' : 'free';
  return loads.map((n, i) => ({
    hour: `${String(8 + i).padStart(2, '0')}:00`,
    crowdLevel: level(n),
  }));
}

interface Seed extends VenueSummary {
  openingHours: string;
  description: string;
  imageUrls: string[];
  forecast: VenueDetail['forecast'];
}

export const SEED_VENUES: Seed[] = [
  {
    venueId: 'venue-001',
    name: 'מרחב סָלון',
    address: 'נחלת בנימין 12, תל אביב',
    latitude: 32.0665,
    longitude: 34.7705,
    priceRange: 'medium',
    wifiQuality: 'high',
    noiseLevel: 'low',
    hasPowerOutlets: true,
    averageRating: 4.6,
    currentCrowdLevel: 'free',
    mainImageUrl: '',
    isActive: true,
    openingHours: '07:30-23:00',
    description:
      'בית קפה־סלון עם פינות עבודה רכות, אינטרנט יציב ושקעים בכל שולחן. אהוב על פרילנסרים.',
    imageUrls: [],
    forecast: forecast([20, 35, 55, 70, 60, 45, 40, 55, 75, 85, 70, 50, 40, 30]),
  },
  {
    venueId: 'venue-002',
    name: 'הסדנה · חלל עבודה',
    address: 'רוטשילד 45, תל אביב',
    latitude: 32.0635,
    longitude: 34.774,
    priceRange: 'high',
    wifiQuality: 'high',
    noiseLevel: 'low',
    hasPowerOutlets: true,
    averageRating: 4.8,
    currentCrowdLevel: 'reasonable',
    mainImageUrl: '',
    isActive: true,
    openingHours: '08:00-22:00',
    description: 'חלל עבודה שיתופי שקט עם חדרי zoom, קפה חופשי ותאורה טבעית מצוינת.',
    imageUrls: [],
    forecast: forecast([10, 30, 60, 80, 75, 65, 55, 60, 70, 65, 50, 35, 25, 15]),
  },
  {
    venueId: 'venue-003',
    name: 'אספרסו בר נַחְלָה',
    address: 'פלורנטין 30, תל אביב',
    latitude: 32.0558,
    longitude: 34.7695,
    priceRange: 'low',
    wifiQuality: 'medium',
    noiseLevel: 'high',
    hasPowerOutlets: false,
    averageRating: 4.3,
    currentCrowdLevel: 'crowded',
    mainImageUrl: '',
    isActive: true,
    openingHours: '07:00-20:00',
    description:
      'בר קפה אנרגטי בלב פלורנטין. רועש וחי — מושלם לפגישות קצרות, פחות לריכוז עמוק.',
    imageUrls: [],
    forecast: forecast([40, 65, 85, 90, 80, 70, 75, 85, 80, 60, 45, 30, 20, 10]),
  },
  {
    venueId: 'venue-004',
    name: 'ספריית עין הקורא',
    address: 'מונטיפיורי 8, תל אביב',
    latitude: 32.0688,
    longitude: 34.7785,
    priceRange: 'low',
    wifiQuality: 'medium',
    noiseLevel: 'low',
    hasPowerOutlets: true,
    averageRating: 4.7,
    currentCrowdLevel: 'free',
    mainImageUrl: '',
    isActive: true,
    openingHours: '09:00-21:00',
    description:
      'בית קפה־ספרייה לאוהבי השקט. עמדות לימוד מרווחות, מדפי ספרים ופינת תה.',
    imageUrls: [],
    forecast: forecast([15, 25, 45, 55, 50, 55, 60, 65, 70, 60, 45, 35, 25, 20]),
  },
  {
    venueId: 'venue-005',
    name: 'קולקטיב גְּרָאנְד',
    address: 'אבן גבירול 70, תל אביב',
    latitude: 32.082,
    longitude: 34.779,
    priceRange: 'medium',
    wifiQuality: 'high',
    noiseLevel: 'medium',
    hasPowerOutlets: true,
    averageRating: 4.5,
    currentCrowdLevel: 'reasonable',
    mainImageUrl: '',
    isActive: true,
    openingHours: '08:00-24:00',
    description:
      'מתחם עבודה ענק עם אזורים שקטים ותוססים, פתוח עד מאוחר. אהוב על סטודנטים.',
    imageUrls: [],
    forecast: forecast([10, 20, 40, 55, 50, 45, 50, 60, 75, 80, 75, 65, 55, 45]),
  },
  {
    venueId: 'venue-006',
    name: 'ביבר קפה',
    address: 'נמל תל אביב, תל אביב',
    latitude: 32.0975,
    longitude: 34.772,
    priceRange: 'medium',
    wifiQuality: 'medium',
    noiseLevel: 'medium',
    hasPowerOutlets: true,
    averageRating: 4.4,
    currentCrowdLevel: 'free',
    mainImageUrl: '',
    isActive: true,
    openingHours: '07:30-22:30',
    description:
      'בית קפה עם מרפסת ונוף לים. אווירה רגועה, מתאים לעבודה עם הפסקות נשימה.',
    imageUrls: [],
    forecast: forecast([25, 40, 55, 60, 55, 50, 45, 50, 55, 50, 40, 35, 30, 25]),
  },
];

export const SEED_RATINGS: Rating[] = [
  {
    ratingId: 'rating-001',
    userId: 'mock-user-123',
    venueId: 'venue-002',
    venueName: 'הסדנה · חלל עבודה',
    crowdLevel: 'reasonable',
    wifiRating: 5,
    noiseRating: 5,
    comment: 'מקום מעולה לריכוז, שקט ונעים.',
    createdAt: '2026-05-28T09:30:00Z',
  },
  {
    ratingId: 'rating-002',
    userId: 'mock-user-123',
    venueId: 'venue-001',
    venueName: 'מרחב סָלון',
    crowdLevel: 'free',
    wifiRating: 5,
    noiseRating: 4,
    comment: '',
    createdAt: '2026-05-21T14:10:00Z',
  },
  {
    ratingId: 'rating-003',
    userId: 'mock-user-123',
    venueId: 'venue-003',
    venueName: 'אספרסו בר נַחְלָה',
    crowdLevel: 'crowded',
    wifiRating: 3,
    noiseRating: 2,
    comment: 'רועש בשעות הצהריים.',
    createdAt: '2026-05-14T12:00:00Z',
  },
  {
    ratingId: 'rating-004',
    userId: 'mock-user-123',
    venueId: 'venue-004',
    venueName: 'ספריית עין הקורא',
    crowdLevel: 'free',
    wifiRating: 4,
    noiseRating: 5,
    comment: '',
    createdAt: '2026-05-03T16:45:00Z',
  },
];

export const SEED_PREFERENCES: UserPreferences = {
  userId: 'mock-user-123',
  quietEnvironment: true,
  needPowerOutlet: true,
  wifiQuality: 'high',
  preferredSeatType: 'table',
  priceRange: 'medium',
  updatedAt: '2026-05-01T10:00:00Z',
};
