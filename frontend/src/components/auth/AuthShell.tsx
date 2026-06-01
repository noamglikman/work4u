// components/auth/AuthShell.tsx — the split-screen auth layout: brand panel +
// centered form (ported from AuthBrand / FormWrap in work4u-web-auth.jsx).

import type { ReactNode } from 'react';
import { Icon } from '../ui';

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
        style={{
          position: 'absolute',
          top: -120,
          insetInlineEnd: -100,
          width: 360,
          height: 360,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -90,
          insetInlineStart: -70,
          width: 260,
          height: 260,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.07)',
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
          }}
        >
          <Icon name="coffee" size={26} stroke="#FFF8F2" sw={1.9} />
        </div>
        Work4U
      </div>
      <div style={{ position: 'relative' }}>
        <h2
          style={{
            fontSize: 38,
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            margin: '0 0 16px',
          }}
        >
          מקום העבודה המושלם נמצא במרחק לחיצה
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.6, margin: 0, opacity: 0.92, maxWidth: 420 }}>
          בתי קפה וחללי עבודה מותאמים בדיוק להעדפות שלך — שקט, שקעים, אינטרנט מהיר ותחזית עומס בזמן
          אמת.
        </p>
        <div style={{ display: 'flex', gap: 26, marginTop: 34 }}>
          {[
            ['1,200+', 'מתחמים'],
            ['18K', 'דירוגים'],
            ['4.7★', 'דירוג ממוצע'],
          ].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontSize: 26, fontWeight: 800 }}>{n}</div>
              <div style={{ fontSize: 13.5, opacity: 0.85 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: 'relative', fontSize: 13, opacity: 0.7 }}>
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
