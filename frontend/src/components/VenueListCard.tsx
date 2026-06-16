// components/VenueListCard.tsx — venue row in the home sidebar.

import { useState } from 'react';
import type { VenuePreview } from '../types/view';
import { Icon, OccPill, Photo, Stars } from './ui';

interface VenueListCardProps {
  v: VenuePreview;
  onClick: () => void;
  active?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: (venueId: string) => void;
}

export function VenueListCard({
  v,
  onClick,
  active,
  isFavorite = false,
  onToggleFavorite,
}: VenueListCardProps) {
  const [hover, setHover] = useState(false);
  const meta = [v.area, v.distanceLabel].filter(Boolean).join(' · ');
  const roundedRating = Math.round(v.rating || 0);

  const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onToggleFavorite?.(v.id);
  };

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

          <button
            type="button"
            onClick={toggleFavorite}
            title={isFavorite ? 'הסר ממועדפים' : 'הוסף למועדפים'}
            aria-label={isFavorite ? 'הסר ממועדפים' : 'הוסף למועדפים'}
            style={{
              width: 32,
              height: 32,
              borderRadius: 999,
              border: 'none',
              background: isFavorite ? 'rgba(245, 158, 11, 0.14)' : 'transparent',
              color: isFavorite ? 'var(--w4-warn)' : 'var(--w4-faint)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Icon
              name="star"
              size={19}
              fill={isFavorite ? 'var(--w4-warn)' : 'none'}
              stroke={isFavorite ? 'var(--w4-warn)' : 'var(--w4-faint)'}
              sw={1.7}
            />
          </button>
        </div>

        <div
          style={{
            fontSize: 12.5,
            color: 'var(--w4-muted)',
            margin: '2px 0 7px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {meta}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            marginBottom: 8,
            color: 'var(--w4-muted)',
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          <Stars value={roundedRating} size={13} gap={1} />
          <span style={{ direction: 'ltr' }}>{Number(v.rating || 0).toFixed(1)}</span>
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
            <span style={{ display: 'inline-flex', gap: 3, alignItems: 'center', fontSize: 12, fontWeight: 600 }}>
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
