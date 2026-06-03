import { useEffect, useRef } from 'react';
// screens/Venue.tsx — full workspace profile (ported from WebVenue).
// Fetches GET /venues/{id} via useVenue and maps it to the view model.

import { api } from '../api';
import { useVenue } from '../hooks/useVenues';
import { useAuth } from '../context/AuthContext';
import { nowForecastIndex } from '../lib/mappers';
import type { LatLng } from '../lib/geo';
import type { Navigate } from '../types/nav';
import { Button, Icon, OccPill, Photo, SpecRow, Tag } from '../components/ui';
import { ForecastGraph } from '../components/ForecastGraph';

interface VenueProps {
  venueId: string;
  go: Navigate;
  location: LatLng;
  openRating: (target: { id: string; name: string; placeType?: string }) => void;
}

export function Venue({ venueId, go, location, openRating }: VenueProps) {
  const { isAdmin } = useAuth();
  const { venue: v, loading, error } = useVenue(venueId, location);
  const sentOpenLearningRef = useRef<string | null>(null);

  useEffect(() => {
    if (!v) return;
    if (sentOpenLearningRef.current === v.id) return;

    sentOpenLearningRef.current = v.id;

    void api.learning
      .record({
        type: 'open_venue',
        venueId: v.id,
        placeType: (v as any).placeType,
      })
      .catch(() => {
        // Learning is best-effort and should not block the page.
      });
  }, [v]);

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

  const realImages = (v.imageUrls ?? []).filter((src) => src && src.trim().length > 0);
  const hasRealImages = realImages.length > 0;
  const placeholders = [v.accent, '#A88B6B', '#7E8B72', '#9A7B86'];

  const tiles = Array.from({ length: Math.min(Math.max(realImages.length, 1), 4) }, (_, i) => ({
    src: realImages[i],
    color: placeholders[i % placeholders.length],
    emoji: !hasRealImages && i === 0 ? v.emoji : undefined,
    label: hasRealImages ? `תמונה ${i + 1}` : 'אין תמונה זמינה',
  }));


  const website = ((v as any).website ?? '').trim();
  const phone = ((v as any).phone ?? '').trim();
  const email = ((v as any).email ?? '').trim();
  const contactNote = ((v as any).contactNote ?? '').trim();
  const accessNote = ((v as any).accessNote ?? '').trim();
  const categoryLabel = ((v as any).categoryLabel ?? '').trim();

  const hasContactInfo = Boolean(website || phone || email || contactNote || accessNote || categoryLabel);

  const openWebsite = () => {
    const normalized = website.startsWith('http') ? website : `https://${website}`;
    window.open(normalized, '_blank', 'noopener');
  };

  const navigate = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${v.lat},${v.lng}`;
    window.open(url, '_blank', 'noopener');
  };

  return (
    <div style={{ maxWidth: 1080, margin: '0 auto', padding: '24px 24px 60px' }}>
      {BackButton}

      {/* gallery / clean fallback */}
      {hasRealImages ? (
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
            <Photo color={tiles[0].color} h={320} label={tiles[0].label} src={tiles[0].src} />
          </div>

          {[1, 2].map((i) => (
            <div key={i} style={{ borderRadius: 'var(--w4-radius)', overflow: 'hidden' }}>
              {tiles[i]?.src ? (
                <Photo color={tiles[i].color} h={155} label={tiles[i].label} src={tiles[i].src} />
              ) : (
                <Photo color={placeholders[i % placeholders.length]} h={155} label="תמונה לא זמינה" />
              )}
            </div>
          ))}

          <div style={{ gridColumn: 'span 2', borderRadius: 'var(--w4-radius)', overflow: 'hidden' }}>
            {tiles[3]?.src ? (
              <Photo color={tiles[3].color} h={155} label={tiles[3].label} src={tiles[3].src} />
            ) : (
              <Photo color={placeholders[3]} h={155} label="תמונה לא זמינה" />
            )}
          </div>
        </div>
      ) : (
        <div
          style={{
            height: 260,
            borderRadius: 'var(--w4-radius)',
            background:
              'linear-gradient(135deg, var(--w4-surface), var(--w4-surface-2))',
            boxShadow: 'var(--w4-shadow-sm)',
            marginBottom: 22,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: 28,
            color: 'var(--w4-muted)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.08,
              backgroundImage:
                'repeating-linear-gradient(45deg, var(--w4-text) 0, var(--w4-text) 2px, transparent 2px, transparent 14px)',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: 58, marginBottom: 12 }}>{v.emoji}</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: 'var(--w4-text)', marginBottom: 6 }}>
              {categoryLabel || 'מקום עבודה'}
            </div>
            <div style={{ fontSize: 14.5, lineHeight: 1.55, maxWidth: 420 }}>
              אין תמונה זמינה למקום זה כרגע.
              {isAdmin ? ' ניתן להוסיף תמונות אמיתיות דרך פאנל המנהל.' : ''}
            </div>
          </div>
        </div>
      )}

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
          {hasContactInfo && (
            <div
              style={{
                background: 'var(--w4-surface)',
                borderRadius: 'var(--w4-radius)',
                padding: '18px',
                boxShadow: 'var(--w4-shadow-sm)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <Icon name="pin" size={18} style={{ color: 'var(--w4-accent)' }} />
                <span style={{ fontSize: 16, fontWeight: 800 }}>יצירת קשר ותנאי כניסה</span>
              </div>

              {categoryLabel && (
                <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 8, color: 'var(--w4-accent)' }}>
                  {categoryLabel}
                </div>
              )}

              {accessNote && (
                <div style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--w4-muted)', marginBottom: 12 }}>
                  {accessNote}
                </div>
              )}

              {contactNote && (
                <div style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--w4-muted)', marginBottom: 12 }}>
                  {contactNote}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {website && (
                  <Button variant="soft" icon="pin" onClick={openWebsite}>
                    אתר המקום
                  </Button>
                )}

                {phone ? (
                  <a
                    href={`tel:${phone}`}
                    style={{
                      textDecoration: 'none',
                      color: 'var(--w4-text)',
                      fontSize: 14,
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <Icon name="pin" size={15} style={{ color: 'var(--w4-accent)' }} />
                    טלפון: {phone}
                  </a>
                ) : (
                  <div
                    style={{
                      background: 'var(--w4-surface-2)',
                      borderRadius: 'var(--w4-radius-sm)',
                      padding: '10px 12px',
                      fontSize: 13.5,
                      lineHeight: 1.5,
                      color: 'var(--w4-muted)',
                      fontWeight: 600,
                    }}
                  >
                    מספר טלפון לא זמין במקור הנתונים. מומלץ לבדוק באתר המקום או להשתמש בניווט.
                  </div>
                )}

                {email && (
                  <a
                    href={`mailto:${email}`}
                    style={{
                      textDecoration: 'none',
                      color: 'var(--w4-text)',
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    אימייל: {email}
                  </a>
                )}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: 10 }}>
            <Button variant="soft" icon="star" onClick={() => openRating({ id: v.id, name: v.name, placeType: (v as any).placeType })}>
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
