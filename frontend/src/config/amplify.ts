// config/amplify.ts — configures AWS Amplify (Cognito + API + S3) once at startup.
// No-op in mock mode, so the app runs with zero AWS dependencies during development.

import { Amplify } from 'aws-amplify';
import { env, isLive } from './env';

let configured = false;

export function configureAmplify(): void {
  if (configured || !isLive) return;

  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: env.aws.userPoolId,
        userPoolClientId: env.aws.userPoolClientId,
      },
    },
    API: {
      REST: {
        Work4U: {
          endpoint: env.apiBaseUrl,
          region: env.aws.region,
        },
      },
    },
    ...(env.aws.s3Bucket
      ? {
          Storage: {
            S3: {
              bucket: env.aws.s3Bucket,
              region: env.aws.region,
            },
          },
        }
      : {}),
  });

  configured = true;
}
