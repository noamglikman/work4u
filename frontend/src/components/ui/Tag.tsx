// components/ui/Tag.tsx — pill chip, optionally toggleable (work4u-ui.jsx).

import type { ReactNode } from 'react';
import { Icon, type IconName } from './Icon';

interface TagProps {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  icon?: IconName;
}

export function Tag({ children, active, onClick, icon }: TagProps) {
  return (
    <span
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '7px 13px',
        borderRadius: 999,
        fontSize: 13.5,
        fontWeight: 600,
        whiteSpace: 'nowrap',
        cursor: onClick ? 'pointer' : 'default',
        background: active ? 'var(--w4-accent)' : 'var(--w4-surface-2)',
        color: active ? 'var(--w4-on-accent)' : 'var(--w4-text)',
        transition: 'background .15s, color .15s',
        letterSpacing: '-0.01em',
      }}
    >
      {icon && <Icon name={icon} size={15} sw={2} />}
      {children}
    </span>
  );
}
