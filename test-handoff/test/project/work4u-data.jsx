// work4u-data.jsx — themes, mock data, icons. Exports to window.

// ── Theme system ────────────────────────────────────────────
// Each theme is a flat map of CSS custom properties applied at the app root.
const W4U_THEMES = {
  coffee: {
    label: 'קפה',
    dark: false,
    vars: {
      '--w4-bg': '#F1E8DA',
      '--w4-surface': '#FFFCF7',
      '--w4-surface-2': '#EBE0CF',
      '--w4-text': '#2E2319',
      '--w4-muted': '#8C7B67',
      '--w4-faint': '#B6A48E',
      '--w4-border': '#E3D6C2',
      '--w4-accent': '#BC6038',
      '--w4-accent-2': '#A8512E',
      '--w4-accent-soft': '#F3DFD2',
      '--w4-on-accent': '#FFF8F2',
      '--w4-success': '#5C8A5E',
      '--w4-success-soft': '#E2EEDF',
      '--w4-warn': '#C68A3C',
      '--w4-warn-soft': '#F4E7CE',
      '--w4-danger': '#C0503C',
      '--w4-danger-soft': '#F6DED6',
      '--w4-shadow': '0 6px 22px rgba(74,48,28,0.10)',
      '--w4-shadow-sm': '0 2px 8px rgba(74,48,28,0.07)',
      '--w4-radius': '20px',
      '--w4-radius-sm': '13px',
      '--w4-map': '#D9CDB6',
      '--w4-map-road': '#F1E8DA',
      '--w4-map-park': '#C2CBA0',
      '--w4-map-water': '#A9C3CC',
    },
  },
  espresso: {
    label: 'אספרסו',
    dark: true,
    vars: {
      '--w4-bg': '#1E1711',
      '--w4-surface': '#2A211A',
      '--w4-surface-2': '#352A21',
      '--w4-text': '#F3EADF',
      '--w4-muted': '#B6A491',
      '--w4-faint': '#7E6F5E',
      '--w4-border': '#41342A',
      '--w4-accent': '#E08A5E',
      '--w4-accent-2': '#EFA078',
      '--w4-accent-soft': '#3A2A20',
      '--w4-on-accent': '#241910',
      '--w4-success': '#85B585',
      '--w4-success-soft': '#27332478',
      '--w4-warn': '#E0AE63',
      '--w4-warn-soft': '#3a2f1d78',
      '--w4-danger': '#E2705A',
      '--w4-danger-soft': '#3a221d78',
      '--w4-shadow': '0 8px 26px rgba(0,0,0,0.45)',
      '--w4-shadow-sm': '0 2px 10px rgba(0,0,0,0.35)',
      '--w4-radius': '20px',
      '--w4-radius-sm': '13px',
      '--w4-map': '#2E2419',
      '--w4-map-road': '#1E1711',
      '--w4-map-park': '#33402A',
      '--w4-map-water': '#22383E',
    },
  },
  fresh: {
    label: 'בהיר',
    dark: false,
    vars: {
      '--w4-bg': '#FBF8F2',
      '--w4-surface': '#FFFFFF',
      '--w4-surface-2': '#F3EFE7',
      '--w4-text': '#221C15',
      '--w4-muted': '#938777',
      '--w4-faint': '#BDB2A2',
      '--w4-border': '#ECE5D9',
      '--w4-accent': '#D97757',
      '--w4-accent-2': '#C76343',
      '--w4-accent-soft': '#FAE7DE',
      '--w4-on-accent': '#FFFFFF',
      '--w4-success': '#5C8A5E',
      '--w4-success-soft': '#E7F0E6',
      '--w4-warn': '#CE944A',
      '--w4-warn-soft': '#F7ECD7',
      '--w4-danger': '#CB5743',
      '--w4-danger-soft': '#F9E4DE',
      '--w4-shadow': '0 8px 24px rgba(40,30,20,0.07)',
      '--w4-shadow-sm': '0 1px 6px rgba(40,30,20,0.05)',
      '--w4-radius': '14px',
      '--w4-radius-sm': '10px',
      '--w4-map': '#E7E0D2',
      '--w4-map-road': '#FBF8F2',
      '--w4-map-park': '#CFD7B2',
      '--w4-map-water': '#B7CDD4',
    },
  },
};

// ── Occupancy levels ────────────────────────────────────────
const W4U_OCC = {
  free:  { key: 'free',  label: 'פנוי',     color: 'var(--w4-success)', soft: 'var(--w4-success-soft)' },
  ok:    { key: 'ok',    label: 'סביר',     color: 'var(--w4-warn)',    soft: 'var(--w4-warn-soft)' },
  busy:  { key: 'busy',  label: 'עמוס מאוד', color: 'var(--w4-danger)',  soft: 'var(--w4-danger-soft)' },
};

// 24h-ish load forecast (8:00–22:00), values 0..100
const mkForecast = (arr) => arr;

