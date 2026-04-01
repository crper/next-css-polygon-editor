'use client';

import type { Point } from '@/components/polygon-editor/lib';
import {
  applyScale,
  getPresetShape,
  SCALE_OPTIONS,
  SHAPE_LABELS,
  type PresetShape,
} from '@/components/polygon-editor/lib';
import { Button } from '@/components/ui/button';
import { useCallback } from 'react';
import toast from 'react-hot-toast';

export interface ShapePresetsProps {
  onApplyPreset: (points: Point[]) => void;
}

export interface ScalePresetsProps {
  currentWidth?: number;
  currentHeight?: number;
  onSizeChange: (width: number, height: number) => void;
}

export function ShapePresets({ onApplyPreset }: ShapePresetsProps) {
  const handleApplyPreset = useCallback(
    (shapeName: PresetShape) => {
      requestAnimationFrame(() => {
        onApplyPreset(getPresetShape(shapeName));
        toast.success(`已套用 ${SHAPE_LABELS[shapeName]} 形状`);
      });
    },
    [onApplyPreset]
  );

  return (
    <div className="inspector-grid inspector-grid-2">
      {(Object.keys(SHAPE_LABELS) as PresetShape[]).map(shape => (
        <Button
          key={shape}
          variant="outline"
          size="sm"
          className="w-full justify-center"
          onClick={() => handleApplyPreset(shape)}
        >
          {SHAPE_LABELS[shape]}
        </Button>
      ))}
    </div>
  );
}

export function ScalePresets({
  currentWidth = 300,
  currentHeight = 300,
  onSizeChange,
}: ScalePresetsProps) {
  const currentSize = { width: currentWidth, height: currentHeight };

  return (
    <div className="space-y-2.5">
      <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
        基于当前宽高等比缩放，适合快速放大或缩小预览。
      </p>
      <div className="inspector-grid inspector-grid-2">
        {SCALE_OPTIONS.map(option => (
          <Button
            key={option.name}
            variant="outline"
            size="sm"
            className="w-full justify-center"
            onClick={() => {
              const nextSize = applyScale(currentSize, option.scale);
              onSizeChange(nextSize.width, nextSize.height);
              toast.success(`预览已缩放到 ${option.name}`);
            }}
          >
            {option.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
