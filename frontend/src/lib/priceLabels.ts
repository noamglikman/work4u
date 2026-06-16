export function getSmartPriceLabel(priceRange?: string, placeType?: string): string {
  const type = (placeType ?? '').toLowerCase();
  const price = (priceRange ?? 'medium').toLowerCase();

  if (type === 'cafe') {
    if (price === 'low') return 'כוס קפה: כ־8–12 ₪';
    if (price === 'high') return 'כוס קפה: כ־16–22 ₪';
    return 'כוס קפה: כ־12–16 ₪';
  }

  if (type === 'coworking') {
    if (price === 'low') return 'עמדת עבודה: החל מכ־50 ₪ ליום';
    if (price === 'high') return 'מתחם בתשלום: כ־120–250 ₪ ליום';
    return 'מתחם בתשלום: כ־80–150 ₪ ליום';
  }

  if (type === 'library' || type === 'academic') {
    if (price === 'high') return 'כניסה/שירותים בתשלום לפי מדיניות המקום';
    if (price === 'medium') return 'עלות נמוכה / בהתאם למדיניות המקום';
    return 'חינם או בעלות נמוכה';
  }

  if (type === 'community') {
    if (price === 'high') return 'בתשלום לפי פעילות/שירות';
    if (price === 'medium') return 'עלות בינונית לפי פעילות';
    return 'חינם או בעלות נמוכה';
  }

  if (price === 'low') return 'עלות נמוכה';
  if (price === 'high') return 'עלות גבוהה';
  return 'עלות בינונית';
}
