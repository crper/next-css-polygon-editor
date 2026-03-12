import type { Point } from './editor-schema';
import { MIN_VERTEX_COUNT, normalizePoints } from './geometry';

const CLIP_PATH_REGEX = /^polygon\((.*)\)$/i;
const POINT_REGEX = /^(-?\d*\.?\d+)%?\s+(-?\d*\.?\d+)%?$/;

export function serializeClipPath(points: Point[]) {
  return `polygon(${normalizePoints(points)
    .map(point => `${point.x}% ${point.y}%`)
    .join(', ')})`;
}

export function parseClipPath(value: string): Point[] {
  const trimmed = value.trim();
  const match = trimmed.match(CLIP_PATH_REGEX);

  if (!match) {
    throw new Error('仅支持 polygon(...) 格式');
  }

  const rawPoints = match[1]
    .split(',')
    .map(segment => segment.trim())
    .filter(Boolean)
    .map(segment => {
      const pointMatch = segment.match(POINT_REGEX);

      if (!pointMatch) {
        throw new Error(`无法解析顶点: ${segment}`);
      }

      return {
        x: Number.parseFloat(pointMatch[1]),
        y: Number.parseFloat(pointMatch[2]),
      };
    });

  if (rawPoints.length < MIN_VERTEX_COUNT) {
    throw new Error('polygon 至少需要 3 个顶点');
  }

  return normalizePoints(rawPoints);
}

export function tryParseClipPath(value: string) {
  try {
    return {
      ok: true as const,
      points: parseClipPath(value),
      error: null,
    };
  } catch (error) {
    return {
      ok: false as const,
      points: null,
      error: error instanceof Error ? error.message : '解析 polygon 失败',
    };
  }
}
