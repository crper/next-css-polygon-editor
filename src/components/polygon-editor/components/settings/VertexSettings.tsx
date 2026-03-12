'use client';

import type { Point } from '@/components/polygon-editor/lib';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface VertexSettingsProps {
  points: Point[];
  activePointIndex: number | null;
  onSelectPoint: (index: number | null) => void;
  onUpdatePoint: (index: number, point: Point) => void;
  onResetPolygon: () => void;
}

function clampPercentage(value: number) {
  return Math.min(100, Math.max(0, value));
}

function VertexField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <Input
        type="number"
        className="px-2 py-1 text-xs"
        value={Number.isFinite(value) ? value : ''}
        min={0}
        max={100}
        step={0.1}
        onChange={event => {
          const nextValue = Number.parseFloat(event.target.value);
          if (!Number.isNaN(nextValue)) {
            onChange(clampPercentage(nextValue));
          }
        }}
      />
    </div>
  );
}

export function VertexSettings({
  points,
  activePointIndex,
  onSelectPoint,
  onUpdatePoint,
  onResetPolygon,
}: VertexSettingsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-1">
        {points.map((point, index) => {
          const active = activePointIndex === index;

          return (
            <button
              key={`point-${index}`}
              type="button"
              onClick={() => onSelectPoint(index)}
              className={
                active
                  ? 'surface-panel border-blue-500/40 bg-blue-50/70 p-3 text-left shadow-sm dark:border-blue-400/30 dark:bg-blue-500/10'
                  : 'surface-panel p-3 text-left shadow-sm'
              }
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      顶点 {index + 1}
                    </span>
                    {active ? (
                      <Badge className="bg-blue-600/10 text-blue-700 dark:bg-blue-400/10 dark:text-blue-200">
                        当前选中
                      </Badge>
                    ) : null}
                  </div>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    对应画布中的 P{index + 1}
                  </p>
                </div>
                <Badge>
                  {point.x.toFixed(1)}, {point.y.toFixed(1)}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2" onClick={event => event.stopPropagation()}>
                <VertexField
                  label="X (%)"
                  value={point.x}
                  onChange={value => onUpdatePoint(index, { ...point, x: value })}
                />
                <VertexField
                  label="Y (%)"
                  value={point.y}
                  onChange={value => onUpdatePoint(index, { ...point, y: value })}
                />
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
          点击任意卡片即可与画布中的顶点高亮联动，表单修改会立即同步到画布。
        </p>
        <Button onClick={onResetPolygon}>重置为默认多边形</Button>
      </div>
    </div>
  );
}
