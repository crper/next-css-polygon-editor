'use client';

import type { Point } from '@/components/polygon-editor/lib';
import { Badge } from '@/components/ui/badge';
import { motion } from 'motion/react';
import type { MouseEvent, PointerEvent } from 'react';

export interface PolygonVertexProps {
  point: Point;
  index: number;
  isActive: boolean;
  showLabel?: boolean;
  onPointerDown: (event: PointerEvent<HTMLDivElement>, index: number) => void;
  onContextMenu: (event: MouseEvent<HTMLDivElement>, index: number) => void;
}

export function PolygonVertex({
  point,
  index,
  isActive,
  showLabel = false,
  onPointerDown,
  onContextMenu,
}: PolygonVertexProps) {
  const coordinateLabel = `${point.x.toFixed(1)}%, ${point.y.toFixed(1)}%`;

  return (
    <motion.div
      className={
        isActive
          ? 'absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-white/70 bg-rose-500 shadow-[0_0_0_4px_rgba(244,63,94,0.22),0_10px_24px_rgba(244,63,94,0.28)] dark:border-slate-950/70 dark:bg-rose-400 dark:shadow-[0_0_0_4px_rgba(251,113,133,0.22),0_10px_24px_rgba(244,63,94,0.22)]'
          : 'absolute h-4.5 w-4.5 -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-white/80 bg-blue-600 shadow-[0_8px_18px_rgba(37,99,235,0.24)] transition-colors hover:bg-blue-500 dark:border-slate-950/80 dark:bg-blue-400 dark:shadow-[0_8px_18px_rgba(59,130,246,0.22)] dark:hover:bg-blue-300'
      }
      style={{
        left: `${point.x}%`,
        top: `${point.y}%`,
        touchAction: 'none',
        cursor: 'grab',
      }}
      onPointerDown={event => onPointerDown(event, index)}
      onContextMenu={event => onContextMenu(event, index)}
      animate={{
        scale: isActive ? 1.25 : 1,
      }}
      whileHover={{ scale: isActive ? 1.28 : 1.16 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      role="button"
      tabIndex={0}
      aria-label={`顶点 ${index + 1}`}
    >
      <motion.div
        className="absolute -top-12 left-1/2 flex min-w-max -translate-x-1/2 transform flex-col items-center gap-1"
        initial={{ opacity: 0, y: 2 }}
        whileHover={{ opacity: 1, y: 0 }}
        animate={{ opacity: isActive || showLabel ? 1 : 0, y: isActive || showLabel ? 0 : 2 }}
      >
        <Badge
          className={
            isActive ? 'bg-rose-500/10 text-rose-700 dark:bg-rose-400/10 dark:text-rose-200' : ''
          }
        >
          P{index + 1}
        </Badge>
        {isActive ? (
          <div className="rounded-lg bg-white/95 px-2 py-1 text-[10px] font-medium text-slate-500 shadow-sm dark:bg-slate-950/90 dark:text-slate-400">
            {coordinateLabel}
          </div>
        ) : null}
      </motion.div>
    </motion.div>
  );
}
