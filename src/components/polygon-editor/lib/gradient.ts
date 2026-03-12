import type { GradientSettings } from './editor-schema';
import { DEFAULT_GRADIENT_SETTINGS } from './editor-schema';

export const DEFAULT_FILL_COLOR = '#6366f1';
export const DEFAULT_FALLBACK_BACKGROUND = 'linear-gradient(135deg, #6366f1, #8b5cf6, #d946ef)';

export interface SvgGradientStop {
  offset: string;
  color: string;
}

export function getGradientColors(settings: GradientSettings) {
  return settings.colors.length > 0 ? settings.colors : DEFAULT_GRADIENT_SETTINGS.colors;
}

export function getGradientCss(settings: GradientSettings) {
  const colors = getGradientColors(settings).join(', ');

  if (settings.type === 'radial') {
    return `radial-gradient(circle, ${colors})`;
  }

  return `linear-gradient(${settings.direction}, ${colors})`;
}

export function getBackgroundValue(backgroundImage: string, settings: GradientSettings) {
  if (backgroundImage.trim().length > 0) {
    return `url(${backgroundImage}) center / cover no-repeat`;
  }

  if (settings.enabled) {
    return getGradientCss(settings);
  }

  return DEFAULT_FALLBACK_BACKGROUND;
}

export function getBackgroundCss(backgroundImage: string, settings: GradientSettings) {
  return {
    background: getBackgroundValue(backgroundImage, settings),
  };
}

export function getSvgGradientStops(settings: GradientSettings): SvgGradientStop[] {
  const colors = getGradientColors(settings);
  const lastIndex = Math.max(colors.length - 1, 1);

  return colors.map((color, index) => ({
    color,
    offset: `${(index / lastIndex) * 100}%`,
  }));
}

export function getLinearGradientVector(direction: string) {
  switch (direction) {
    case 'to right':
      return { x1: '0%', y1: '0%', x2: '100%', y2: '0%' };
    case 'to left':
      return { x1: '100%', y1: '0%', x2: '0%', y2: '0%' };
    case 'to bottom':
      return { x1: '0%', y1: '0%', x2: '0%', y2: '100%' };
    case 'to top':
      return { x1: '0%', y1: '100%', x2: '0%', y2: '0%' };
    case '45deg':
      return { x1: '0%', y1: '100%', x2: '100%', y2: '0%' };
    case '225deg':
      return { x1: '100%', y1: '0%', x2: '0%', y2: '100%' };
    case '315deg':
      return { x1: '100%', y1: '100%', x2: '0%', y2: '0%' };
    case '135deg':
    default:
      return { x1: '0%', y1: '0%', x2: '100%', y2: '100%' };
  }
}

export function getGradientFillColor(settings: GradientSettings) {
  return getGradientColors(settings)[0] ?? DEFAULT_FILL_COLOR;
}
