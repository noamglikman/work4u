// components/ui/Photo.tsx — image block. Shows a real photo when `src` is given
// (S3 URL), otherwise a striped placeholder with an emoji — ported from
// work4u-ui.jsx and extended to support real images with graceful fallback.

import { useState, type CSSProperties } from 'react';

interface PhotoProps {
  color?: string;
  emoji?: string;
  h?: number;
  label?: string;
  radius?: number;
  src?: string;
}

export function Photo({
  color = '#C98A5A',
  emoji,
  h = 150,
  label,
  radius = 0,
  src,
}: PhotoProps) {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;

  const wrap: CSSProperties = {
    height: h,
    width: '100%',
    borderRadius: radius,
    position: 'relative',
    overflow: 'hidden',
    background: `linear-gradient(135deg, ${color}, ${color}cc)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  };

  return (
    <div style={wrap}>
      {showImage ? (
        <img
          src={src}
          alt={label ?? ''}
          onError={() => setFailed(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        <>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.16,
              backgroundImage:
                'repeating-linear-gradient(45deg, #000 0 2px, transparent 2px 11px)',
            }}
          />
          {emoji && (
            <span
              style={{ fontSize: h > 110 ? 46 : 28, position: 'relative', filter: 'saturate(1.1)' }}
            >
              {emoji}
            </span>
          )}
          {label && (
            <span
              style={{
                position: 'absolute',
                bottom: 8,
                insetInlineStart: 10,
                fontSize: 10.5,
                fontFamily: 'ui-monospace, monospace',
                color: 'rgba(255,255,255,0.85)',
                background: 'rgba(0,0,0,0.25)',
                padding: '2px 6px',
                borderRadius: 5,
              }}
            >
              {label}
            </span>
          )}
        </>
      )}
    </div>
  );
}
