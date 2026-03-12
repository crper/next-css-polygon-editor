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
        <h4 className="text-sm font-medium">背景图片</h4>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          填写图片 URL 后，预览与导出的 CSS 背景都会优先使用图片；留空时会回退到渐变或默认背景。
        </p>
      </div>
      <div>
        <Label>背景图 URL</Label>
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
