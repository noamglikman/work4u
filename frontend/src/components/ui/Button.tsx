// components/ui/Button.tsx — primary/soft/ghost/neutral/outline button (work4u-ui.jsx).

import { useState, type CSSProperties, type ReactNode } from 'react';
import { Icon, type IconName } from './Icon';

export type ButtonVariant = 'primary' | 'soft' | 'ghost' | 'neutral' | 'outline';
export type ButtonSize = 'lg' | 'md' | 'sm';

interface ButtonProps {
  children?: ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  full?: boolean;
  disabled?: boolean;
  size?: ButtonSize;
  icon?: IconName;
  type?: 'button' | 'submit';
  style?: CSSProperties;
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  full,
  disabled,
  size = 'lg',
  icon,
  type = 'button',
  style,
}: ButtonProps) {
  const [press, setPress] = useState(false);
  const pad = size === 'lg' ? '15px 22px' : size === 'sm' ? '8px 14px' : '12px 18px';
  const fs = size === 'lg' ? 17 : size === 'sm' ? 14 : 15.5;

  const base: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: full ? '100%' : undefined,
    padding: pad,
    fontSize: fs,
    fontWeight: 600,
    fontFamily: 'inherit',
    border: 'none',
    borderRadius: 'var(--w4-radius-sm)',
    cursor: disabled ? 'default' : 'pointer',
    letterSpacing: '-0.01em',
    transition: 'transform .12s ease, filter .12s ease, background .15s ease',
    transform: press ? 'scale(0.97)' : 'scale(1)',
    opacity: disabled ? 0.45 : 1,
    boxSizing: 'border-box',
    WebkitTapHighlightColor: 'transparent',
    whiteSpace: 'nowrap',
  };

  const variants: Record<ButtonVariant, CSSProperties> = {
    primary: {
      background: 'var(--w4-accent)',
      color: 'var(--w4-on-accent)',
      boxShadow: 'var(--w4-shadow-sm)',
    },
    soft: { background: 'var(--w4-accent-soft)', color: 'var(--w4-accent)' },
    ghost: { background: 'transparent', color: 'var(--w4-accent)' },
    neutral: { background: 'var(--w4-surface-2)', color: 'var(--w4-text)' },
    outline: {
      background: 'transparent',
      color: 'var(--w4-text)',
      boxShadow: 'inset 0 0 0 1.5px var(--w4-border)',
    },
  };

  return (
    <button
      type={type}
      onMouseDown={() => !disabled && setPress(true)}
      onMouseUp={() => setPress(false)}
      onMouseLeave={() => setPress(false)}
      onClick={() => !disabled && onClick?.()}
      disabled={disabled}
      style={{ ...base, ...variants[variant], ...style }}
    >
      {icon && <Icon name={icon} size={fs + 2} />}
      {children}
    </button>
  );
}
