'use client';

import { Point } from '@/hooks/usePolygon';
import { useCallback } from 'react';
import toast from 'react-hot-toast';

export interface PresetsSettingsProps {
  onApplyPreset: (points: Point[]) => void;
  currentWidth?: number;
  currentHeight?: number;
  onSizeChange?: (width: number, height: number) => void;
}

export function PresetsSettings({
  onApplyPreset,
  currentWidth = 300,
  currentHeight = 300,
  onSizeChange,
}: PresetsSettingsProps) {
  const getPresetShape = useCallback((shapeName: string): Point[] => {
    switch (shapeName) {
      case 'square':
        return [
          { x: 10, y: 10 },
          { x: 90, y: 10 },
          { x: 90, y: 90 },
          { x: 10, y: 90 },
        ];
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
        return Array.from({ length: 12 }, (_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          return {
            x: 50 + 40 * Math.cos(angle),
            y: 50 + 40 * Math.sin(angle),
          };
        });
      default:
        return [];
    }
  }, []);

  const handleApplyPreset = useCallback(
    (shapeName: string) => {
      requestAnimationFrame(() => {
        const points = getPresetShape(shapeName);
        onApplyPreset(points);
      });
    },
    [getPresetShape, onApplyPreset]
  );

  const shapeNames: Record<string, string> = {
    square: '正方形',
    triangle: '三角形',
    pentagon: '五边形',
    hexagon: '六边形',
    star: '五角星',
    circle: '圆形',
  };

  const presets = [
    { name: '16:9', width: 320, height: 180 },
    { name: '4:3', width: 320, height: 240 },
    { name: '1:1', width: 300, height: 300 },
    { name: '3:4', width: 240, height: 320 },
    { name: '9:16', width: 180, height: 320 },
    { name: '21:9', width: 420, height: 180 },
  ];

  const scaleOptions = [
    { name: '0.5x', scale: 0.5 },
    { name: '1x', scale: 1 },
    { name: '1.5x', scale: 1.5 },
    { name: '2x', scale: 2 },
  ];

  const applyPreset = (preset: { name: string; width: number; height: number }) => {
    if (onSizeChange) {
      onSizeChange(preset.width, preset.height);
      toast.success(`已应用 ${preset.name} 比例`);
    }
  };

  const applyScale = (scale: number) => {
    if (onSizeChange) {
      const newWidth = Math.round(currentWidth * scale);
      const newHeight = Math.round(currentHeight * scale);

      const finalWidth = Math.min(Math.max(newWidth, 50), 1000);
      const finalHeight = Math.min(Math.max(newHeight, 50), 1000);

      onSizeChange(finalWidth, finalHeight);
      toast.success(`已缩放至 ${scale}x`);
    }
  };

  const calculateCurrentRatio = () => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(currentWidth, currentHeight);
    const ratioWidth = currentWidth / divisor;
    const ratioHeight = currentHeight / divisor;

    if (ratioWidth > 20 || ratioHeight > 20) {
      return `${(currentWidth / currentHeight).toFixed(2)}:1`;
    }

    return `${ratioWidth}:${ratioHeight}`;
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">预设形状</h3>
        <div className="flex flex-wrap gap-2">
          {Object.keys(shapeNames).map(shape => (
            <button
              key={shape}
              onClick={() => handleApplyPreset(shape)}
              className="rounded-md bg-gray-200 px-3 py-1.5 text-sm text-gray-800 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              {shapeNames[shape]}
            </button>
          ))}
        </div>
      </div>

      {onSizeChange && (
        <>
          <div className="space-y-2">
            <h3 className="text-sm font-medium">预设比例</h3>
            <div className="flex flex-wrap gap-2">
              {presets.map(preset => (
                <button
                  key={preset.name}
                  onClick={() => applyPreset(preset)}
                  className="rounded-md bg-gray-200 px-3 py-1.5 text-sm text-gray-800 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">缩放</h3>
            <div className="flex flex-wrap gap-2">
              {scaleOptions.map(option => (
                <button
                  key={option.name}
                  onClick={() => applyScale(option.scale)}
                  className="rounded-md bg-gray-200 px-3 py-1.5 text-sm text-gray-800 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                >
                  {option.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">当前比例:</span>
            <span className="rounded-md bg-blue-100 px-2 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              {calculateCurrentRatio()}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
