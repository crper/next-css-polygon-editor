'use client';

export interface GradientSettingsProps {
  settings: {
    type: string;
    direction: string;
    colors: string[];
    enabled: boolean;
  };
  onSettingChange: (field: string, value: string | string[] | boolean) => void;
  onColorChange: (index: number, color: string) => void;
}

export function GradientSettings({
  settings,
  onSettingChange,
  onColorChange,
}: GradientSettingsProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">渐变背景</h4>
        <div className="relative mr-2 inline-block w-10 align-middle select-none transition duration-200 ease-in">
          <input
            type="checkbox"
            id="gradient-toggle"
            className="toggle-checkbox absolute block h-6 w-6 cursor-pointer appearance-none rounded-full border-4 bg-white"
            checked={settings.enabled}
            onChange={e => onSettingChange('enabled', e.target.checked)}
          />
          <label
            htmlFor="gradient-toggle"
            className={`toggle-label block h-6 cursor-pointer overflow-hidden rounded-full ${settings.enabled ? 'bg-blue-500' : 'bg-gray-300'}`}
          ></label>
        </div>
      </div>

      {settings.enabled && (
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-medium">方向</label>
            <select
              className="w-full rounded-md border border-gray-300 bg-white/10 px-2 py-1 text-sm dark:border-gray-700 dark:bg-black/10"
              value={settings.direction}
              onChange={e => onSettingChange('direction', e.target.value)}
            >
              <option value="to right">从左到右</option>
              <option value="to left">从右到左</option>
              <option value="to bottom">从上到下</option>
              <option value="to top">从下到上</option>
              <option value="45deg">45度角</option>
              <option value="135deg">135度角</option>
              <option value="225deg">225度角</option>
              <option value="315deg">315度角</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium">颜色停靠点</label>
            <div className="grid grid-cols-3 gap-2">
              {settings.colors.map((color, index) => (
                <div key={index} className="space-y-1">
                  <div
                    className="h-6 w-full rounded-md border border-gray-300 dark:border-gray-700"
                    style={{ backgroundColor: color }}
                  ></div>
                  <input
                    type="text"
                    className="w-full rounded-md border border-gray-300 bg-white/10 px-2 py-1 text-xs dark:border-gray-700 dark:bg-black/10"
                    value={color}
                    onChange={e => onColorChange(index, e.target.value)}
                    placeholder="#RRGGBB"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
