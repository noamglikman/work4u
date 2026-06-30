// screens/Home.tsx — map + recommendations sidebar (ported from WebHome).

import { useMemo, useState } from 'react';
import type { VenuePreview } from '../types/view';
import { DEFAULT_FILTERS, type Filters } from '../lib/filters';
import type { PriceRangeFilter, UserPreferencesInput } from '../types/api';
import type { LatLng } from '../lib/geo';
import { PRICE_FILTER_LABEL } from '../lib/labels';
import { DEDUPED_SEARCH_LOCATIONS as SEARCH_LOCATIONS } from '../lib/searchLocations';
import { Icon, OccPill, Photo, Tag, type IconName } from '../components/ui';
import { MapCanvas } from '../components/MapCanvas';
import { VenueListCard } from '../components/VenueListCard';
import { usePreferences } from '../hooks/usePreferences';

interface HomeProps {
  openVenue: (id: string) => void;
  venues: VenuePreview[];
  loading: boolean;
  error: string | null;
  search: string;
  setSearch: (v: string) => void;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  location: LatLng;
  searchLocationId: string;
  setSearchLocationId: (id: string) => void;
  openAdminVenues: () => void;
}

type BoolFilterKey = 'quiet' | 'power' | 'wifi' | 'open';

const CHIPS: Array<[BoolFilterKey, string, IconName]> = [
  ['quiet', 'שקט', 'noise'],
  ['power', 'שקעים', 'power'],
  ['wifi', 'Wi-Fi מהיר', 'wifi'],
  ['open', 'פתוח עכשיו', 'clock'],
];

const PRICE_BUTTONS: PriceRangeFilter[] = ['any', 'low', 'medium', 'high'];

