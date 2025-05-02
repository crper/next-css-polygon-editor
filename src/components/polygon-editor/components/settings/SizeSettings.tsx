'use client';

export interface SizeSettingsProps {
  width: number;
  height: number;
  onChange: (width: number, height: number) => void;
}

export function SizeSettings({ width, height, onChange }: SizeSettingsProps) {
  return (
    <div>
      <h4 className="mb-2 text-sm font-medium">预览尺寸</h4>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="mb-1 block text-xs">宽度 (px)</label>
          <input
            type="number"
            className="w-full rounded border border-gray-300 bg-white/10 px-2 py-1 text-sm dark:border-gray-700 dark:bg-black/10"
            value={width}
            min={50}
            max={1000}
            onChange={e => {
              const value = parseInt(e.target.value, 10);
              if (!isNaN(value) && value >= 50) {
                onChange(value, height);
              }
            }}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs">高度 (px)</label>
          <input
            type="number"
            className="w-full rounded border border-gray-300 bg-white/10 px-2 py-1 text-sm dark:border-gray-700 dark:bg-black/10"
            value={height}
            min={50}
            max={1000}
            onChange={e => {
              const value = parseInt(e.target.value, 10);
              if (!isNaN(value) && value >= 50) {
                onChange(width, value);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
