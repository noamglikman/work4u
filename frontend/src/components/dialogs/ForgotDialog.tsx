// components/dialogs/ForgotDialog.tsx — two-step Cognito password reset.
// Step 1: send reset code to email.
// Step 2: confirm code + set a new password.

import { useState } from 'react';
import { ApiError } from '../../api';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Button, Field, Icon } from '../ui';
import { Dialog } from './Dialog';

type ResetStep = 'request-code' | 'confirm-code';

export function ForgotDialog({ close }: { close: () => void }) {
  const { resetPassword, confirmResetPassword } = useAuth();
  const { toast } = useToast();

  const [step, setStep] = useState<ResetStep>('request-code');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const requestCode = async () => {
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      toast('יש להזין כתובת אימייל', 'danger');
      return;
    }

    setBusy(true);

    try {
      await resetPassword(cleanEmail);
      setStep('confirm-code');
      toast('אם קיים משתמש עם המייל הזה, קוד איפוס נשלח אליו', 'success');
    } catch (e) {
      toast(e instanceof ApiError ? e.message : 'שליחת קוד האיפוס נכשלה', 'danger');
    } finally {
      setBusy(false);
    }
  };

  const confirmReset = async () => {
    const cleanEmail = email.trim();
    const cleanCode = code.trim();

    if (!cleanEmail || !cleanCode || !newPassword || !confirmPassword) {
      toast('יש למלא אימייל, קוד וסיסמה חדשה', 'danger');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast('הסיסמאות אינן תואמות', 'danger');
      return;
    }

    if (newPassword.length < 8) {
      toast('הסיסמה חייבת להכיל לפחות 8 תווים', 'danger');
      return;
    }

    setBusy(true);

    try {
      await confirmResetPassword(cleanEmail, cleanCode, newPassword);
      toast('הסיסמה אופסה בהצלחה. אפשר להתחבר עם הסיסמה החדשה', 'success');
      close();
    } catch (e) {
      toast(e instanceof ApiError ? e.message : 'איפוס הסיסמה נכשל. בדקו את הקוד ונסו שוב', 'danger');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog close={close} width={460}>
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

        {step === 'request-code' ? (
          <>
            <p style={{ fontSize: 14, color: 'var(--w4-muted)', margin: '0 0 18px', lineHeight: 1.5 }}>
              הכניסו את כתובת המייל שאיתה אתם רשומים למערכת.
              אם קיים משתמש עם המייל הזה, נשלח אליו קוד לאיפוס הסיסמה.
            </p>

            <Field
              label="כתובת אימייל"
              value={email}
              onChange={setEmail}
              type="email"
              placeholder="name@example.com"
              autoFocus
              onEnter={requestCode}
            />

            <div style={{ marginTop: 20 }}>
              <Button full onClick={requestCode} disabled={busy}>
                {busy ? 'שולח…' : 'שלח קוד איפוס'}
              </Button>
            </div>
          </>
        ) : (
          <>
            <p style={{ fontSize: 14, color: 'var(--w4-muted)', margin: '0 0 18px', lineHeight: 1.5 }}>
              הזינו את הקוד שקיבלתם במייל ובחרו סיסמה חדשה.
            </p>

            <Field
              label="כתובת אימייל"
              value={email}
              onChange={setEmail}
              type="email"
              placeholder="name@example.com"
            />

            <Field
              label="קוד אימות"
              value={code}
              onChange={setCode}
              placeholder="הקוד שקיבלת במייל"
              autoFocus
            />

            <Field
              label="סיסמה חדשה"
              value={newPassword}
              onChange={setNewPassword}
              type="password"
              placeholder="לפחות 8 תווים"
            />

            <Field
              label="אישור סיסמה חדשה"
              value={confirmPassword}
              onChange={setConfirmPassword}
              type="password"
              placeholder="הקלידו שוב את הסיסמה"
              onEnter={confirmReset}
            />

            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <Button variant="neutral" onClick={() => setStep('request-code')} disabled={busy}>
                חזרה
              </Button>

              <Button full onClick={confirmReset} disabled={busy}>
                {busy ? 'מאפס…' : 'אפס סיסמה'}
              </Button>
            </div>
          </>
        )}
      </div>
    </Dialog>
  );
}
