// screens/Login.tsx — email/password sign-in.
// Admin permissions are detected automatically from Cognito groups after login.

import { useState } from 'react';
import { ApiError } from '../api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import type { Navigate } from '../types/nav';
import { Button, Field } from '../components/ui';
import { AuthBrand, FormWrap } from '../components/auth/AuthShell';

interface LoginProps {
  go: Navigate;
  openForgot: () => void;
}

export function Login({ go, openForgot }: LoginProps) {
  const { signIn } = useAuth();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (!email.trim() || !pw.trim()) {
      setErr('שגיאה: שם המשתמש או הסיסמה אינם נכונים, אנא נסו שנית');
      return;
    }

    setErr('');
    setBusy(true);

    try {
      const session = await signIn(email.trim(), pw);

      toast(
        session.isAdmin
          ? 'התחברת בהצלחה כמנהל, מועבר למסך הבית'
          : 'התחברת בהצלחה, מועבר למסך הבית',
        'success',
      );

      setTimeout(() => go('home'), 500);
    } catch (e) {
      setErr(
        e instanceof ApiError
          ? e.message
          : 'שגיאה: שם המשתמש או הסיסמה אינם נכונים, אנא נסו שנית',
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="w4-auth">
      <FormWrap>
        <div style={{ marginBottom: 30 }}>
          <h1 style={{ fontSize: 30, fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
            ברוכים השבים 👋
          </h1>
          <p style={{ fontSize: 15.5, color: 'var(--w4-muted)', margin: 0, lineHeight: 1.5 }}>
            התחברו כדי למצוא את מקום העבודה שלכם להיום.
          </p>
        </div>

        {err && (
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
            {err}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Field
            label="כתובת אימייל"
            value={email}
            onChange={setEmail}
            type="email"
            placeholder="name@work4u.co.il"
          />

          <Field
            label="סיסמה"
            value={pw}
            onChange={setPw}
            type={showPw ? 'text' : 'password'}
            placeholder="••••••••"
            trailing={showPw ? 'eyeoff' : 'eye'}
            onTrailing={() => setShowPw((s) => !s)}
            onEnter={submit}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 12 }}>
          <button
            onClick={openForgot}
            style={{
              border: 'none',
              background: 'none',
              color: 'var(--w4-accent)',
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer',
              fontFamily: 'inherit',
              padding: 2,
              whiteSpace: 'nowrap',
            }}
          >
            שכחתי סיסמה
          </button>
        </div>

        <div style={{ marginTop: 22 }}>
          <Button full onClick={submit} disabled={busy}>
            {busy ? 'מתחבר…' : 'התחברות'}
          </Button>
        </div>

        <div
          style={{
            marginTop: 26,
            textAlign: 'center',
            fontSize: 14.5,
            color: 'var(--w4-muted)',
          }}
        >
          משתמש חדש?{' '}
          <button
            onClick={() => go('signup')}
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
            הרשמה
          </button>
        </div>
      </FormWrap>

      <AuthBrand />
    </div>
  );
}
