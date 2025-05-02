'use client';

import { Point } from '@/hooks/usePolygon';

export interface VertexSettingsProps {
  points: Point[];
  onUpdatePoint: (index: number, point: Point) => void;
  onResetPolygon: () => void;
}

export function VertexSettings({ points, onUpdatePoint, onResetPolygon }: VertexSettingsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
        {points.map((point, index) => (
          <div
            key={`point-${index}`}
            className="rounded-md border border-gray-200 bg-white/10 p-2 shadow-sm dark:border-gray-700 dark:bg-black/10"
          >
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-medium">顶点 {index + 1}</span>
              <span className="rounded-full bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                {index}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <div>
                <label className="mb-1 block text-xs">X (%)</label>
                <input
                  type="number"
                  className="w-full rounded border border-gray-300 bg-white/10 px-2 py-1 text-xs dark:border-gray-700 dark:bg-black/10"
                  value={point.x}
                  min={0}
                  max={100}
                  step={0.1}
                  onChange={e => {
                    const value = parseFloat(e.target.value);
                    if (!isNaN(value)) {
                      onUpdatePoint(index, { ...point, x: value });
                    }
                  }}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs">Y (%)</label>
                <input
                  type="number"
                  className="w-full rounded border border-gray-300 bg-white/10 px-2 py-1 text-xs dark:border-gray-700 dark:bg-black/10"
                  value={point.y}
                  min={0}
                  max={100}
                  step={0.1}
                  onChange={e => {
                    const value = parseFloat(e.target.value);
                    if (!isNaN(value)) {
                      onUpdatePoint(index, { ...point, y: value });
                    }
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={onResetPolygon}
          className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          重置多边形
        </button>
      </div>
    </div>
  );
}
