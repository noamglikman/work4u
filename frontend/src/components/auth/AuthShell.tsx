// components/auth/AuthShell.tsx — split-screen auth layout with a workspace photo collage.

import type { ReactNode } from 'react';
import { Icon } from '../ui';

const FEATURES = [
  'מאות מקומות עבודה ולמידה ברחבי הארץ',
  'סינון לפי Wi-Fi, שקט, שקעים ומחיר',
  'דירוגים ועדכונים מהקהילה בזמן אמת',
];

const PHOTOS = [
  '/auth-bg/workspace-1.jpg',
  '/auth-bg/workspace-2.jpg',
  '/auth-bg/workspace-3.jpg',
  '/auth-bg/workspace-4.jpg',
  '/auth-bg/workspace-5.jpg',
  '/auth-bg/workspace-6.jpg',
];

export function AuthBrand() {
  return (
    <div
      className="w4-auth-brand"
      style={{
        position: 'relative',
        overflow: 'hidden',
        color: 'var(--w4-on-accent)',
        background: 'linear-gradient(150deg, var(--w4-accent), var(--w4-accent-2))',
        padding: '64px 56px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(3, 1fr)',
          gap: 10,
          padding: 22,
          opacity: 0.34,
          transform: 'scale(1.04)',
        }}
      >
        {PHOTOS.map((src, i) => (
          <div
            key={src}
            style={{
              borderRadius: 24,
              overflow: 'hidden',
              transform:
                i % 3 === 0
                  ? 'translateY(18px)'
                  : i % 3 === 1
                    ? 'translateY(-10px)'
                    : 'translateY(8px)',
              boxShadow: '0 18px 40px rgba(0,0,0,0.24)',
            }}
          >
            <img
              src={src}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                filter: 'saturate(0.95) contrast(1.04)',
              }}
            />
          </div>
        ))}
      </div>

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(150deg, rgba(126, 65, 34, 0.92), rgba(188, 97, 55, 0.84))',
        }}
      />

      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          fontSize: 26,
          fontWeight: 800,
          direction: 'ltr',
        }}
      >
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 14,
            background: 'rgba(255,255,255,0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(8px)',
          }}
        >
          <Icon name="coffee" size={26} stroke="#FFF8F2" sw={1.9} />
        </div>
        Work4U
      </div>

      <div style={{ position: 'relative' }}>
        <h2
          style={{
            fontSize: 40,
            fontWeight: 900,
            lineHeight: 1.18,
            letterSpacing: '-0.03em',
            margin: '0 0 16px',
            textShadow: '0 8px 28px rgba(0,0,0,0.22)',
          }}
        >
          המקום הבא לעבוד ממנו כבר מחכה לך
        </h2>

        <p style={{ fontSize: 17, lineHeight: 1.65, margin: 0, opacity: 0.95, maxWidth: 430 }}>
          Work4U עוזרת למצוא בתי קפה, ספריות וחללי עבודה שמתאימים לצורת העבודה שלך — לפי מיקום,
          העדפות ודירוגי משתמשים.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 34, maxWidth: 430 }}>
          {FEATURES.map((feature) => (
            <div
              key={feature}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontSize: 15.5,
                lineHeight: 1.45,
                opacity: 0.96,
              }}
            >
              <span
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.18)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontWeight: 900,
                  backdropFilter: 'blur(8px)',
                }}
              >
                ✓
              </span>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'relative', fontSize: 13, opacity: 0.78 }}>
        © 2026 Work4U · לעבוד מכל מקום
      </div>
    </div>
  );
}

export function FormWrap({ children }: { children: ReactNode }) {
  return (
    <div className="w4-auth-form" style={{ background: 'var(--w4-bg)' }}>
      <div style={{ width: '100%', maxWidth: 410 }}>{children}</div>
    </div>
  );
}
