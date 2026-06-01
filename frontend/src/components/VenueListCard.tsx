// components/VenueListCard.tsx — venue row in the home sidebar (ported from WebMain).

import { useState } from 'react';
import type { VenuePreview } from '../types/view';
import { Icon, OccPill, Photo } from './ui';

interface VenueListCardProps {
  v: VenuePreview;
  onClick: () => void;
  active?: boolean;
}

export function VenueListCard({ v, onClick, active }: VenueListCardProps) {
  const [hover, setHover] = useState(false);
  const meta = [v.area, v.distanceLabel].filter(Boolean).join(' · ');
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        gap: 12,
        padding: 10,
        borderRadius: 'var(--w4-radius)',
        cursor: 'pointer',
        background: 'var(--w4-surface)',
        boxShadow: active
          ? '0 0 0 2px var(--w4-accent), var(--w4-shadow-sm)'
          : 'var(--w4-shadow-sm)',
        transform: hover ? 'translateY(-2px)' : 'none',
        transition: 'transform .15s, box-shadow .15s',
      }}
    >
      <div style={{ width: 76, height: 76, borderRadius: 13, overflow: 'hidden', flexShrink: 0 }}>
        <Photo color={v.accent} emoji={v.emoji} h={76} src={v.imageUrl} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
          }}
        >
          <div
            style={{
              flex: 1,
              minWidth: 0,
              fontWeight: 700,
              fontSize: 15.5,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {v.name}
          </div>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 3,
              fontSize: 13,
              fontWeight: 700,
              color: 'var(--w4-warn)',
              flexShrink: 0,
            }}
          >
            <Icon name="star" size={14} fill="var(--w4-warn)" stroke="var(--w4-warn)" sw={1.4} />
            {v.rating}
          </span>
        </div>
        <div
          style={{
            fontSize: 12.5,
            color: 'var(--w4-muted)',
            margin: '2px 0 8px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {meta}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <OccPill occ={v.crowdLevel} size="sm" />
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              color: 'var(--w4-muted)',
            }}
          >
            <span
              style={{ display: 'inline-flex', gap: 3, alignItems: 'center', fontSize: 12, fontWeight: 600 }}
            >
              <Icon name="wifi" size={14} />
              {v.wifiStars}
            </span>
            <span style={{ fontSize: 12.5, fontWeight: 700 }}>{v.priceLabel}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
