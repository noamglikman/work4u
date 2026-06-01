// components/PushCard.tsx — smart-push banner nudging the user to rate a venue
// they recently "visited" (ported from PushCard in work4u-web-app.jsx).
//
// In production this is triggered by geofencing + SNS / Web Push (see AWS guide §3);
// here it's a timed nudge wired in App.

import type { VenuePreview } from '../types/view';
import { Icon } from './ui';

interface PushCardProps {
  venue: VenuePreview | null;
  onOpen: () => void;
  onClose: () => void;
}

export function PushCard({ venue, onOpen, onClose }: PushCardProps) {
  if (!venue) return null;
  return (
    <div
      style={{
        position: 'fixed',
        top: 78,
        insetInlineEnd: 22,
        zIndex: 88,
        width: 340,
        maxWidth: '90vw',
        animation: 'wdrop .4s cubic-bezier(.2,.9,.3,1.3)',
      }}
    >
      <div
        onClick={onOpen}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          background: 'var(--w4-surface)',
          borderRadius: 18,
          padding: '13px 15px',
          boxShadow: '0 14px 38px rgba(0,0,0,0.22)',
          cursor: 'pointer',
          border: '1px solid var(--w4-border)',
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            background: 'var(--w4-accent)',
            color: 'var(--w4-on-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Icon name="bell" size={22} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, marginBottom: 1 }}>Work4U</div>
          <div style={{ fontSize: 13, lineHeight: 1.4 }}>
            ביקרת ב<strong>{venue.name}</strong>? ספר לנו איך היה!
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          style={{
            border: 'none',
            background: 'none',
            color: 'var(--w4-faint)',
            cursor: 'pointer',
            padding: 2,
            alignSelf: 'flex-start',
          }}
        >
          <Icon name="x" size={18} />
        </button>
      </div>
    </div>
  );
}
