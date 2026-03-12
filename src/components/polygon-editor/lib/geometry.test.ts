import { describe, expect, it } from 'vitest';
import {
  applyScale,
  clampPoint,
  getAspectRatioLabel,
  getPresetShape,
  insertPoint,
  removePointAt,
} from './geometry';

describe('geometry helpers', () => {
  it('clamps a point into 0-100 range', () => {
    expect(clampPoint({ x: -2, y: 120 })).toEqual({ x: 0, y: 100 });
  });

  it('creates preset shape points', () => {
    expect(getPresetShape('triangle')).toHaveLength(3);
    expect(getPresetShape('circle')).toHaveLength(12);
  });

  it('inserts and removes points', () => {
    const points = [
      { x: 10, y: 10 },
      { x: 90, y: 10 },
      { x: 90, y: 90 },
    ];

    const inserted = insertPoint(points, { x: 50, y: 50 }, 1);
    expect(inserted[1]).toEqual({ x: 50, y: 50 });
    expect(removePointAt(inserted, 1)).toHaveLength(3);
  });

  it('scales preview size within bounds', () => {
    expect(applyScale({ width: 300, height: 300 }, 2)).toEqual({ width: 600, height: 600 });
  });

  it('formats aspect ratio', () => {
    expect(getAspectRatioLabel({ width: 320, height: 180 })).toBe('16:9');
  });
});
