// api/errors.ts — typed API error surfaced to the UI.

import type { ApiErrorCode } from '../types/api';

export class ApiError extends Error {
  readonly code: ApiErrorCode | string;
  readonly status?: number;

  constructor(message: string, code: ApiErrorCode | string = 'SERVER_ERROR', status?: number) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
  }
}

/** Human Hebrew message for a known error code, with a sensible fallback. */
export function messageForCode(code: string, fallback = 'אירעה שגיאה, נסו שוב'): string {
  const map: Record<string, string> = {
    UNAUTHORIZED: 'יש להתחבר כדי להמשיך',
    FORBIDDEN: 'אין לך הרשאה לבצע פעולה זו',
    VALIDATION_ERROR: 'חלק מהשדות חסרים או שגויים',
    NOT_FOUND: 'הפריט המבוקש לא נמצא',
    SERVER_ERROR: 'תקלת שרת זמנית, נסו שוב',
    DUPLICATE_RESOURCE: 'הפריט כבר קיים במערכת',
    INVALID_LOCATION: 'נתוני מיקום שגויים',
  };
  return map[code] ?? fallback;
}
