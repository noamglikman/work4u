const UNKNOWN_HOURS = [
  'not specified',
  'unknown',
  'לא ידוע',
  'לא צויין',
  'לא צוין',
  'אין מידע',
  'n/a',
];

const DAY_ALIASES: Record<string, number> = {
  'א': 0,
  'ראשון': 0,
  'ב': 1,
  'שני': 1,
  'ג': 2,
  'שלישי': 2,
  'ד': 3,
  'רביעי': 3,
  'ה': 4,
  'חמישי': 4,
  'ו': 5,
  'שישי': 5,
  'ש': 6,
  'שבת': 6,
  sun: 0,
  sunday: 0,
  mon: 1,
  monday: 1,
  tue: 2,
  tuesday: 2,
  wed: 3,
  wednesday: 3,
  thu: 4,
  thursday: 4,
  fri: 5,
  friday: 5,
  sat: 6,
  saturday: 6,
};

function normalizeText(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[׳'״"]/g, '')
    .replace(/[–—]/g, '-')
    .replace(/\s+/g, ' ');
}

function toMinutes(hours: string, minutes: string): number {
  return Number(hours) * 60 + Number(minutes);
}

function previousDay(day: number): number {
  return day === 0 ? 6 : day - 1;
}

function expandDayRange(start: number, end: number): Set<number> {
  const result = new Set<number>();
  let current = start;

  while (true) {
    result.add(current);
    if (current === end) break;
    current = (current + 1) % 7;
  }

  return result;
}

function parseDayToken(token: string): number | null {
  const normalized = normalizeText(token);
  return normalized in DAY_ALIASES ? DAY_ALIASES[normalized] : null;
}

function detectDays(prefix: string): Set<number> | null {
  const normalized = normalizeText(prefix);

  if (!normalized) return null;

  const dayPattern =
    '(ראשון|שני|שלישי|רביעי|חמישי|שישי|שבת|sunday|monday|tuesday|wednesday|thursday|friday|saturday|sun|mon|tue|wed|thu|fri|sat|א|ב|ג|ד|ה|ו|ש)';

  const rangeRegex = new RegExp(`${dayPattern}\\s*-\\s*${dayPattern}`, 'gi');
  const singleRegex = new RegExp(dayPattern, 'gi');

  const days = new Set<number>();

  for (const match of normalized.matchAll(rangeRegex)) {
    const start = parseDayToken(match[1]);
    const end = parseDayToken(match[2]);

    if (start !== null && end !== null) {
      for (const day of expandDayRange(start, end)) {
        days.add(day);
      }
    }
  }

  for (const match of normalized.matchAll(singleRegex)) {
    const day = parseDayToken(match[1]);
    if (day !== null) days.add(day);
  }

  return days.size ? days : null;
}

function segmentIsOpen(segment: string, now: Date): boolean {
  const normalized = normalizeText(segment);

  const timeMatch = normalized.match(/(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/);

  if (!timeMatch) return false;

  const timeStartIndex = normalized.indexOf(timeMatch[0]);
  const prefix = normalized.slice(0, timeStartIndex);

  const days = detectDays(prefix);
  const today = now.getDay();
  const yesterday = previousDay(today);
  const current = now.getHours() * 60 + now.getMinutes();

  const start = toMinutes(timeMatch[1], timeMatch[2]);
  const end = toMinutes(timeMatch[3], timeMatch[4]);

  // Same-day range, for example 09:00-20:00
  if (end > start) {
    const appliesToday = !days || days.has(today);
    return appliesToday && current >= start && current <= end;
  }

  // Overnight range, for example 20:00-02:00
  const appliesToday = !days || days.has(today);
  const appliesYesterday = !days || days.has(yesterday);

  return (appliesToday && current >= start) || (appliesYesterday && current <= end);
}

export function isOpenNow(openingHours: string | undefined, now = new Date()): boolean {
  if (!openingHours) return false;

  const normalized = normalizeText(openingHours);

  if (!normalized) return false;

  if (UNKNOWN_HOURS.some((value) => normalized.includes(value))) {
    return false;
  }

  if (normalized.includes('סגור')) {
    return false;
  }

  if (
    normalized.includes('24/7') ||
    normalized.includes('24 שעות') ||
    normalized.includes('00:00-23:59') ||
    normalized.includes('00:00-24:00')
  ) {
    return true;
  }

  const segments = normalized
    .split(/[,;]+/)
    .map((part) => part.trim())
    .filter(Boolean);

  return segments.some((segment) => segmentIsOpen(segment, now));
}
