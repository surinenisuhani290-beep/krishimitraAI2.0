import type { Intent } from './intentTypes';

export function detectIntent(text: string): Intent {
  const s = (text || '').toLowerCase();
  if (s.includes('weather') || s.includes('tempo')) return 'WEATHER';
  if (s.includes('price') || s.includes('market')) return 'MARKET_PRICE';
  if (s.includes('leaf') || s.includes('yellow') || s.includes('spots') || s.includes('disease')) return 'DISEASE';
  if (s.includes('fert')) return 'FERTILIZER';
  if (s.includes('scheme') || s.includes('gov')) return 'GOVERNMENT_SCHEME';
  if (s.includes('volunteer') || s.includes('expert') || s.includes('talk')) return 'KRISHI_SEVA';
  if (s.includes('women') || s.includes('shg')) return 'WOMEN_SCHEMES';
  return 'UNKNOWN';
}