export function Home({
  openVenue,
  venues,
  loading,
  error,
  search,
  setSearch,
  filters,
  setFilters,
  location,
  searchLocationId,
  setSearchLocationId,
}: HomeProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showAdv, setShowAdv] = useState(false);
  const { preferences, save: savePreferences } = usePreferences();

  const favoriteVenueIds = useMemo(
    () => preferences?.favoriteVenueIds ?? [],
    [preferences?.favoriteVenueIds],
  );

  const setF = <K extends keyof Filters>(k: K, v: Filters[K]) =>
    setFilters((f) => ({ ...f, [k]: v }));

  const toggleFavorite = async (venueId: string) => {
    const current = preferences;
    const currentFavorites = current?.favoriteVenueIds ?? [];
    const isAlreadyFavorite = currentFavorites.includes(venueId);

    const nextFavorites = isAlreadyFavorite
      ? currentFavorites.filter((id) => id !== venueId)
      : [...currentFavorites, venueId];

    const input: UserPreferencesInput = {
      quietEnvironment: current?.quietEnvironment ?? false,
      needPowerOutlet: current?.needPowerOutlet ?? false,
      wifiQuality: current?.wifiQuality ?? 'medium',
      preferredSeatType: current?.preferredSeatType ?? 'any',
      priceRange: current?.priceRange ?? 'medium',
      favoriteVenueIds: nextFavorites,
    };

    await savePreferences(input);
  };

  const sel = venues.find((v) => v.id === selected);

  return (
    <div className="w4-home-grid">
      {/* Sidebar */}
      <aside
        className="w4-home-side"
        style={{
          background: 'var(--w4-bg)',
          borderInlineStart: '1px solid var(--w4-border)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '20px 20px 14px', borderBottom: '1px solid var(--w4-border)' }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 3px', letterSpacing: '-0.02em' }}>
            מומלצים עבורך
          </h1>
          <p style={{ fontSize: 13, color: 'var(--w4-muted)', margin: '0 0 14px' }}>
            מותאם להעדפות ולמיקום שלך
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 9,
              background: 'var(--w4-surface)',
              borderRadius: 'var(--w4-radius-sm)',
              padding: '11px 14px',
              boxShadow: 'inset 0 0 0 1.5px var(--w4-border)',
            }}
          >
            <Icon name="search" size={19} style={{ color: 'var(--w4-faint)' }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="חיפוש מקום, שכונה או עיר…"
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontFamily: 'inherit',
                fontSize: 14.5,
                color: 'var(--w4-text)',
                minWidth: 0,
              }}
            />
          </div>
          <div style={{ marginTop: 12 }}>
            <label
              style={{
                display: 'block',
                fontSize: 13,
                fontWeight: 700,
                color: 'var(--w4-muted)',
                marginBottom: 6,
              }}
            >
              אזור חיפוש
            </label>
            <select
              value={searchLocationId}
              onChange={(e) => setSearchLocationId(e.target.value)}
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                background: 'var(--w4-surface)',
                color: 'var(--w4-text)',
                borderRadius: 'var(--w4-radius-sm)',
                padding: '11px 14px',
                fontFamily: 'inherit',
                fontSize: 14.5,
                fontWeight: 600,
                boxShadow: 'inset 0 0 0 1.5px var(--w4-border)',
              }}
            >
              {SEARCH_LOCATIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 12 }}>
            <Tag
              icon="sliders"
              active={false}
              onClick={() => {
                setSearch('');
                setFilters(DEFAULT_FILTERS);
              }}
            >
              איפוס סינון
            </Tag>

            {CHIPS.map(([k, l, ic]) => (
              <Tag key={k} icon={ic} active={filters[k]} onClick={() => setF(k, !filters[k])}>
                {l}
              </Tag>
            ))}
            <Tag icon="sliders" active={showAdv} onClick={() => setShowAdv((s) => !s)}>
              עוד
            </Tag>
          </div>
          {showAdv && (
            <div
              style={{
                marginTop: 14,
                padding: 14,
                background: 'var(--w4-surface)',
                borderRadius: 'var(--w4-radius-sm)',
                boxShadow: 'var(--w4-shadow-sm)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: 8,
                }}
              >
                <span style={{ fontSize: 13.5, fontWeight: 700 }}>רדיוס חיפוש</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--w4-accent)' }}>
                  {filters.radiusKm + ' ק״מ'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={filters.radiusKm}
                onChange={(e) => setF('radiusKm', +e.target.value)}
                style={{ width: '100%', accentColor: 'var(--w4-accent)' }}
              />
              <div style={{ fontSize: 13.5, fontWeight: 700, margin: '12px 0 8px' }}>טווח מחירים</div>
              <div style={{ display: 'flex', gap: 7 }}>
                {PRICE_BUTTONS.map((p) => (
                  <button
                    key={p}
                    onClick={() => setF('price', p)}
                    style={{
                      flex: 1,
                      padding: '9px 0',
                      borderRadius: 9,
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      fontSize: 13.5,
                      fontWeight: 700,
                      background: filters.price === p ? 'var(--w4-accent)' : 'var(--w4-surface-2)',
                      color: filters.price === p ? 'var(--w4-on-accent)' : 'var(--w4-text)',
                    }}
                  >
                    {PRICE_FILTER_LABEL[p]}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '14px 20px 24px' }}>
          <div style={{ fontSize: 12.5, color: 'var(--w4-muted)', fontWeight: 600, marginBottom: 12 }}>
            {loading ? 'טוען מתחמים…' : `${venues.length} מתחמים נמצאו`}
          </div>
          {error ? (
            <div style={{ textAlign: 'center', padding: '40px 10px', color: 'var(--w4-danger)' }}>
              <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.5 }}>{error}</div>
            </div>
          ) : !loading && venues.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 10px', color: 'var(--w4-muted)' }}>
              <div style={{ fontSize: 30, marginBottom: 8 }}>🔍</div>
              <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.5 }}>
                לא נמצאו מתחמי עבודה
                <br />
                העונים על דרישות הסינון שלך
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, opacity: loading ? 0.5 : 1 }}>
              {venues.map((v) => (
                <VenueListCard
                  key={v.id}
                  v={v}
                  active={selected === v.id}
                  isFavorite={favoriteVenueIds.includes(v.id)}
                  onToggleFavorite={toggleFavorite}
                  onClick={() => openVenue(v.id)}
                />
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* Map */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <MapCanvas venues={venues} onPin={(id) => setSelected(id)} selected={selected} location={location} />
        {sel && (
          <div
            onClick={() => openVenue(sel.id)}
            key={sel.id}
            style={{
              position: 'absolute',
              insetInlineStart: 18,
              bottom: 18,
              width: 320,
              cursor: 'pointer',
              background: 'var(--w4-surface)',
              borderRadius: 'var(--w4-radius)',
              boxShadow: 'var(--w4-shadow)',
              padding: 10,
              display: 'flex',
              gap: 12,
              alignItems: 'center',
              animation: 'wpop .2s ease',
            }}
          >
            <div style={{ width: 64, height: 64, borderRadius: 13, overflow: 'hidden', flexShrink: 0 }}>
              <Photo color={sel.accent} emoji={sel.emoji} h={64} src={sel.imageUrl} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 15.5 }}>{sel.name}</div>
              <div style={{ fontSize: 12.5, color: 'var(--w4-muted)', margin: '2px 0 6px' }}>
                {[sel.area, sel.distanceLabel].filter(Boolean).join(' · ')}
              </div>
              <OccPill occ={sel.crowdLevel} size="sm" />
            </div>
            <Icon name="chevron" size={20} style={{ color: 'var(--w4-faint)', transform: 'scaleX(-1)' }} />
          </div>
        )}
      </div>
    </div>
  );
}