// ── Venues (invented, Hebrew) ───────────────────────────────
const W4U_VENUES = [
  {
    id: 'v1', name: 'מרחב סָלון', area: 'נחלת בנימין, ת״א',
    photo: '#C98A5A', emoji: '☕️', price: '₪₪', dist: '290 מ׳',
    occ: 'free', wifi: 5, noise: 2, power: 'הרבה שקעים',
    hours: '07:30–23:00', seats: 'ספות + שולחנות עבודה', rating: 4.6, reviews: 128,
    lat: 38, lng: 44, tags: ['שקט', 'שקעים', 'אינטרנט מהיר', 'קפה מעולה'],
    blurb: 'בית קפה־סלון עם פינות עבודה רכות, אינטרנט יציב ושקעים בכל שולחן. אהוב על פרילנסרים.',
    forecast: mkForecast([20,35,55,70,60,45,40,55,75,85,70,50,40,30]),
  },
  {
    id: 'v2', name: 'הסדנה · חלל עבודה', area: 'רוטשילד, ת״א',
    photo: '#6E8E74', emoji: '🪴', price: '₪₪₪', dist: '1.1 ק״מ',
    occ: 'ok', wifi: 5, noise: 1, power: 'שקע לכל מושב',
    hours: '08:00–22:00', seats: 'עמדות ייעודיות', rating: 4.8, reviews: 211,
    lat: 60, lng: 30, tags: ['שקט מאוד', 'שקעים', 'אינטרנט מהיר', 'חדרי שיחות'],
    blurb: 'חלל עבודה שיתופי שקט עם חדרי zoom, קפה חופשי ותאורה טבעית מצוינת.',
    forecast: mkForecast([10,30,60,80,75,65,55,60,70,65,50,35,25,15]),
  },
  {
    id: 'v3', name: 'אספרסו בר נַחְלָה', area: 'פלורנטין, ת״א',
    photo: '#B5613F', emoji: '🔥', price: '₪', dist: '540 מ׳',
    occ: 'busy', wifi: 3, noise: 4, power: 'מעט שקעים',
    hours: '07:00–20:00', seats: 'בר + שולחנות קטנים', rating: 4.3, reviews: 96,
    lat: 30, lng: 64, tags: ['תוסס', 'קפה מעולה', 'מחיר טוב'],
    blurb: 'בר קפה אנרגטי בלב פלורנטין. רועש וחי — מושלם לפגישות קצרות, פחות לריכוז עמוק.',
    forecast: mkForecast([40,65,85,90,80,70,75,85,80,60,45,30,20,10]),
  },
  {
    id: 'v4', name: 'ספריית עין הקורא', area: 'מונטיפיורי, ת״א',
    photo: '#7E7AA0', emoji: '📚', price: '₪', dist: '820 מ׳',
    occ: 'free', wifi: 4, noise: 1, power: 'שקעים בעמדות',
    hours: '09:00–21:00', seats: 'עמדות לימוד שקטות', rating: 4.7, reviews: 154,
    lat: 48, lng: 22, tags: ['שקט מאוד', 'שקעים', 'מתאים לסטודנטים'],
    blurb: 'בית קפה־ספרייה לאוהבי השקט. עמדות לימוד מרווחות, מדפי ספרים ופינת תה.',
    forecast: mkForecast([15,25,45,55,50,55,60,65,70,60,45,35,25,20]),
  },
  {
    id: 'v5', name: 'קולקטיב גְּרָאנְד', area: 'הגראנד, ב״ש',
    photo: '#C2954B', emoji: '🌵', price: '₪₪', dist: '2.4 ק״מ',
    occ: 'ok', wifi: 5, noise: 2, power: 'הרבה שקעים',
    hours: '08:00–24:00', seats: 'מגוון אזורים', rating: 4.5, reviews: 73,
    lat: 70, lng: 58, tags: ['פתוח עד מאוחר', 'אינטרנט מהיר', 'שקעים'],
    blurb: 'מתחם עבודה ענק עם אזורים שקטים ותוססים, פתוח עד חצות. אהוב על סטודנטים מבן גוריון.',
    forecast: mkForecast([10,20,40,55,50,45,50,60,75,80,75,65,55,45]),
  },
  {
    id: 'v6', name: 'ביבר קפה', area: 'הדר, חיפה',
    photo: '#5E8A93', emoji: '🌊', price: '₪₪', dist: '3.0 ק״מ',
    occ: 'free', wifi: 4, noise: 3, power: 'שקעים ליד הקירות',
    hours: '07:30–22:30', seats: 'שולחנות + מרפסת', rating: 4.4, reviews: 88,
    lat: 22, lng: 40, tags: ['נוף', 'קפה מעולה', 'מרפסת'],
    blurb: 'בית קפה עם מרפסת ונוף לים. אווירה רגועה, מתאים לעבודה עם הפסקות נשימה.',
    forecast: mkForecast([25,40,55,60,55,50,45,50,55,50,40,35,30,25]),
  },
];

// per-venue community report log (for forecast realism / history)
const W4U_HISTORY = [
  { id: 'h1', venueId: 'v2', date: '28 במאי 2026', occ: 'ok',   wifi: 5, noise: 1 },
  { id: 'h2', venueId: 'v1', date: '21 במאי 2026', occ: 'free', wifi: 5, noise: 2 },
  { id: 'h3', venueId: 'v3', date: '14 במאי 2026', occ: 'busy', wifi: 3, noise: 4 },
  { id: 'h4', venueId: 'v4', date: '03 במאי 2026', occ: 'free', wifi: 4, noise: 1 },
];

const W4U_HOURS = ['8','9','10','11','12','13','14','15','16','17','18','19','20','21'];

Object.assign(window, { W4U_THEMES, W4U_OCC, W4U_VENUES, W4U_HISTORY, W4U_HOURS });
