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
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h4 className="text-sm font-medium">预览尺寸</h4>
        <p className="max-w-[16rem] text-right text-xs leading-5 text-slate-500 dark:text-slate-400">
          输入宽高后，预览会立即更新。支持 50–1000 px。
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
