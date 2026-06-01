// context/ThemeContext.tsx — appearance settings (theme, accent, font, smart push).
// These mirror the prototype's "tweaks" but are exposed as real, persisted app
// settings rather than the design-tool panel. Root CSS vars are built from here.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { TWEAK_DEFAULTS, type Tweaks } from '../lib/theme';

interface ThemeContextValue {
  tweaks: Tweaks;
  setTweak: <K extends keyof Tweaks>(key: K, value: Tweaks[K]) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORE_KEY = 'work4u.tweaks';

function loadTweaks(): Tweaks {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return { ...TWEAK_DEFAULTS, ...(JSON.parse(raw) as Partial<Tweaks>) };
  } catch {
    /* ignore */
  }
  return { ...TWEAK_DEFAULTS };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [tweaks, setTweaks] = useState<Tweaks>(loadTweaks);

  useEffect(() => {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(tweaks));
    } catch {
      /* ignore */
    }
  }, [tweaks]);

  const setTweak = useCallback(<K extends keyof Tweaks>(key: K, value: Tweaks[K]) => {
    setTweaks((prev) => ({ ...prev, [key]: value }));
  }, []);

  const value = useMemo(() => ({ tweaks, setTweak }), [tweaks, setTweak]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within <ThemeProvider>');
  return ctx;
}
