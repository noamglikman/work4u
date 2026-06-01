// screens/Venue.tsx — full workspace profile (ported from WebVenue).
// Fetches GET /venues/{id} via useVenue and maps it to the view model.

import { useVenue } from '../hooks/useVenues';
import { nowForecastIndex } from '../lib/mappers';
import type { LatLng } from '../lib/geo';
import type { Navigate } from '../types/nav';
import { Button, Icon, OccPill, Photo, SpecRow, Tag } from '../components/ui';
import { ForecastGraph } from '../components/ForecastGraph';

interface VenueProps {
  venueId: string;
  go: Navigate;
  location: LatLng;
  openRating: (target: { id: string; name: string }) => void;
}

export function Venue({ venueId, go, location, openRating }: VenueProps) {
  const { venue: v, loading, error } = useVenue(venueId, location);

  const BackButton = (
    <button
      onClick={() => go('home')}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        border: 'none',
        background: 'var(--w4-surface)',
        boxShadow: 'var(--w4-shadow-sm)',
        borderRadius: 999,
        padding: '9px 16px 9px 13px',
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontSize: 14,
        fontWeight: 700,
        color: 'var(--w4-text)',
        marginBottom: 18,
      }}
    >
      <Icon name="back" size={18} /> חזרה למפה
    </button>
  );

  if (loading) {
    return (
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '24px 24px 60px' }}>
        {BackButton}
        <div style={{ color: 'var(--w4-muted)', fontSize: 15, padding: '60px 0', textAlign: 'center' }}>
          טוען פרטי מתחם…
        </div>
      </div>
    );
  }
  if (error || !v) {
    return (
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '24px 24px 60px' }}>
        {BackButton}
        <div style={{ color: 'var(--w4-danger)', fontSize: 15, padding: '60px 0', textAlign: 'center' }}>
          {error ?? 'המתחם לא נמצא'}
        </div>
      </div>
    );
  }

  const nowIdx = nowForecastIndex(v.forecast, new Date().getHours());
  const placeholders = [v.accent, '#A88B6B', '#7E8B72', '#9A7B86'];
  const tiles = Array.from({ length: 4 }, (_, i) => ({
    src: v.imageUrls[i],
    color: placeholders[i % placeholders.length],
    emoji: i === 0 ? v.emoji : undefined,
    label: i === 0 ? 'gallery · Amazon S3' : `photo ${i + 1}`,
  }));

  const navigate = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${v.lat},${v.lng}`;
    window.open(url, '_blank', 'noopener');
  };

  return (
    <div style={{ maxWidth: 1080, margin: '0 auto', padding: '24px 24px 60px' }}>
      {BackButton}

      {/* gallery */}
      <div
        className="w4-gallery"
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: 10,
          height: 320,
          marginBottom: 22,
        }}
      >
        <div style={{ gridRow: 'span 2', borderRadius: 'var(--w4-radius)', overflow: 'hidden' }}>
          <Photo color={tiles[0].color} emoji={tiles[0].emoji} h={320} label={tiles[0].label} src={tiles[0].src} />
        </div>
        <div style={{ borderRadius: 'var(--w4-radius)', overflow: 'hidden' }}>
          <Photo color={tiles[1].color} h={155} label={tiles[1].label} src={tiles[1].src} />
        </div>
        <div style={{ borderRadius: 'var(--w4-radius)', overflow: 'hidden' }}>
          <Photo color={tiles[2].color} h={155} label={tiles[2].label} src={tiles[2].src} />
        </div>
        <div style={{ gridColumn: 'span 2', borderRadius: 'var(--w4-radius)', overflow: 'hidden' }}>
          <Photo color={tiles[3].color} h={155} label={tiles[3].label} src={tiles[3].src} />
        </div>
      </div>

      <div
        className="w4-venue-cols"
        style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 26, alignItems: 'start' }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: 16,
              marginBottom: 12,
            }}
          >
            <div>
              <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
                {v.name}
              </h1>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  color: 'var(--w4-muted)',
                  fontSize: 15,
                }}
              >
                <Icon name="pin" size={16} />
                <span>{[v.area, v.distanceLabel].filter(Boolean).join(' · ')}</span>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                color: 'var(--w4-warn)',
                fontWeight: 800,
                fontSize: 22,
                whiteSpace: 'nowrap',
              }}
            >
              <Icon name="star" size={20} fill="var(--w4-warn)" stroke="var(--w4-warn)" sw={1.4} />
              {v.rating}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <OccPill occ={v.crowdLevel} />
            <span style={{ fontSize: 13.5, color: 'var(--w4-muted)' }}>עומס נוכחי לפי הקהילה</span>
          </div>
          {v.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
              {v.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          )}
          <p
            style={{
              fontSize: 15.5,
              lineHeight: 1.65,
              margin: '0 0 24px',
              opacity: 0.88,
              maxWidth: 560,
            }}
          >
            {v.description}
          </p>
          <div
            style={{
              background: 'var(--w4-surface)',
              borderRadius: 'var(--w4-radius)',
              padding: '20px 22px 18px',
              boxShadow: 'var(--w4-shadow-sm)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 22 }}>
              <Icon name="clock" size={19} style={{ color: 'var(--w4-accent)' }} />
              <span style={{ fontSize: 16.5, fontWeight: 800 }}>תחזית עומס לפי שעה</span>
            </div>
            <ForecastGraph data={v.forecast} nowIdx={nowIdx} />
          </div>
        </div>

        <aside style={{ position: 'sticky', top: 84, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div
            style={{
              background: 'var(--w4-surface)',
              borderRadius: 'var(--w4-radius)',
              padding: '6px 18px',
              boxShadow: 'var(--w4-shadow-sm)',
            }}
          >
            <SpecRow icon="wifi" label="איכות אינטרנט" value={v.wifiLabel} accent />
            <div style={{ height: 1, background: 'var(--w4-border)' }} />
            <SpecRow icon="power" label="שקעי חשמל" value={v.powerLabel} />
            <div style={{ height: 1, background: 'var(--w4-border)' }} />
            <SpecRow icon="noise" label="רמת רעש" value={v.noiseLabel} />
            <div style={{ height: 1, background: 'var(--w4-border)' }} />
            <SpecRow icon="clock" label="שעות" value={v.openingHours} />
            <div style={{ height: 1, background: 'var(--w4-border)' }} />
            <SpecRow icon="shekel" label="מחירים" value={v.priceLabel} />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Button variant="soft" icon="star" onClick={() => openRating({ id: v.id, name: v.name })}>
              דרג
            </Button>
            <Button full icon="pin" onClick={navigate}>
              פתח בניווט
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
