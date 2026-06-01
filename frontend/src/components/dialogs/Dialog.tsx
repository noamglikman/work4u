// components/dialogs/Dialog.tsx — generic centered modal shell (ported from WebExtra).

import type { ReactNode } from 'react';

interface DialogProps {
  children: ReactNode;
  close: () => void;
  width?: number;
}

export function Dialog({ children, close, width = 480 }: DialogProps) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 85,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <div
        onClick={close}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(20,12,6,0.5)',
          animation: 'wfade .2s ease',
        }}
      />
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: width,
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'var(--w4-bg)',
          borderRadius: 22,
          boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
          animation: 'wpop .25s cubic-bezier(.2,.9,.3,1.2)',
        }}
      >
        {children}
      </div>
    </div>
  );
}
