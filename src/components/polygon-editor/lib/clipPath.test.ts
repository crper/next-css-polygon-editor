import { describe, expect, it } from 'vitest';
import { parseClipPath, serializeClipPath, tryParseClipPath } from './clipPath';

describe('clipPath', () => {
  it('serializes points to polygon()', () => {
    expect(
      serializeClipPath([
        { x: 10, y: 10 },
        { x: 90, y: 10 },
        { x: 90, y: 90 },
      ])
    ).toBe('polygon(10% 10%, 90% 10%, 90% 90%)');
  });

  it('parses and clamps polygon values', () => {
    expect(parseClipPath('polygon(-5% 20%, 120% 30%, 40% 110%)')).toEqual([
      { x: 0, y: 20 },
      { x: 100, y: 30 },
      { x: 40, y: 100 },
    ]);
  });

  it('returns error when polygon is invalid', () => {
    const result = tryParseClipPath('inset(1px)');
    expect(result.ok).toBe(false);
  });
});
