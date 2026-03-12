'use client';

import type { GradientSettings as GradientSettingsValue } from '@/components/polygon-editor/lib';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

type EditableGradientField = 'enabled' | 'direction' | 'type';

const GRADIENT_TYPE_OPTIONS = [
  { value: 'linear', label: '线性' },
  { value: 'radial', label: '径向' },
] as const;

const LINEAR_DIRECTION_OPTIONS = [
  { value: 'to right', label: '从左到右' },
  { value: 'to left', label: '从右到左' },
  { value: 'to bottom', label: '从上到下' },
  { value: 'to top', label: '从下到上' },
  { value: '45deg', label: '45 度角' },
  { value: '135deg', label: '135 度角' },
  { value: '225deg', label: '225 度角' },
  { value: '315deg', label: '315 度角' },
] as const;

const RADIAL_DIRECTION_OPTIONS = [{ value: '135deg', label: '居中扩散' }] as const;

function getDirectionOptions(type: GradientSettingsValue['type']) {
  return type === 'radial' ? RADIAL_DIRECTION_OPTIONS : LINEAR_DIRECTION_OPTIONS;
}

function getSafeDirection(type: GradientSettingsValue['type'], direction: string) {
  const options = getDirectionOptions(type);
  return options.some(option => option.value === direction) ? direction : options[0].value;
}

function getGradientTypeDescription(type: GradientSettingsValue['type']) {
  return type === 'radial' ? '颜色从中心向外扩散。' : '颜色沿方向线性过渡。';
}

function getGradientPreviewBackground(type: GradientSettingsValue['type'], colors: string[]) {
  const previewColors = colors.length > 0 ? colors.join(', ') : '#6366f1, #8b5cf6, #d946ef';
  return type === 'radial'
    ? `radial-gradient(circle, ${previewColors})`
    : `linear-gradient(135deg, ${previewColors})`;
}

function getDirectionLabel(type: GradientSettingsValue['type'], direction: string) {
  const matched = getDirectionOptions(type).find(option => option.value === direction);
  return matched?.label ?? '默认方向';
}

function GradientTypeSelector({
  type,
  onChange,
}: {
  type: GradientSettingsValue['type'];
  onChange: (value: GradientSettingsValue['type']) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h5 className="text-sm font-medium">渐变类型</h5>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {getGradientTypeDescription(type)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {GRADIENT_TYPE_OPTIONS.map(option => (
            <button
              key={option.value}
              type="button"
              className={
                type === option.value
                  ? 'rounded-full bg-slate-950 px-3 py-1.5 text-xs font-medium text-white shadow-sm dark:bg-white dark:text-slate-950'
                  : 'surface-chip px-3 py-1.5 text-xs font-medium hover:bg-white dark:hover:bg-white/10'
              }
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function GradientDirectionField({
  type,
  direction,
  onChange,
}: {
  type: GradientSettingsValue['type'];
  direction: string;
  onChange: (value: string) => void;
}) {
  const options = getDirectionOptions(type);

  return (
    <div>
      <Label>方向</Label>
      <select
        className="surface-input"
        value={direction}
        onChange={event => onChange(event.target.value)}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ColorStopCard({
  color,
  index,
  onChange,
}: {
  color: string;
  index: number;
  onChange: (value: string) => void;
}) {
  return (
    <div className="surface-panel space-y-2 p-3">
      <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
        <span>颜色 {index + 1}</span>
        <Badge>{color}</Badge>
      </div>
      <div
        className="h-8 w-full rounded-lg border border-black/5 dark:border-white/10"
        style={{ backgroundColor: color }}
      />
      <Input
        type="text"
        className="px-2 py-1 text-xs"
        value={color}
        onChange={event => onChange(event.target.value)}
        placeholder="#RRGGBB"
      />
    </div>
  );
}

function GradientSummary({ type, direction, colors }: GradientSettingsValue) {
  return (
    <div className="surface-soft flex items-center gap-3 rounded-2xl p-3">
      <div
        className="h-12 w-16 shrink-0 rounded-xl border border-white/50 shadow-sm dark:border-white/10"
        style={{ background: getGradientPreviewBackground(type, colors) }}
      />
      <div className="min-w-0 space-y-1 text-xs text-slate-500 dark:text-slate-400">
        <p className="font-medium text-slate-700 dark:text-slate-200">
          {type === 'radial' ? '径向渐变' : '线性渐变'}
        </p>
        <p>方向：{getDirectionLabel(type, direction)}</p>
      </div>
    </div>
  );
}

export interface GradientSettingsProps {
  settings: GradientSettingsValue;
  onSettingChange: <K extends EditableGradientField>(
    field: K,
    value: GradientSettingsValue[K]
  ) => void;
  onGradientTypeChange: (type: GradientSettingsValue['type']) => void;
  onColorChange: (index: number, color: string) => void;
}

export function GradientSettings({
  settings,
  onSettingChange,
  onGradientTypeChange,
  onColorChange,
}: GradientSettingsProps) {
  const safeDirection = getSafeDirection(settings.type, settings.direction);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h4 className="text-sm font-medium">渐变背景</h4>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            没有背景图时可直接用渐变生成预览背景。
          </p>
        </div>
        <Switch
          checked={settings.enabled}
          onCheckedChange={checked => onSettingChange('enabled', checked)}
          aria-label="切换渐变背景"
        />
      </div>

      {settings.enabled ? (
        <div className="space-y-3">
          <GradientSummary {...settings} direction={safeDirection} />
          <GradientTypeSelector type={settings.type} onChange={onGradientTypeChange} />
          <GradientDirectionField
            type={settings.type}
            direction={safeDirection}
            onChange={value => onSettingChange('direction', value)}
          />
          <div className="space-y-2">
            <Label>颜色停靠点</Label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {settings.colors.map((color, index) => (
                <ColorStopCard
                  key={index}
                  color={color}
                  index={index}
                  onChange={value => onColorChange(index, value)}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
