// components/ui/Stars.tsx — 1..5 star rating, read-only or interactive (work4u-ui.jsx).

import { Icon } from './Icon';

interface StarsProps {
  value?: number;
  size?: number;
  onRate?: (n: number) => void;
  gap?: number;
}

export function Stars({ value = 0, size = 16, onRate, gap = 2 }: StarsProps) {
  return (
    <div style={{ display: 'inline-flex', gap, direction: 'ltr' }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          onClick={onRate ? () => onRate(n) : undefined}
          style={{
            cursor: onRate ? 'pointer' : 'default',
            display: 'flex',
            color: n <= value ? 'var(--w4-warn)' : 'var(--w4-faint)',
          }}
        >
          <Icon
            name="star"
            size={size}
            fill={n <= value ? 'var(--w4-warn)' : 'none'}
            stroke={n <= value ? 'var(--w4-warn)' : 'var(--w4-faint)'}
            sw={1.6}
          />
        </span>
      ))}
    </div>
  );
}
