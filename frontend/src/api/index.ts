// api/index.ts — the public entry point for all data access.
// Picks the mock or live adapter ONCE based on configuration. Components and
// hooks import `api` (and `auth`) from here and never reach past this seam.

import { isLive } from '../config/env';
import type { Api } from './services';
import { mockApi } from './mock/store';
import { liveApi } from './live';

export const api: Api = isLive ? liveApi : mockApi;

export { auth } from './auth';
export type { AuthSession, SignUpResult } from './auth';
export { ApiError, messageForCode } from './errors';
export type { Api } from './services';

/** Whether the app is currently wired to the real AWS backend. */
export const usingLiveBackend = isLive;
