'use client';

import type { Point } from '@/components/polygon-editor/lib';
import { motion } from 'motion/react';
import { useState, type MouseEvent, type PointerEvent } from 'react';

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
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const coordinateLabel = `${point.x.toFixed(1)}%, ${point.y.toFixed(1)}%`;
  const shouldShowTooltip = showLabel || isActive || isHovered || isPressed;

  return (
    <motion.div
      className={
        isActive
          ? 'absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-white/70 bg-rose-500 shadow-[0_0_0_4px_rgba(244,63,94,0.2),0_10px_24px_rgba(244,63,94,0.24)] dark:border-slate-950/70 dark:bg-rose-400 dark:shadow-[0_0_0_4px_rgba(251,113,133,0.2),0_10px_24px_rgba(244,63,94,0.2)]'
          : 'absolute h-4.5 w-4.5 -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-white/80 bg-blue-600 shadow-[0_6px_16px_rgba(37,99,235,0.22)] transition-colors hover:bg-blue-500 dark:border-slate-950/80 dark:bg-blue-400 dark:shadow-[0_6px_16px_rgba(59,130,246,0.2)] dark:hover:bg-blue-300'
      }
      style={{
        left: `${point.x}%`,
        top: `${point.y}%`,
        touchAction: 'none',
        cursor: 'grab',
      }}
      onPointerDown={event => {
        setIsPressed(true);
        onPointerDown(event, index);
      }}
      onPointerUp={() => setIsPressed(false)}
      onPointerCancel={() => setIsPressed(false)}
      onPointerLeave={() => setIsPressed(false)}
      onContextMenu={event => onContextMenu(event, index)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onFocus={() => setIsHovered(true)}
      onBlur={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      animate={{
        scale: isActive ? 1.22 : 1,
      }}
      whileHover={{ scale: isActive ? 1.24 : 1.12 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      role="button"
      tabIndex={0}
      aria-label={`顶点 ${index + 1}`}
    >
      <motion.div
        className="pointer-events-none absolute -top-10 left-1/2 flex min-w-max -translate-x-1/2 transform flex-col items-center gap-1"
        initial={{ opacity: 0, y: 2 }}
        animate={{ opacity: shouldShowTooltip ? 1 : 0, y: shouldShowTooltip ? 0 : 2 }}
        transition={{ duration: 0.16, ease: 'easeOut' }}
      >
        <div
          className={
            isActive
              ? 'rounded-full border border-rose-200/70 bg-white/96 px-2 py-0.5 text-[10px] font-semibold text-rose-600 shadow-[0_6px_16px_rgba(244,63,94,0.16)] dark:border-rose-400/20 dark:bg-slate-950/92 dark:text-rose-200'
              : 'rounded-full border border-slate-200/70 bg-white/94 px-2 py-0.5 text-[10px] font-medium text-slate-600 shadow-[0_6px_14px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-slate-950/90 dark:text-slate-300'
          }
        >
          P{index + 1}
        </div>
        {isActive ? (
          <div className="rounded-md bg-white/96 px-2 py-1 text-[10px] font-medium text-slate-500 shadow-[0_8px_18px_rgba(15,23,42,0.08)] dark:bg-slate-950/92 dark:text-slate-400">
            {coordinateLabel}
          </div>
        ) : null}
      </motion.div>
    </motion.div>
  );
}
