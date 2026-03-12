'use client';

import type { EditorDocument } from '@/components/polygon-editor/lib';
import { getBackgroundCss } from '@/components/polygon-editor/lib';
import { Badge } from '@/components/ui/badge';
import clsx from 'clsx';

export interface PolygonPreviewProps {
  document: EditorDocument;
  clipPath: string;
  compact?: boolean;
}

export function PolygonPreview({ document, clipPath, compact = false }: PolygonPreviewProps) {
  const { backgroundImage, gradient, previewSize } = document;
  const backgroundStyle = getBackgroundCss(backgroundImage, gradient);
  const aspectRatio = `${previewSize.width} / ${previewSize.height}`;

  return (
    <div className="relative flex flex-col items-center space-y-4">
      <div className="flex w-full items-center justify-between gap-4">
        <div>
          <h3
            className={clsx(
              'font-semibold text-slate-950 dark:text-white',
              compact ? 'text-base' : 'text-lg'
            )}
          >
            实时预览
          </h3>
          <p
            className={clsx(
              'mt-1 text-slate-500 dark:text-slate-400',
              compact ? 'text-xs leading-5' : 'text-sm'
            )}
          >
            这里展示当前 clip-path 与背景组合后的最终效果，并按真实比例缩放显示。
          </p>
        </div>
        <Badge>
          {previewSize.width} × {previewSize.height}px
        </Badge>
      </div>

      <div
        className={clsx(
          'surface-panel relative w-full overflow-hidden rounded-[28px]',
          compact ? 'p-3' : 'p-4 sm:p-5'
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_58%)] dark:bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.12),transparent_58%)]" />
        <div className="canvas-grid absolute inset-0 opacity-70 dark:opacity-50" />
        <div
          className={clsx(
            'relative flex items-center justify-center rounded-[24px] border border-black/5 bg-[linear-gradient(135deg,rgba(255,255,255,0.86),rgba(241,245,249,0.7))] shadow-inner dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(15,23,42,0.9),rgba(2,6,23,0.72))]',
            compact ? 'min-h-[260px] p-4' : 'min-h-[320px] p-6'
          )}
        >
          <div className="flex w-full items-center justify-center">
            <div
              className="relative w-full max-w-[min(100%,360px)] overflow-hidden rounded-[22px] border border-white/70 shadow-[0_24px_60px_rgba(15,23,42,0.12)] dark:border-white/12 dark:shadow-[0_24px_60px_rgba(2,6,23,0.45)]"
              style={{ aspectRatio }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.2),transparent_42%)] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.04),transparent_42%)]" />
              <div className="relative h-full w-full bg-[linear-gradient(135deg,rgba(226,232,240,0.85),rgba(248,250,252,0.6))] dark:bg-[linear-gradient(135deg,rgba(30,41,59,0.92),rgba(15,23,42,0.75))]">
                <div
                  className="absolute inset-0"
                  style={{
                    ...backgroundStyle,
                    clipPath,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
