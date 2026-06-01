// config/env.ts — single source of truth for runtime configuration.
// Everything is read from Vite env vars (import.meta.env.VITE_*). See .env.example.

function bool(value: string | undefined, fallback: boolean): boolean {
  if (value == null || value === '') return fallback;
  return value.toLowerCase() === 'true' || value === '1';
}

function str(value: string | undefined): string {
  return (value ?? '').trim();
}

export const env = {
  /** When true, the app serves data from the local mock adapter (no AWS). */
  useMock: bool(import.meta.env.VITE_USE_MOCK, true),

  /** REST API base URL (API Gateway stage), no trailing slash. */
  apiBaseUrl: str(import.meta.env.VITE_API_BASE_URL).replace(/\/+$/, ''),

  aws: {
    region: str(import.meta.env.VITE_AWS_REGION) || 'us-east-1',
    userPoolId: str(import.meta.env.VITE_COGNITO_USER_POOL_ID),
    userPoolClientId: str(import.meta.env.VITE_COGNITO_USER_POOL_CLIENT_ID),
    s3Bucket: str(import.meta.env.VITE_S3_BUCKET),
  },
} as const;

/** True only when real Cognito credentials are present in the environment. */
export const hasCognitoConfig = Boolean(env.aws.userPoolId && env.aws.userPoolClientId);

/** True only when a real API base URL is configured. */
export const hasApiConfig = Boolean(env.apiBaseUrl);

/**
 * Whether the app should talk to the real AWS backend.
 * Requires the mock toggle OFF *and* the minimum config to be present.
 * If someone flips VITE_USE_MOCK=false without config, we fall back to mock
 * and warn, so the app never hard-crashes on a misconfiguration.
 */
export const isLive = !env.useMock && hasApiConfig && hasCognitoConfig;

if (!env.useMock && !isLive && import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  console.warn(
    '[Work4U] VITE_USE_MOCK=false but API/Cognito config is incomplete — ' +
      'falling back to mock data. Fill in .env to go live.',
  );
}
