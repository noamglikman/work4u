// components/ui/OccPill.tsx — occupancy/crowd-level pill (work4u-ui.jsx).

import type { CrowdLevel } from '../../types/api';
import { OCC } from '../../lib/labels';

interface OccPillProps {
  occ: CrowdLevel;
  size?: 'sm' | 'md';
}

export function OccPill({ occ, size = 'md' }: OccPillProps) {
  const o = OCC[occ];
  const sm = size === 'sm';
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        background: o.soft,
        color: o.color,
        fontWeight: 700,
        fontSize: sm ? 12 : 13,
        padding: sm ? '4px 9px' : '6px 12px',
        borderRadius: 999,
        letterSpacing: '-0.01em',
        whiteSpace: 'nowrap',
      }}
    >
      <span
        style={{
          width: sm ? 6 : 7,
          height: sm ? 6 : 7,
          borderRadius: 999,
          background: o.color,
        }}
      />
      {o.label}
    </span>
  );
}
