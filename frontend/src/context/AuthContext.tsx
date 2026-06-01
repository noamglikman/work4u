// context/AuthContext.tsx — current authentication state + actions.
// Wraps the `auth` service (Cognito or mock) so screens get a simple, reactive
// view of "who am I / am I admin" and the sign-in/up/out actions.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { auth, type AuthSession, type SignUpResult } from '../api';
import type { SignInOptions } from '../api/auth';

interface AuthContextValue {
  session: AuthSession | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  /** True while the initial session restore is in flight. */
  loading: boolean;
  signIn: (email: string, password: string, opts?: SignInOptions) => Promise<AuthSession>;
  signUp: (email: string, password: string) => Promise<SignUpResult>;
  resetPassword: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    auth
      .getSession()
      .then((s) => active && setSession(s))
      .catch(() => active && setSession(null))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const signIn = useCallback(
    async (email: string, password: string, opts?: SignInOptions) => {
      const s = await auth.signIn(email, password, opts);
      setSession(s);
      return s;
    },
    [],
  );

  const signUp = useCallback(
    (email: string, password: string) => auth.signUp(email, password),
    [],
  );

  const resetPassword = useCallback((email: string) => auth.resetPassword(email), []);

  const signOut = useCallback(async () => {
    await auth.signOut();
    setSession(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      isAuthenticated: Boolean(session),
      isAdmin: Boolean(session?.isAdmin),
      loading,
      signIn,
      signUp,
      resetPassword,
      signOut,
    }),
    [session, loading, signIn, signUp, resetPassword, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}
