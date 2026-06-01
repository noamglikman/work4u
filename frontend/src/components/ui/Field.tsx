// components/ui/Field.tsx — labelled text input with optional trailing icon (work4u-ui.jsx).

import { useState } from 'react';
import { Icon, type IconName } from './Icon';

interface FieldProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  error?: string;
  trailing?: IconName;
  onTrailing?: () => void;
  autoFocus?: boolean;
  onEnter?: () => void;
}

export function Field({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  error,
  trailing,
  onTrailing,
  autoFocus,
  onEnter,
}: FieldProps) {
  const [focus, setFocus] = useState(false);
  return (
    <label style={{ display: 'block' }}>
      {label && (
        <div
          style={{
            fontSize: 13.5,
            fontWeight: 600,
            color: 'var(--w4-muted)',
            marginBottom: 7,
            paddingInlineStart: 2,
          }}
        >
          {label}
        </div>
      )}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          background: 'var(--w4-surface)',
          borderRadius: 'var(--w4-radius-sm)',
          padding: '0 14px',
          boxShadow: error
            ? 'inset 0 0 0 1.5px var(--w4-danger)'
            : focus
              ? 'inset 0 0 0 1.5px var(--w4-accent)'
              : 'inset 0 0 0 1.5px var(--w4-border)',
          transition: 'box-shadow .15s ease',
        }}
      >
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && onEnter) onEnter();
          }}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            padding: '14px 0',
            fontSize: 16,
            fontFamily: 'inherit',
            color: 'var(--w4-text)',
            minWidth: 0,
          }}
        />
        {trailing && (
          <button
            type="button"
            onClick={onTrailing}
            style={{
              border: 'none',
              background: 'transparent',
              color: 'var(--w4-faint)',
              cursor: 'pointer',
              padding: 4,
              display: 'flex',
            }}
          >
            <Icon name={trailing} size={20} />
          </button>
        )}
      </div>
      {error && (
        <div
          style={{
            fontSize: 12.5,
            color: 'var(--w4-danger)',
            marginTop: 6,
            paddingInlineStart: 2,
            fontWeight: 500,
          }}
        >
          {error}
        </div>
      )}
    </label>
  );
}
