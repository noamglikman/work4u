// components/ui/SpecRow.tsx — icon + label + value row (work4u-ui.jsx).

import { Icon, type IconName } from './Icon';

interface SpecRowProps {
  icon: IconName;
  label: string;
  value: string;
  accent?: boolean;
}

export function SpecRow({ icon, label, value, accent }: SpecRowProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '11px 0' }}>
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          background: 'var(--w4-accent-soft)',
          color: 'var(--w4-accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon name={icon} size={19} />
      </div>
      <div style={{ flex: 1, fontSize: 14.5, color: 'var(--w4-muted)', fontWeight: 500 }}>
        {label}
      </div>
      <div
        style={{
          fontSize: 14.5,
          fontWeight: 700,
          color: accent ? 'var(--w4-accent)' : 'var(--w4-text)',
        }}
      >
        {value}
      </div>
    </div>
  );
}
