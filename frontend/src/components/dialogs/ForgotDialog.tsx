// components/dialogs/ForgotDialog.tsx — password reset request (ported from WebExtra).
// Calls Cognito resetPassword (or the mock) and shows a confirmation toast.

import { useState } from 'react';
import { ApiError } from '../../api';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Button, Field, Icon } from '../ui';
import { Dialog } from './Dialog';

export function ForgotDialog({ close }: { close: () => void }) {
  const { resetPassword } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (!email.trim()) return;
    setBusy(true);
    try {
      await resetPassword(email.trim());
      close();
      toast('קישור לאיפוס נשלח לאימייל שלך', 'success');
    } catch (e) {
      toast(e instanceof ApiError ? e.message : 'שליחת הקישור נכשלה', 'danger');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog close={close} width={440}>
      <div style={{ padding: 26 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <h2 style={{ fontSize: 21, fontWeight: 800, margin: 0 }}>שחזור סיסמה</h2>
          <button
            onClick={close}
            style={{
              width: 36,
              height: 36,
              borderRadius: 11,
              border: 'none',
              background: 'var(--w4-surface-2)',
              cursor: 'pointer',
              color: 'var(--w4-text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name="x" size={20} />
          </button>
        </div>
        <p style={{ fontSize: 14, color: 'var(--w4-muted)', margin: '0 0 18px', lineHeight: 1.5 }}>
          הזינו את כתובת האימייל ונשלח לכם קישור לאיפוס הסיסמה.
        </p>
        <Field
          label="כתובת אימייל"
          value={email}
          onChange={setEmail}
          type="email"
          placeholder="name@work4u.co.il"
          autoFocus
          onEnter={submit}
        />
        <div style={{ marginTop: 20 }}>
          <Button full onClick={submit} disabled={busy}>
            {busy ? 'שולח…' : 'שלח קישור איפוס'}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
