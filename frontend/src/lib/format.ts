// lib/format.ts — small formatting helpers (dates, hours, deterministic visuals).

const HE_MONTHS = [
  'ינואר',
  'פברואר',
  'מרץ',
  'אפריל',
  'מאי',
  'יוני',
  'יולי',
  'אוגוסט',
  'ספטמבר',
  'אוקטובר',
  'נובמבר',
  'דצמבר',
];

/** Format an ISO date string (or Date) as "28 במאי 2026". */
export function formatHebrewDate(input: string | Date): string {
  const d = typeof input === 'string' ? new Date(input) : input;
  if (Number.isNaN(d.getTime())) return typeof input === 'string' ? input : '';
  return `${d.getDate()} ב${HE_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

/** "09:00" → "9", "18:00" → "18". */
export function shortHour(hour: string): string {
  const h = hour.split(':')[0] ?? hour;
  return String(parseInt(h, 10));
}

/**
 * Strip Hebrew niqqud (vowel/cantillation marks, U+0591–U+05C7) and lowercase,
 * so searches match regardless of diacritics — "סלון" matches "סָלון".
 */
export function normalizeText(value: string): string {
  return value.replace(/[֑-ׇ]/g, '').toLowerCase().trim();
}

// ── Deterministic placeholder visuals ───────────────────────────────
// When a venue has no real S3 photo yet, we still want a stable, pleasant
// colour + emoji per venue. Derived from the id so they never flicker.

const PLACEHOLDER_COLORS = [
  '#C98A5A',
  '#6E8E74',
  '#B5613F',
  '#7E7AA0',
  '#C2954B',
  '#5E8A93',
  '#A88B6B',
  '#7E8B72',
];

const PLACEHOLDER_EMOJI = ['☕️', '🪴', '🔥', '📚', '🌵', '🌊', '🍵', '✨'];

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function placeholderColor(id: string): string {
  return PLACEHOLDER_COLORS[hash(id) % PLACEHOLDER_COLORS.length];
}

export function placeholderEmoji(id: string): string {
  return PLACEHOLDER_EMOJI[hash(id + 'e') % PLACEHOLDER_EMOJI.length];
}

/**
 * Pick a short locality from a full address.
 * "Dizengoff 100, Tel Aviv" → "Tel Aviv"; "נחלת בנימין, ת״א" → "נחלת בנימין, ת״א".
 * Falls back to the whole address when there's nothing to trim.
 */
export function shortArea(address: string): string {
  if (!address) return '';
  const parts = address.split(',').map((p) => p.trim()).filter(Boolean);
  if (parts.length <= 1) return address.trim();
  // Drop a leading street number from the first segment for a cleaner label.
  const head = parts[0].replace(/\s*\d+\s*$/, '').trim();
  const tail = parts[parts.length - 1];
  return head && head !== tail ? `${head}, ${tail}` : tail;
}
