'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface SizeSettingsProps {
  width: number;
  height: number;
  onChange: (width: number, height: number) => void;
}

function clampSize(value: number) {
  return Math.min(1000, Math.max(50, value));
}

export function SizeSettings({ width, height, onChange }: SizeSettingsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <h4 className="text-sm font-medium">预览尺寸</h4>
        <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
          输入宽高后，预览会立即更新。支持 50–1000 px。
        </p>
      </div>
      <div className="inspector-grid inspector-grid-2">
        <div>
          <Label>宽度 (px)</Label>
          <Input
            type="number"
            value={width}
            min={50}
            max={1000}
            onChange={event => {
              const value = Number.parseInt(event.target.value, 10);
              if (!Number.isNaN(value)) {
                onChange(clampSize(value), height);
              }
            }}
          />
        </div>
        <div>
          <Label>高度 (px)</Label>
          <Input
            type="number"
            value={height}
            min={50}
            max={1000}
            onChange={event => {
              const value = Number.parseInt(event.target.value, 10);
              if (!Number.isNaN(value)) {
                onChange(width, clampSize(value));
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
