// screens/Signup.tsx — account creation with Cognito email confirmation support.

import { useState } from 'react';
import { ApiError } from '../api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import type { Navigate } from '../types/nav';
import { Button, Field } from '../components/ui';
import { AuthBrand, FormWrap } from '../components/auth/AuthShell';

export function Signup({ go }: { go: Navigate }) {
  const { signUp, signIn, confirmSignUp } = useAuth();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [code, setCode] = useState('');

  const [showPw, setShowPw] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');

  const [errs, setErrs] = useState<{
    email?: string;
    pw?: string;
    pw2?: string;
    code?: string;
    form?: string;
  }>({});

  const [busy, setBusy] = useState(false);

  const submit = async () => {
    const e: typeof errs = {};

    const cleanEmail = email.trim();

    if (!/^\S+@\S+\.\S+$/.test(cleanEmail)) {
      e.email = 'יש להזין כתובת אימייל תקינה';
    }

    if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(pw)) {
      e.pw = 'שגיאה: הסיסמה חייבת להכיל לפחות 8 תווים, אות גדולה ומספר';
    }

    if (pw2 !== pw || !pw2) {
      e.pw2 = 'הסיסמאות אינן תואמות';
    }

    setErrs(e);

    if (Object.keys(e).length) return;

    setBusy(true);

    try {
      const result = await signUp(cleanEmail, pw);

      if (result.needsConfirmation) {
        setPendingEmail(cleanEmail);
        setNeedsConfirmation(true);
        toast('נשלח קוד אימות לאימייל שלך. הזיני את הקוד כדי להשלים הרשמה.', 'success');
        return;
      }

      await signIn(cleanEmail, pw);
      toast('החשבון נוצר בהצלחה! בוא נגדיר את סביבת העבודה שלך', 'success');
      setTimeout(() => go('prefs'), 750);
    } catch (err) {
      setErrs({
        form: err instanceof ApiError ? err.message : 'יצירת החשבון נכשלה, נסו שוב',
      });
    } finally {
      setBusy(false);
    }
  };

  const confirm = async () => {
    const e: typeof errs = {};

    if (!code.trim()) {
      e.code = 'יש להזין את קוד האימות שנשלח לאימייל';
    }

    setErrs(e);

    if (Object.keys(e).length) return;

    setBusy(true);

    try {
      await confirmSignUp(pendingEmail, code.trim());

      toast('האימייל אומת בהצלחה. כעת ניתן להתחבר.', 'success');

      setTimeout(() => {
        go('login');
      }, 700);
    } catch (err) {
      setErrs({
        form: err instanceof ApiError ? err.message : 'אימות החשבון נכשל, בדקו את הקוד ונסו שוב',
      });
    } finally {
      setBusy(false);
    }
  };

  if (needsConfirmation) {
    return (
      <div className="w4-auth">
        <FormWrap>
          <div style={{ marginBottom: 26 }}>
            <h1 style={{ fontSize: 30, fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
              אימות אימייל
            </h1>
            <p style={{ fontSize: 15.5, color: 'var(--w4-muted)', margin: 0, lineHeight: 1.5 }}>
              שלחנו קוד אימות לכתובת:
              <br />
              <strong>{pendingEmail}</strong>
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
              label="קוד אימות"
              value={code}
              onChange={setCode}
              type="text"
              placeholder="הזיני את הקוד שקיבלת במייל"
              error={errs.code}
              onEnter={confirm}
            />
          </div>

          <div style={{ marginTop: 24 }}>
            <Button full onClick={confirm} disabled={busy}>
              {busy ? 'מאמת…' : 'אמת חשבון'}
            </Button>
          </div>

          <div style={{ marginTop: 18, textAlign: 'center', fontSize: 14.5, color: 'var(--w4-muted)' }}>
            רוצה לשנות אימייל?{' '}
            <button
              onClick={() => {
                setNeedsConfirmation(false);
                setCode('');
                setErrs({});
              }}
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
              חזרה להרשמה
            </button>
          </div>
        </FormWrap>
        <AuthBrand />
      </div>
    );
  }

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