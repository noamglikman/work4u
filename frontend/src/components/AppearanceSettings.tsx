// components/AppearanceSettings.tsx — floating appearance panel (theme / accent /
// font / smart-push). This is the product-facing replacement for the design-tool
// "tweaks" panel; it drives ThemeContext, which builds the root CSS variables.

import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ACCENT_OPTIONS, FONTS, THEMES, type FontKey, type ThemeKey } from '../lib/theme';
import { Icon } from './ui';

const THEME_KEYS: ThemeKey[] = ['coffee', 'fresh', 'espresso'];
const FONT_KEYS: FontKey[] = ['rubik', 'assistant', 'heebo'];
const FONT_LABEL: Record<FontKey, string> = { rubik: 'Rubik', assistant: 'Assistant', heebo: 'Heebo' };

export function AppearanceSettings() {
  const { tweaks, setTweak } = useTheme();
  const [open, setOpen] = useState(false);

  const Section = ({ children }: { children: string }) => (
    <div
      style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        color: 'var(--w4-muted)',
        margin: '4px 0 2px',
      }}
    >
      {children}
    </div>
  );

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        title="עיצוב ותצוגה"
        style={{
          position: 'fixed',
          bottom: 18,
          insetInlineStart: 18,
          zIndex: 80,
          width: 46,
          height: 46,
          borderRadius: 14,
          border: '1px solid var(--w4-border)',
          background: 'var(--w4-surface)',
          color: 'var(--w4-accent)',
          boxShadow: 'var(--w4-shadow)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name="sliders" size={22} />
      </button>

      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: 74,
            insetInlineStart: 18,
            zIndex: 81,
            width: 260,
            background: 'var(--w4-surface)',
            color: 'var(--w4-text)',
            border: '1px solid var(--w4-border)',
            borderRadius: 'var(--w4-radius)',
            boxShadow: 'var(--w4-shadow)',
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            animation: 'wpop .2s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <strong style={{ fontSize: 14 }}>עיצוב ותצוגה</strong>
            <button
              onClick={() => setOpen(false)}
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                border: 'none',
                background: 'var(--w4-surface-2)',
                cursor: 'pointer',
                color: 'var(--w4-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="x" size={16} />
            </button>
          </div>

          <Section>ערכת צבעים</Section>
          <div style={{ display: 'flex', gap: 6, background: 'var(--w4-surface-2)', padding: 4, borderRadius: 999 }}>
            {THEME_KEYS.map((k) => {
              const on = tweaks.theme === k;
              return (
                <button
                  key={k}
                  onClick={() => setTweak('theme', k)}
                  style={{
                    flex: 1,
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    padding: '7px 0',
                    borderRadius: 999,
                    fontSize: 12.5,
                    fontWeight: 700,
                    background: on ? 'var(--w4-surface)' : 'transparent',
                    color: on ? 'var(--w4-accent)' : 'var(--w4-muted)',
                    boxShadow: on ? 'var(--w4-shadow-sm)' : 'none',
                  }}
                >
                  {THEMES[k].label}
                </button>
              );
            })}
          </div>

          <Section>צבע אקסנט</Section>
          <div style={{ display: 'flex', gap: 8 }}>
            {ACCENT_OPTIONS.map((c) => {
              const on = tweaks.accent.toLowerCase() === c.toLowerCase();
              return (
                <button
                  key={c}
                  onClick={() => setTweak('accent', c)}
                  title={c}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 999,
                    cursor: 'pointer',
                    background: c,
                    border: on ? '2px solid var(--w4-text)' : '2px solid transparent',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                  }}
                />
              );
            })}
          </div>

          <Section>גופן</Section>
          <select
            value={tweaks.font}
            onChange={(e) => setTweak('font', e.target.value as FontKey)}
            style={{
              fontFamily: 'inherit',
              fontSize: 13.5,
              padding: '9px 11px',
              borderRadius: 'var(--w4-radius-sm)',
              border: '1.5px solid var(--w4-border)',
              background: 'var(--w4-surface)',
              color: 'var(--w4-text)',
              cursor: 'pointer',
            }}
          >
            {FONT_KEYS.map((f) => (
              <option key={f} value={f} style={{ fontFamily: FONTS[f] }}>
                {FONT_LABEL[f]}
              </option>
            ))}
          </select>

          <Section>התנהגות</Section>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ flex: 1, fontSize: 13.5, fontWeight: 600 }}>התראות חכמות (Push)</span>
            <button
              onClick={() => setTweak('smartPush', !tweaks.smartPush)}
              style={{
                width: 46,
                height: 28,
                borderRadius: 999,
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                background: tweaks.smartPush ? 'var(--w4-accent)' : 'var(--w4-surface-2)',
                transition: 'background .2s',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: 3,
                  insetInlineStart: tweaks.smartPush ? 21 : 3,
                  width: 22,
                  height: 22,
                  borderRadius: 999,
                  background: '#fff',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                  transition: 'inset-inline-start .2s',
                }}
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
