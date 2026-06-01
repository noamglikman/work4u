// lib/hours.ts — parse opening-hours strings and decide "open now".
// Handles "08:00-22:00", "07:30–23:00" (en-dash) and end times up to 24:00.

function toMinutes(value: string): number | null {
  const m = value.trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!m) return null;
  const h = parseInt(m[1], 10);
  const min = parseInt(m[2], 10);
  if (Number.isNaN(h) || Number.isNaN(min)) return null;
  return h * 60 + min;
}

/**
 * Is the venue open at `now` (defaults to the current time)?
 * Unknown/unparseable hours are treated as open (we don't hide venues we can't
 * evaluate). Supports overnight ranges (e.g. 20:00-02:00).
 */
export function isOpenNow(openingHours: string | undefined, now = new Date()): boolean {
  if (!openingHours) return true;
  const parts = openingHours.split(/[-–—]/);
  if (parts.length !== 2) return true;
  const open = toMinutes(parts[0]);
  const close = toMinutes(parts[1]);
  if (open == null || close == null) return true;

  const cur = now.getHours() * 60 + now.getMinutes();
  if (close > open) return cur >= open && cur <= close; // same-day range
  return cur >= open || cur <= close; // overnight range
}
