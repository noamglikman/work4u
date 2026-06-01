// lib/theme.ts — theme palettes + accent/font tweaks.
// Each theme is a flat map of CSS custom properties applied at the app root,
// exactly as in the design prototype (work4u-data.jsx).

export type ThemeKey = 'coffee' | 'espresso' | 'fresh';
export type FontKey = 'rubik' | 'assistant' | 'heebo';

export interface Theme {
  key: ThemeKey;
  label: string;
  dark: boolean;
  vars: Record<string, string>;
}

export const THEMES: Record<ThemeKey, Theme> = {
  coffee: {
    key: 'coffee',
    label: 'קפה',
    dark: false,
    vars: {
      '--w4-bg': '#F1E8DA',
      '--w4-surface': '#FFFCF7',
      '--w4-surface-2': '#EBE0CF',
      '--w4-text': '#2E2319',
      '--w4-muted': '#8C7B67',
      '--w4-faint': '#B6A48E',
      '--w4-border': '#E3D6C2',
      '--w4-accent': '#BC6038',
      '--w4-accent-2': '#A8512E',
      '--w4-accent-soft': '#F3DFD2',
      '--w4-on-accent': '#FFF8F2',
      '--w4-success': '#5C8A5E',
      '--w4-success-soft': '#E2EEDF',
      '--w4-warn': '#C68A3C',
      '--w4-warn-soft': '#F4E7CE',
      '--w4-danger': '#C0503C',
      '--w4-danger-soft': '#F6DED6',
      '--w4-shadow': '0 6px 22px rgba(74,48,28,0.10)',
      '--w4-shadow-sm': '0 2px 8px rgba(74,48,28,0.07)',
      '--w4-radius': '20px',
      '--w4-radius-sm': '13px',
      '--w4-map': '#D9CDB6',
      '--w4-map-road': '#F1E8DA',
      '--w4-map-park': '#C2CBA0',
      '--w4-map-water': '#A9C3CC',
    },
  },
  espresso: {
    key: 'espresso',
    label: 'אספרסו',
    dark: true,
    vars: {
      '--w4-bg': '#1E1711',
      '--w4-surface': '#2A211A',
      '--w4-surface-2': '#352A21',
      '--w4-text': '#F3EADF',
      '--w4-muted': '#B6A491',
      '--w4-faint': '#7E6F5E',
      '--w4-border': '#41342A',
      '--w4-accent': '#E08A5E',
      '--w4-accent-2': '#EFA078',
      '--w4-accent-soft': '#3A2A20',
      '--w4-on-accent': '#241910',
      '--w4-success': '#85B585',
      '--w4-success-soft': '#27332478',
      '--w4-warn': '#E0AE63',
      '--w4-warn-soft': '#3a2f1d78',
      '--w4-danger': '#E2705A',
      '--w4-danger-soft': '#3a221d78',
      '--w4-shadow': '0 8px 26px rgba(0,0,0,0.45)',
      '--w4-shadow-sm': '0 2px 10px rgba(0,0,0,0.35)',
      '--w4-radius': '20px',
      '--w4-radius-sm': '13px',
      '--w4-map': '#2E2419',
      '--w4-map-road': '#1E1711',
      '--w4-map-park': '#33402A',
      '--w4-map-water': '#22383E',
    },
  },
  fresh: {
    key: 'fresh',
    label: 'בהיר',
    dark: false,
    vars: {
      '--w4-bg': '#FBF8F2',
      '--w4-surface': '#FFFFFF',
      '--w4-surface-2': '#F3EFE7',
      '--w4-text': '#221C15',
      '--w4-muted': '#938777',
      '--w4-faint': '#BDB2A2',
      '--w4-border': '#ECE5D9',
      '--w4-accent': '#D97757',
      '--w4-accent-2': '#C76343',
      '--w4-accent-soft': '#FAE7DE',
      '--w4-on-accent': '#FFFFFF',
      '--w4-success': '#5C8A5E',
      '--w4-success-soft': '#E7F0E6',
      '--w4-warn': '#CE944A',
      '--w4-warn-soft': '#F7ECD7',
      '--w4-danger': '#CB5743',
      '--w4-danger-soft': '#F9E4DE',
      '--w4-shadow': '0 8px 24px rgba(40,30,20,0.07)',
      '--w4-shadow-sm': '0 1px 6px rgba(40,30,20,0.05)',
      '--w4-radius': '14px',
      '--w4-radius-sm': '10px',
      '--w4-map': '#E7E0D2',
      '--w4-map-road': '#FBF8F2',
      '--w4-map-park': '#CFD7B2',
      '--w4-map-water': '#B7CDD4',
    },
  },
};

export const FONTS: Record<FontKey, string> = {
  rubik: "'Rubik', system-ui, sans-serif",
  assistant: "'Assistant', system-ui, sans-serif",
  heebo: "'Heebo', system-ui, sans-serif",
};

export const ACCENT_OPTIONS = ['#BC6038', '#C2772E', '#A1564A', '#8C6A45', '#6F7F55'];

export interface Tweaks {
  theme: ThemeKey;
  accent: string;
  font: FontKey;
  smartPush: boolean;
}

export const TWEAK_DEFAULTS: Tweaks = {
  theme: 'coffee',
  accent: '#BC6038',
  font: 'rubik',
  smartPush: true,
};

/**
 * Build the full set of root CSS variables for a given tweak state:
 * the theme palette, overridden by the chosen accent (and derived shades),
 * plus the font family.
 */
export function buildRootVars(tweaks: Tweaks): React.CSSProperties {
  const theme = THEMES[tweaks.theme] ?? THEMES.coffee;
  const vars: Record<string, string> = {
    ...theme.vars,
    '--w4-accent': tweaks.accent,
    '--w4-accent-2': `color-mix(in srgb, ${tweaks.accent} 80%, #2a1208)`,
    '--w4-accent-soft': `color-mix(in srgb, ${tweaks.accent} 15%, var(--w4-surface))`,
    '--w4-on-accent': '#FFF8F2',
    fontFamily: FONTS[tweaks.font] ?? FONTS.rubik,
  };
  return vars as React.CSSProperties;
}
