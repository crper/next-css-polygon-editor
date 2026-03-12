import type { Point, PreviewSize } from './editor-schema';
import { DEFAULT_POLYGON } from './editor-schema';

export const MIN_VERTEX_COUNT = 3;
export const MIN_POINT_VALUE = 0;
export const MAX_POINT_VALUE = 100;
export const MIN_PREVIEW_SIZE = 50;
export const MAX_PREVIEW_SIZE = 1000;

export type PresetShape = 'square' | 'triangle' | 'pentagon' | 'hexagon' | 'star' | 'circle';

export interface PolygonEdgeSegment {
  start: Point;
  end: Point;
  index: number;
}

export interface AspectRatioPreset {
  name: string;
  width: number;
  height: number;
}

export interface ScaleOption {
  name: string;
  scale: number;
}

export const SHAPE_LABELS: Record<PresetShape, string> = {
  square: '正方形',
  triangle: '三角形',
  pentagon: '五边形',
  hexagon: '六边形',
  star: '五角星',
  circle: '圆形',
};

export const PRESET_ASPECT_RATIOS: AspectRatioPreset[] = [
  { name: '16:9', width: 320, height: 180 },
  { name: '4:3', width: 320, height: 240 },
  { name: '1:1', width: 300, height: 300 },
  { name: '3:4', width: 240, height: 320 },
  { name: '9:16', width: 180, height: 320 },
  { name: '21:9', width: 420, height: 180 },
];

export const SCALE_OPTIONS: ScaleOption[] = [
  { name: '0.5x', scale: 0.5 },
  { name: '1x', scale: 1 },
  { name: '1.5x', scale: 1.5 },
  { name: '2x', scale: 2 },
];

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function roundCoordinate(value: number) {
  return Number.parseFloat(value.toFixed(3));
}

export function clampPoint(point: Point): Point {
  return {
    x: roundCoordinate(clamp(point.x, MIN_POINT_VALUE, MAX_POINT_VALUE)),
    y: roundCoordinate(clamp(point.y, MIN_POINT_VALUE, MAX_POINT_VALUE)),
  };
}

export function normalizePoints(points: Point[]): Point[] {
  return points.map(clampPoint);
}

export function getDistance(a: Point, b: Point) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function isPointNearExistingPoint(points: Point[], point: Point, tolerance = 5) {
  return points.some(existing => getDistance(existing, point) < tolerance);
}

export function getEdges(points: Point[]): PolygonEdgeSegment[] {
  if (points.length < 2) {
    return [];
  }

  return points.map((point, index) => ({
    start: point,
    end: points[(index + 1) % points.length],
    index,
  }));
}

export function insertPoint(points: Point[], point: Point, insertIndex = points.length) {
  const nextPoints = [...points];
  const safeIndex = clamp(insertIndex, 0, nextPoints.length);
  nextPoints.splice(safeIndex, 0, clampPoint(point));
  return nextPoints;
}

export function removePointAt(points: Point[], index: number) {
  if (points.length <= MIN_VERTEX_COUNT) {
    return points;
  }

  const nextPoints = [...points];
  nextPoints.splice(index, 1);
  return nextPoints;
}

export function updatePointAt(points: Point[], index: number, point: Point) {
  const nextPoints = [...points];
  nextPoints[index] = clampPoint(point);
  return nextPoints;
}

export function nudgePoint(point: Point, deltaX: number, deltaY: number) {
  return clampPoint({
    x: point.x + deltaX,
    y: point.y + deltaY,
  });
}

export function getPointFromRect(
  rect: Pick<DOMRect, 'left' | 'top' | 'width' | 'height'>,
  clientX: number,
  clientY: number
): Point {
  return clampPoint({
    x: ((clientX - rect.left) / rect.width) * 100,
    y: ((clientY - rect.top) / rect.height) * 100,
  });
}

export function getPresetShape(shapeName: PresetShape): Point[] {
  switch (shapeName) {
    case 'square':
      return DEFAULT_POLYGON;
    case 'triangle':
      return [
        { x: 50, y: 10 },
        { x: 90, y: 90 },
        { x: 10, y: 90 },
      ];
    case 'pentagon':
      return [
        { x: 50, y: 10 },
        { x: 90, y: 40 },
        { x: 80, y: 90 },
        { x: 20, y: 90 },
        { x: 10, y: 40 },
      ];
    case 'hexagon':
      return [
        { x: 50, y: 10 },
        { x: 90, y: 30 },
        { x: 90, y: 70 },
        { x: 50, y: 90 },
        { x: 10, y: 70 },
        { x: 10, y: 30 },
      ];
    case 'star':
      return [
        { x: 50, y: 10 },
        { x: 61, y: 35 },
        { x: 90, y: 35 },
        { x: 65, y: 55 },
        { x: 75, y: 85 },
        { x: 50, y: 70 },
        { x: 25, y: 85 },
        { x: 35, y: 55 },
        { x: 10, y: 35 },
        { x: 39, y: 35 },
      ];
    case 'circle':
      return Array.from({ length: 12 }, (_, index) => {
        const angle = (index / 12) * Math.PI * 2;
        return clampPoint({
          x: 50 + 40 * Math.cos(angle),
          y: 50 + 40 * Math.sin(angle),
        });
      });
    default:
      return DEFAULT_POLYGON;
  }
}

export function clampPreviewSize(size: PreviewSize): PreviewSize {
  return {
    width: clamp(Math.round(size.width), MIN_PREVIEW_SIZE, MAX_PREVIEW_SIZE),
    height: clamp(Math.round(size.height), MIN_PREVIEW_SIZE, MAX_PREVIEW_SIZE),
  };
}

export function applyScale(size: PreviewSize, scale: number) {
  return clampPreviewSize({
    width: size.width * scale,
    height: size.height * scale,
  });
}

export function getAspectRatioLabel(size: PreviewSize) {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(size.width, size.height);
  const ratioWidth = size.width / divisor;
  const ratioHeight = size.height / divisor;

  if (ratioWidth > 20 || ratioHeight > 20) {
    return `${(size.width / size.height).toFixed(2)}:1`;
  }

  return `${ratioWidth}:${ratioHeight}`;
}
