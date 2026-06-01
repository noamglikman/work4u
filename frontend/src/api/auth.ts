// api/auth.ts — authentication seam (Amazon Cognito via Amplify, with a mock).
// The UI talks only to `auth`; whether that's Cognito or the mock is decided
// once by `isLive`. `getIdToken()` is also consumed by http.ts.

import {
  signIn as amplifySignIn,
  signUp as amplifySignUp,
  confirmSignUp as amplifyConfirmSignUp,
  resetPassword as amplifyResetPassword,
  confirmResetPassword as amplifyConfirmReset,
  signOut as amplifySignOut,
  getCurrentUser,
  fetchAuthSession,
} from 'aws-amplify/auth';
import { isLive } from '../config/env';
import type { UserProfile } from '../types/api';
import { ApiError } from './errors';

export interface AuthSession {
  user: UserProfile;
  isAdmin: boolean;
}

export interface SignUpResult {
  /** True when Cognito requires an email/SMS confirmation code before login. */
  needsConfirmation: boolean;
}

export interface SignInOptions {
  /** Mock-only hint: log in as an admin. Ignored when live (groups decide). */
  asAdmin?: boolean;
}

export interface AuthService {
  signIn(email: string, password: string, opts?: SignInOptions): Promise<AuthSession>;
  signUp(email: string, password: string): Promise<SignUpResult>;
  confirmSignUp(email: string, code: string): Promise<void>;
  resetPassword(email: string): Promise<void>;
  confirmResetPassword(email: string, code: string, newPassword: string): Promise<void>;
  signOut(): Promise<void>;
  /** Restore an existing session on app load, or null if signed out. */
  getSession(): Promise<AuthSession | null>;
}

// ── Mock implementation ─────────────────────────────────────────────
const MOCK_KEY = 'work4u.mock.session';

function mockSessionFromEmail(email: string, isAdmin: boolean): AuthSession {
  return {
    user: {
      userId: 'mock-user-123',
      email,
      role: isAdmin ? 'ADMIN' : 'USER',
      createdAt: new Date().toISOString(),
    },
    isAdmin,
  };
}

const mockAuth: AuthService = {
  async signIn(email, _password, opts) {
    // The mock accepts any non-empty credentials (matching the prototype) and
    // grants admin via the explicit toggle or an "admin" in the address.
    const isAdmin = Boolean(opts?.asAdmin) || /admin/i.test(email);
    const session = mockSessionFromEmail(email, isAdmin);
    localStorage.setItem(MOCK_KEY, JSON.stringify(session));
    return session;
  },
  async signUp() {
    return { needsConfirmation: false };
  },
  async confirmSignUp() {
    /* no-op */
  },
  async resetPassword() {
    /* no-op */
  },
  async confirmResetPassword() {
    /* no-op */
  },
  async signOut() {
    localStorage.removeItem(MOCK_KEY);
  },
  async getSession() {
    const raw = localStorage.getItem(MOCK_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthSession;
    } catch {
      return null;
    }
  },
};

// ── Live implementation (Amazon Cognito) ────────────────────────────
function groupsFromPayload(payload: Record<string, unknown> | undefined): string[] {
  const raw = payload?.['cognito:groups'];
  if (Array.isArray(raw)) return raw.map(String);
  if (typeof raw === 'string') return [raw];
  return [];
}

async function sessionFromCognito(): Promise<AuthSession | null> {
  const session = await fetchAuthSession();
  const idToken = session.tokens?.idToken;
  if (!idToken) return null;
  const payload = idToken.payload as Record<string, unknown>;
  const groups = groupsFromPayload(payload);
  const isAdmin = groups.includes('admin');
  return {
    user: {
      userId: String(payload.sub ?? ''),
      email: String(payload.email ?? ''),
      role: isAdmin ? 'ADMIN' : 'USER',
      createdAt: '',
    },
    isAdmin,
  };
}

const liveAuth: AuthService = {
  async signIn(email, password) {
    const result = await amplifySignIn({ username: email, password });
    if (!result.isSignedIn) {
      throw new ApiError('יש להשלים את תהליך ההתחברות', 'UNAUTHORIZED', 401);
    }
    const session = await sessionFromCognito();
    if (!session) throw new ApiError('שגיאה בקבלת פרטי המשתמש', 'UNAUTHORIZED', 401);
    return session;
  },
  async signUp(email, password) {
    const result = await amplifySignUp({
      username: email,
      password,
      options: { userAttributes: { email } },
    });
    return { needsConfirmation: result.nextStep.signUpStep === 'CONFIRM_SIGN_UP' };
  },
  async confirmSignUp(email, code) {
    await amplifyConfirmSignUp({ username: email, confirmationCode: code });
  },
  async resetPassword(email) {
    await amplifyResetPassword({ username: email });
  },
  async confirmResetPassword(email, code, newPassword) {
    await amplifyConfirmReset({ username: email, confirmationCode: code, newPassword });
  },
  async signOut() {
    await amplifySignOut();
  },
  async getSession() {
    try {
      await getCurrentUser();
      return await sessionFromCognito();
    } catch {
      return null;
    }
  },
};

export const auth: AuthService = isLive ? liveAuth : mockAuth;

/** The current Cognito ID token (JWT), or null. Used by http.ts. */
export async function getIdToken(): Promise<string | null> {
  if (!isLive) return null;
  try {
    const session = await fetchAuthSession();
    return session.tokens?.idToken?.toString() ?? null;
  } catch {
    return null;
  }
}
