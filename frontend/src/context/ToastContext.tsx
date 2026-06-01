// context/ToastContext.tsx — app-wide toast queue. `useToast()` returns a
// `toast(msg, tone)` function; the <Toast> is rendered once by the provider.

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';
import { Toast, type ToastData, type ToastTone } from '../components/ui';

interface ToastContextValue {
  toast: (msg: string, tone?: ToastTone) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<ToastData | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toast = useCallback((msg: string, tone: ToastTone = 'default') => {
    setCurrent({ msg, tone, id: Date.now() });
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCurrent(null), 2800);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <Toast toast={current} />
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>');
  return ctx;
}
