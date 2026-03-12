import { describe, expect, it } from 'vitest';
import { getGradientCss, getLinearGradientVector, getSvgGradientStops } from './gradient';

describe('gradient helpers', () => {
  it('builds linear gradient css', () => {
    expect(
      getGradientCss({
        enabled: true,
        type: 'linear',
        direction: 'to right',
        colors: ['#111111', '#222222'],
      })
    ).toBe('linear-gradient(to right, #111111, #222222)');
  });

  it('builds radial gradient css', () => {
    expect(
      getGradientCss({
        enabled: true,
        type: 'radial',
        direction: '135deg',
        colors: ['#111111', '#222222'],
      })
    ).toBe('radial-gradient(circle, #111111, #222222)');
  });

  it('maps direction to svg vector', () => {
    expect(getLinearGradientVector('45deg')).toEqual({
      x1: '0%',
      y1: '100%',
      x2: '100%',
      y2: '0%',
    });
  });

  it('creates distributed svg stops', () => {
    expect(
      getSvgGradientStops({
        enabled: true,
        type: 'linear',
        direction: '135deg',
        colors: ['#111111', '#222222', '#333333'],
      })
    ).toEqual([
      { offset: '0%', color: '#111111' },
      { offset: '50%', color: '#222222' },
      { offset: '100%', color: '#333333' },
    ]);
  });
});
