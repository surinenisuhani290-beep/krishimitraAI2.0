import { describe, it, expect } from 'vitest';
import { detectIntent } from '../src/services/intentUtils';

describe('intent detection', () => {
  it('detects weather', () => {
    expect(detectIntent('weather today')).toBe('WEATHER');
  });

  it('detects disease', () => {
    expect(detectIntent('my tomato leaves have spots')).toBe('DISEASE');
  });

  it('detects market price', () => {
    expect(detectIntent('price of rice')).toBe('MARKET_PRICE');
  });
});
