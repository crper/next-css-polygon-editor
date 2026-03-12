'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface BackgroundSettingsProps {
  backgroundImage: string;
  onChange: (url: string) => void;
}

export function BackgroundSettings({ backgroundImage, onChange }: BackgroundSettingsProps) {
  return (
    <div className="space-y-3">
      <div>
        <h4 className="text-sm font-medium">背景设置</h4>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          支持任意图片 URL；为空时将优先使用当前渐变设置。
        </p>
      </div>
      <div>
        <Label>背景图片 URL</Label>
        <Input
          type="text"
          placeholder="https://example.com/image.jpg"
          value={backgroundImage}
          onChange={event => onChange(event.target.value.trim())}
        />
      </div>
    </div>
  );
}
