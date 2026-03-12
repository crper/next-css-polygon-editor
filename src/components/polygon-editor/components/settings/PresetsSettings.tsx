'use client';

import type { Point } from '@/components/polygon-editor/lib';
import {
  applyScale,
  getAspectRatioLabel,
  getPresetShape,
  PRESET_ASPECT_RATIOS,
  SCALE_OPTIONS,
  SHAPE_LABELS,
  type PresetShape,
} from '@/components/polygon-editor/lib';
import { Button } from '@/components/ui/button';
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
  const handleApplyPreset = useCallback(
    (shapeName: PresetShape) => {
      requestAnimationFrame(() => {
        onApplyPreset(getPresetShape(shapeName));
        toast.success(`已应用 ${SHAPE_LABELS[shapeName]} 预设`);
      });
    },
    [onApplyPreset]
  );

  const currentSize = { width: currentWidth, height: currentHeight };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">预设形状</h3>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(SHAPE_LABELS) as PresetShape[]).map(shape => (
            <Button
              key={shape}
              variant="outline"
              size="sm"
              onClick={() => handleApplyPreset(shape)}
            >
              {SHAPE_LABELS[shape]}
            </Button>
          ))}
        </div>
      </div>

      {onSizeChange && (
        <>
          <div className="space-y-2">
            <h3 className="text-sm font-medium">预设比例</h3>
            <div className="flex flex-wrap gap-2">
              {PRESET_ASPECT_RATIOS.map(preset => (
                <Button
                  key={preset.name}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    onSizeChange(preset.width, preset.height);
                    toast.success(`已应用 ${preset.name} 比例`);
                  }}
                >
                  {preset.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">缩放</h3>
            <div className="flex flex-wrap gap-2">
              {SCALE_OPTIONS.map(option => (
                <Button
                  key={option.name}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const nextSize = applyScale(currentSize, option.scale);
                    onSizeChange(nextSize.width, nextSize.height);
                    toast.success(`已缩放至 ${option.name}`);
                  }}
                >
                  {option.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500 dark:text-slate-400">当前比例:</span>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              {getAspectRatioLabel(currentSize)}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
