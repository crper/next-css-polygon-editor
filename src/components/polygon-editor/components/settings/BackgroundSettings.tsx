'use client';

export interface BackgroundSettingsProps {
  backgroundImage: string;
  onChange: (url: string) => void;
}

export function BackgroundSettings({ backgroundImage, onChange }: BackgroundSettingsProps) {
  return (
    <div>
      <h4 className="mb-2 text-sm font-medium">背景设置</h4>
      <div>
        <label className="mb-1 block text-xs">背景图片 URL</label>
        <input
          type="text"
          className="w-full rounded border border-gray-300 bg-white/10 px-2 py-1 text-sm dark:border-gray-700 dark:bg-black/10"
          placeholder="输入图片URL"
          value={backgroundImage}
          onChange={e => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
