// api/http.ts — thin fetch wrapper for the live backend.
// Talks to API Gateway, attaches the Cognito JWT as `Authorization: Bearer …`,
// and unwraps the global { success, message, data } envelope (api-contract §5).

import { env } from '../config/env';
import type { ApiEnvelope } from '../types/api';
import { ApiError } from './errors';
import { getIdToken } from './auth';

type Query = Record<string, string | number | boolean | undefined | null>;

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  query?: Query;
  body?: unknown;
  /** Set false for endpoints that don't require auth (none, currently). */
  auth?: boolean;
}

function buildUrl(path: string, query?: Query): string {
  const url = new URL(env.apiBaseUrl + path);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, String(value));
      }
    }
  }
  return url.toString();
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', query, body, auth = true } = options;

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = await getIdToken();
    if (token) headers.Authorization = token;
  }

  let res: Response;
  try {
    res = await fetch(buildUrl(path, query), {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (e) {
    throw new ApiError(
      e instanceof Error ? e.message : 'Network error',
      'SERVER_ERROR',
    );
  }

  let payload: ApiEnvelope<T> | null = null;
  try {
    payload = (await res.json()) as ApiEnvelope<T>;
  } catch {
    // Non-JSON response.
    if (!res.ok) throw new ApiError(`HTTP ${res.status}`, 'SERVER_ERROR', res.status);
    throw new ApiError('Malformed server response', 'SERVER_ERROR', res.status);
  }

  if (!payload.success) {
    throw new ApiError(payload.message || 'Request failed', payload.errorCode, res.status);
  }
  return payload.data;
}

export const http = {
  get: <T>(path: string, query?: Query) => request<T>(path, { method: 'GET', query }),
  post: <T>(path: string, body?: unknown) => request<T>(path, { method: 'POST', body }),
  put: <T>(path: string, body?: unknown) => request<T>(path, { method: 'PUT', body }),
  del: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};
