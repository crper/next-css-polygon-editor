export interface Point {
  x: number;
  y: number;
}

export interface PreviewSize {
  width: number;
  height: number;
}

export type GradientType = 'linear' | 'radial';

export interface GradientSettings {
  enabled: boolean;
  type: GradientType;
  direction: string;
  colors: string[];
}

export interface EditorDocument {
  points: Point[];
  previewSize: PreviewSize;
  backgroundImage: string;
  gradient: GradientSettings;
}

export const DEFAULT_POLYGON: Point[] = [
  { x: 10, y: 10 },
  { x: 90, y: 10 },
  { x: 90, y: 90 },
  { x: 10, y: 90 },
];

export const DEFAULT_PREVIEW_SIZE: PreviewSize = {
  width: 300,
  height: 300,
};

export const DEFAULT_GRADIENT_SETTINGS: GradientSettings = {
  type: 'linear',
  direction: '135deg',
  colors: ['#6366f1', '#8b5cf6', '#d946ef'],
  enabled: false,
};

const MIN_POINT_VALUE = 0;
const MAX_POINT_VALUE = 100;
const MIN_PREVIEW_SIZE = 50;
const MAX_PREVIEW_SIZE = 1000;
const MIN_VERTEX_COUNT = 3;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function roundCoordinate(value: number) {
  return Number.parseFloat(value.toFixed(3));
}

function normalizePoint(point: Point): Point {
  return {
    x: roundCoordinate(clamp(point.x, MIN_POINT_VALUE, MAX_POINT_VALUE)),
    y: roundCoordinate(clamp(point.y, MIN_POINT_VALUE, MAX_POINT_VALUE)),
  };
}

function normalizePoints(points: Point[]) {
  if (points.length < MIN_VERTEX_COUNT) {
    return DEFAULT_POLYGON;
  }

  return points.map(normalizePoint);
}

function normalizePreviewSize(size: PreviewSize): PreviewSize {
  return {
    width: clamp(Math.round(size.width), MIN_PREVIEW_SIZE, MAX_PREVIEW_SIZE),
    height: clamp(Math.round(size.height), MIN_PREVIEW_SIZE, MAX_PREVIEW_SIZE),
  };
}

function normalizeGradientSettings(settings?: Partial<GradientSettings>): GradientSettings {
  const colors = settings?.colors?.filter(
    color => typeof color === 'string' && color.trim().length > 0
  );

  return {
    enabled: Boolean(settings?.enabled),
    type: settings?.type === 'radial' ? 'radial' : 'linear',
    direction:
      typeof settings?.direction === 'string' && settings.direction.trim().length > 0
        ? settings.direction
        : DEFAULT_GRADIENT_SETTINGS.direction,
    colors:
      colors && colors.length > 0 ? colors.slice(0, 5) : [...DEFAULT_GRADIENT_SETTINGS.colors],
  };
}

export function createDefaultEditorDocument(
  overrides: Partial<EditorDocument> = {}
): EditorDocument {
  return normalizeEditorDocument({
    points: DEFAULT_POLYGON,
    previewSize: DEFAULT_PREVIEW_SIZE,
    backgroundImage: '',
    gradient: DEFAULT_GRADIENT_SETTINGS,
    ...overrides,
  });
}

export function normalizeEditorDocument(document: Partial<EditorDocument>): EditorDocument {
  return {
    points: normalizePoints(document.points ?? DEFAULT_POLYGON),
    previewSize: normalizePreviewSize(document.previewSize ?? DEFAULT_PREVIEW_SIZE),
    backgroundImage:
      typeof document.backgroundImage === 'string' ? document.backgroundImage.trim() : '',
    gradient: normalizeGradientSettings(document.gradient),
  };
}

export function arePointsEqual(a: Point[], b: Point[]) {
  return (
    a.length === b.length &&
    a.every((point, index) => point.x === b[index]?.x && point.y === b[index]?.y)
  );
}

export function areGradientSettingsEqual(a: GradientSettings, b: GradientSettings) {
  return (
    a.enabled === b.enabled &&
    a.type === b.type &&
    a.direction === b.direction &&
    a.colors.length === b.colors.length &&
    a.colors.every((color, index) => color === b.colors[index])
  );
}

export function areEditorDocumentsEqual(a: EditorDocument, b: EditorDocument) {
  return (
    arePointsEqual(a.points, b.points) &&
    a.previewSize.width === b.previewSize.width &&
    a.previewSize.height === b.previewSize.height &&
    a.backgroundImage === b.backgroundImage &&
    areGradientSettingsEqual(a.gradient, b.gradient)
  );
}
