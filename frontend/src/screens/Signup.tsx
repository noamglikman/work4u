// screens/Signup.tsx — account creation. On success it continues to the
// preferences onboarding (mock) or asks the user to confirm their email (live).

import { useState } from 'react';
import { ApiError } from '../api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import type { Navigate } from '../types/nav';
import { Button, Field } from '../components/ui';
import { AuthBrand, FormWrap } from '../components/auth/AuthShell';

export function Signup({ go }: { go: Navigate }) {
  const { signUp, signIn } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [errs, setErrs] = useState<{ email?: string; pw?: string; pw2?: string; form?: string }>({});
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    const e: typeof errs = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) e.email = 'יש להזין כתובת אימייל תקינה';
    if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(pw))
      e.pw = 'שגיאה: הסיסמה חייבת להכיל לפחות 8 תווים, אות גדולה ומספר';
    if (pw2 !== pw || !pw2) e.pw2 = 'הסיסמאות אינן תואמות';
    setErrs(e);
    if (Object.keys(e).length) return;

    setBusy(true);
    try {
      const result = await signUp(email.trim(), pw);
      if (result.needsConfirmation) {
        // Live Cognito with email verification: confirm before first login.
        toast('נשלח קוד אימות לאימייל שלך — אשרו והתחברו', 'success');
        setTimeout(() => go('login'), 900);
      } else {
        // Auto sign-in so onboarding runs as an authenticated session.
        await signIn(email.trim(), pw);
        toast('החשבון נוצר בהצלחה! בוא נגדיר את סביבת העבודה שלך', 'success');
        setTimeout(() => go('prefs'), 750);
      }
    } catch (err) {
      setErrs({ form: err instanceof ApiError ? err.message : 'יצירת החשבון נכשלה, נסו שוב' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="w4-auth">
      <FormWrap>
        <div style={{ marginBottom: 26 }}>
          <h1 style={{ fontSize: 30, fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
            יצירת חשבון
          </h1>
          <p style={{ fontSize: 15.5, color: 'var(--w4-muted)', margin: 0, lineHeight: 1.5 }}>
            הצטרפו לקהילת העובדים החכמים של Work4U.
          </p>
        </div>
        {errs.form && (
          <div
            style={{
              background: 'var(--w4-danger-soft)',
              color: 'var(--w4-danger)',
              padding: '12px 14px',
              borderRadius: 'var(--w4-radius-sm)',
              fontSize: 13.5,
              fontWeight: 600,
              marginBottom: 18,
              lineHeight: 1.45,
            }}
          >
            {errs.form}
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Field
            label="כתובת אימייל"
            value={email}
            onChange={setEmail}
            type="email"
            placeholder="name@work4u.co.il"
            error={errs.email}
          />
          <Field
            label="סיסמה"
            value={pw}
            onChange={setPw}
            type={showPw ? 'text' : 'password'}
            placeholder="לפחות 8 תווים, אות גדולה ומספר"
            trailing={showPw ? 'eyeoff' : 'eye'}
            onTrailing={() => setShowPw((s) => !s)}
            error={errs.pw}
          />
          <Field
            label="אימות סיסמה"
            value={pw2}
            onChange={setPw2}
            type={showPw ? 'text' : 'password'}
            placeholder="הקלידו את הסיסמה שוב"
            error={errs.pw2}
            onEnter={submit}
          />
        </div>
        <div style={{ marginTop: 24 }}>
          <Button full onClick={submit} disabled={busy}>
            {busy ? 'יוצר חשבון…' : 'צור חשבון'}
          </Button>
        </div>
        <div style={{ marginTop: 24, textAlign: 'center', fontSize: 14.5, color: 'var(--w4-muted)' }}>
          כבר רשומים?{' '}
          <button
            onClick={() => go('login')}
            style={{
              border: 'none',
              background: 'none',
              color: 'var(--w4-accent)',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: 14.5,
            }}
          >
            התחברו
          </button>
        </div>
      </FormWrap>
      <AuthBrand />
    </div>
  );
}
