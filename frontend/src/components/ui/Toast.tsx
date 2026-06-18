// components/ui/Toast.tsx — top-center toast (ported from WebToast in work4u-web-extra.jsx).

import { Icon } from './Icon';

export type ToastTone = 'default' | 'success' | 'danger';

export interface ToastData {
  msg: string;
  tone: ToastTone;
  id: number;
}

const COLORS: Record<ToastTone, [string, string]> = {
  default: ['#fff7ed', '#3b2416'],
  success: ['#ecfdf3', '#14532d'],
  danger: ['#fef2f2', '#7f1d1d'],
};

export function Toast({ toast }: { toast: ToastData | null }) {
  if (!toast) return null;
  const [bg, fg] = COLORS[toast.tone];
  return (
    <div
      style={{
        position: 'fixed',
        top: 78,
        insetInlineStart: '50%',
        transform: 'translateX(-50%)',
        zIndex: 90,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        background: bg,
        color: fg,
        padding: '13px 18px',
        borderRadius: 14,
        boxShadow: '0 12px 34px rgba(0,0,0,0.25)',
        fontSize: 14.5,
        fontWeight: 600,
        animation: 'wdrop .3s cubic-bezier(.2,.9,.3,1.2)',
        maxWidth: '90vw',
      }}
    >
      {toast.tone === 'success' && <Icon name="check" size={19} sw={2.4} />}
      {toast.tone === 'danger' && <Icon name="x" size={19} sw={2.4} />}
      <span>{toast.msg}</span>
    </div>
  );
}
