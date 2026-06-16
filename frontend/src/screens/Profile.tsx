// screens/Profile.tsx — account overview + settings entry points (ported from WebProfile).

import { useAuth } from '../context/AuthContext';
import { usePreferences } from '../hooks/usePreferences';
import { useRatings } from '../hooks/useRatings';
import type { Navigate } from '../types/nav';
import type { UserPreferences } from '../types/api';
import { PRICE_LABEL } from '../lib/labels';
import { Button, Icon, type IconName } from '../components/ui';

function prefsSummary(p: UserPreferences | null): string {
  if (!p) return 'לא הוגדרו';
  const out: string[] = [];
  if (p.quietEnvironment) out.push('שקט');
  if (p.needPowerOutlet) out.push('שקעים');
  if (p.wifiQuality === 'high') out.push('Wi-Fi מהיר');
  out.push(PRICE_LABEL[p.priceRange]);
  return out.length ? out.join(' · ') : 'לא הוגדרו';
}

function displayName(email: string | undefined): string {
  const local = (email ?? '').split('@')[0];
  return local || 'משתמש Work4U';
}

export function Profile({ go }: { go: Navigate }) {
  const { session, isAdmin, signOut } = useAuth();
  const { preferences } = usePreferences();
  const { ratings } = useRatings();

  const email = session?.user.email;
  const initial = (email?.trim()[0] ?? 'W').toUpperCase();

    const reportsCount = ratings.length;

  // There is currently no real favorites feature/table in the project,
  // so the real value is 0 until we implement saved venues.
  const favoritesCount = 0;

  const activePreferencesCount = preferences
    ? [
        preferences.quietEnvironment,
        preferences.needPowerOutlet,
        preferences.wifiQuality === 'high',
        Boolean(preferences.priceRange),
      ].filter(Boolean).length
    : 0;

  // Real activity score based on actual user data we already have.
  const pointsCount = reportsCount * 40 + favoritesCount * 20 + activePreferencesCount * 10;

  const profileStats = [
    ['דיווחים', reportsCount],
    ['מועדפים', favoritesCount],
    ['נקודות', pointsCount],
  ] as const;

  const onLogout = async () => {
    await signOut();
    go('login');
  };

  const rows: Array<{ icon: IconName; label: string; sub: string; onClick?: () => void }> = [
    { icon: 'sliders', label: 'העדפות עבודה', sub: prefsSummary(preferences), onClick: () => go('prefs-edit') },
    { icon: 'bell', label: 'התראות חכמות', sub: 'מופעל · לפי מיקום' },
    { icon: 'coffee', label: 'אודות Work4U', sub: 'גרסה 1.0 · web' },
  ];

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '36px 24px 60px' }}>
      <h1 style={{ fontSize: 30, fontWeight: 800, margin: '0 0 22px', letterSpacing: '-0.02em' }}>
        הפרופיל שלי
      </h1>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          background: 'var(--w4-surface)',
          borderRadius: 'var(--w4-radius)',
          padding: 20,
          boxShadow: 'var(--w4-shadow-sm)',
          marginBottom: 16,
        }}
      >
        <div
          style={{
            width: 66,
            height: 66,
            borderRadius: 999,
            background: 'var(--w4-accent)',
            color: 'var(--w4-on-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 26,
            fontWeight: 800,
            direction: 'ltr',
          }}
        >
          {initial}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 19, fontWeight: 800 }}>
            {displayName(email)}{' '}
            {isAdmin && (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: 'var(--w4-accent)',
                  background: 'var(--w4-accent-soft)',
                  padding: '2px 8px',
                  borderRadius: 999,
                  marginInlineStart: 4,
                }}
              >
                מנהל
              </span>
            )}
          </div>
          <div
            style={{
              fontSize: 14,
              color: 'var(--w4-muted)',
              direction: 'ltr',
              textAlign: 'right',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {email ?? '—'}
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={onLogout}>
          התנתקות
        </Button>
      </div>

      <div style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
        {profileStats.map(([l, n]) => (
          <div
            key={l}
            style={{
              flex: 1,
              background: 'var(--w4-surface)',
              borderRadius: 'var(--w4-radius-sm)',
              padding: '18px 8px',
              textAlign: 'center',
              boxShadow: 'var(--w4-shadow-sm)',
            }}
          >
            <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--w4-accent)' }}>{n}</div>
            <div style={{ fontSize: 13, color: 'var(--w4-muted)', fontWeight: 600 }}>{l}</div>
          </div>
        ))}
      </div>

      <div
        style={{
          background: 'var(--w4-surface)',
          borderRadius: 'var(--w4-radius)',
          boxShadow: 'var(--w4-shadow-sm)',
          overflow: 'hidden',
        }}
      >
        {rows.map((row, i, arr) => (
          <div
            key={row.label}
            onClick={row.onClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 13,
              padding: '16px 18px',
              cursor: row.onClick ? 'pointer' : 'default',
              borderBottom: i < arr.length - 1 ? '1px solid var(--w4-border)' : 'none',
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 11,
                background: 'var(--w4-accent-soft)',
                color: 'var(--w4-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Icon name={row.icon} size={19} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15.5, fontWeight: 600 }}>{row.label}</div>
              <div style={{ fontSize: 13, color: 'var(--w4-muted)' }}>{row.sub}</div>
            </div>
            {row.onClick && (
              <Icon name="chevron" size={18} style={{ color: 'var(--w4-faint)', transform: 'scaleX(-1)' }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
