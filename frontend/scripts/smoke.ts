// Runtime smoke test of the integration-critical data layer (mock adapter +
// mappers + filter→query mapping). Bundled with esbuild and run under Node.
// Not part of the app; lives in scripts/ and is excluded from the TS build.
import { mockApi } from '../src/api/mock/store';
import { toVenuePreview, toVenueView } from '../src/lib/mappers';
import { buildVenueQuery, DEFAULT_FILTERS } from '../src/lib/filters';
import { isOpenNow } from '../src/lib/hours';
import { DEFAULT_LOCATION } from '../src/lib/geo';

let failures = 0;
function check(name: string, cond: boolean) {
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}`);
  if (!cond) failures++;
}

async function run() {
  // 1) list + map to preview
  const all = await mockApi.venues.list({});
  check('list returns seeded venues', all.length === 6);
  const previews = all.map((v) => toVenuePreview(v, DEFAULT_LOCATION));
  check('preview has distance label', previews.every((p) => p.distanceLabel.length > 0));
  check('preview derives Hebrew tags', previews.some((p) => p.tags.includes('שקט')));

  // 2) filter→query mapping then filtering
  const q = buildVenueQuery({ ...DEFAULT_FILTERS, quiet: true }, '', DEFAULT_LOCATION);
  check('query maps quiet→quietEnvironment', q.quietEnvironment === true);
  const quiet = await mockApi.venues.list(q);
  check('quiet filter narrows results', quiet.length > 0 && quiet.length < all.length);
  check('quiet results are all low noise', quiet.every((v) => v.noiseLevel === 'low'));

  // 3) search
  const searched = await mockApi.venues.list({ search: 'סלון' });
  check(
    'search matches by name (niqqud-insensitive)',
    searched.length === 1 && searched[0].venueId === 'venue-001',
  );

  // 4) detail → view (forecast + labels)
  const detail = await mockApi.venues.get('venue-001');
  const view = toVenueView(detail, DEFAULT_LOCATION);
  check('detail maps forecast bars', view.forecast.length > 0 && view.forecast[0].value > 0);
  check('detail maps wifi label', view.wifiLabel.length > 0);

  // 5) ratings round-trip
  const before = await mockApi.ratings.listMine();
  const created = await mockApi.ratings.submit({
    venueId: 'venue-001',
    crowdLevel: 'free',
    wifiRating: 5,
    noiseRating: 4,
  });
  const after = await mockApi.ratings.listMine();
  check('submit adds a rating', after.length === before.length + 1);
  check('submitted rating carries venue name', Boolean(created.venueName));
  await mockApi.ratings.remove(created.ratingId);
  const afterDelete = await mockApi.ratings.listMine();
  check('delete removes the rating', afterDelete.length === before.length);

  // 6) preferences round-trip
  const saved = await mockApi.preferences.save({
    quietEnvironment: false,
    needPowerOutlet: false,
    wifiQuality: 'low',
    preferredSeatType: 'sofa',
    priceRange: 'low',
  });
  check('preferences save echoes input', saved.preferredSeatType === 'sofa');
  const reread = await mockApi.preferences.get();
  check('preferences persist', reread.wifiQuality === 'low');

  // 7) admin create → appears in list
  const { venueId } = await mockApi.venues.create({
    name: 'מתחם בדיקה',
    address: 'הרצל 1, תל אביב',
    latitude: 32.07,
    longitude: 34.78,
    openingHours: '09:00-18:00',
    priceRange: 'medium',
    wifiQuality: 'high',
    noiseLevel: 'low',
    hasPowerOutlets: true,
    description: '',
    imageUrls: [],
  });
  const afterCreate = await mockApi.venues.list({});
  check('admin create adds a venue', afterCreate.some((v) => v.venueId === venueId));

  // 8) opening-hours filter helper
  check('isOpenNow: open at noon', isOpenNow('08:00-22:00', new Date('2026-06-01T12:00:00')));
  check('isOpenNow: closed at 6am', !isOpenNow('08:00-22:00', new Date('2026-06-01T06:00:00')));
  check('isOpenNow: overnight range', isOpenNow('20:00-02:00', new Date('2026-06-01T01:00:00')));
  check('isOpenNow: unknown → open', isOpenNow(undefined));

  console.log(failures === 0 ? '\nALL PASSED' : `\n${failures} FAILED`);
  process.exit(failures === 0 ? 0 : 1);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
