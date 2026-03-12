'use client';

import {
  getEdges,
  getPointFromRect,
  isPointNearExistingPoint,
  nudgePoint,
  serializeClipPath,
  type Point,
} from '@/components/polygon-editor/lib';
import { Badge } from '@/components/ui/badge';
import { useFullscreen } from 'ahooks';
import clsx from 'clsx';
import { Maximize2, Minimize2, Trash2 } from 'lucide-react';
import type { KeyboardEvent, MouseEvent, PointerEvent } from 'react';
import { useCallback, useMemo, useRef } from 'react';
import { PolygonEdge, PolygonRenderer, PolygonVertex } from './render';

export interface PolygonCanvasProps {
  points: Point[];
  activePointIndex: number | null;
  isDragging: boolean;
  onSelectPoint: (index: number | null) => void;
  onPointDragStart: (index: number) => void;
  onPointDragEnd: () => void;
  onPointMove: (point: Point) => void;
  onPointAdd: (point: Point, insertIndex?: number) => void;
  onPointRemove: (index: number) => void;
  onPointNudge?: (index: number, point: Point) => void;
  className?: string;
  stageClassName?: string;
}

export function PolygonCanvas({
  points,
  activePointIndex,
  isDragging,
  onSelectPoint,
  onPointDragStart,
  onPointDragEnd,
  onPointMove,
  onPointAdd,
  onPointRemove,
  onPointNudge,
  className,
  stageClassName,
}: PolygonCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(canvasRef);
  const pointerIdRef = useRef<number | null>(null);

  const edges = useMemo(() => getEdges(points), [points]);

  const handleEdgeClick = useCallback(
    (event: MouseEvent<SVGLineElement>, edgeIndex: number, clickPoint: Point) => {
      event.stopPropagation();

      if (isDragging || isPointNearExistingPoint(points, clickPoint)) {
        return;
      }

      const insertIndex = (edgeIndex + 1) % points.length;
      onPointAdd(clickPoint, insertIndex);
      onSelectPoint(insertIndex);
    },
    [isDragging, onPointAdd, onSelectPoint, points]
  );

  const handleCanvasClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (!canvasRef.current || isDragging) {
        return;
      }

      if (points.length === 0) {
        onPointAdd(
          getPointFromRect(canvasRef.current.getBoundingClientRect(), event.clientX, event.clientY)
        );
        return;
      }

      onSelectPoint(null);
    },
    [isDragging, onPointAdd, onSelectPoint, points.length]
  );

  const handleVertexPointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>, index: number) => {
      if (!canvasRef.current) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      pointerIdRef.current = event.pointerId;
      event.currentTarget.setPointerCapture(event.pointerId);
      onPointDragStart(index);
    },
    [onPointDragStart]
  );

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!isDragging || pointerIdRef.current !== event.pointerId || !canvasRef.current) {
        return;
      }

      onPointMove(
        getPointFromRect(canvasRef.current.getBoundingClientRect(), event.clientX, event.clientY)
      );
    },
    [isDragging, onPointMove]
  );

  const handlePointerEnd = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (pointerIdRef.current !== event.pointerId) {
        return;
      }

      pointerIdRef.current = null;
      onPointDragEnd();
    },
    [onPointDragEnd]
  );

  const handlePointContextMenu = useCallback(
    (event: MouseEvent<HTMLDivElement>, index: number) => {
      event.preventDefault();
      onPointRemove(index);
    },
    [onPointRemove]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (activePointIndex === null || !onPointNudge) {
        return;
      }

      const step = event.shiftKey ? 10 : event.altKey ? 0.5 : 1;
      const currentPoint = points[activePointIndex];

      if (!currentPoint) {
        return;
      }

      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          onPointNudge(activePointIndex, nudgePoint(currentPoint, 0, -step));
          break;
        case 'ArrowDown':
          event.preventDefault();
          onPointNudge(activePointIndex, nudgePoint(currentPoint, 0, step));
          break;
        case 'ArrowLeft':
          event.preventDefault();
          onPointNudge(activePointIndex, nudgePoint(currentPoint, -step, 0));
          break;
        case 'ArrowRight':
          event.preventDefault();
          onPointNudge(activePointIndex, nudgePoint(currentPoint, step, 0));
          break;
        case 'Backspace':
        case 'Delete':
          event.preventDefault();
          onPointRemove(activePointIndex);
          break;
        default:
          break;
      }
    },
    [activePointIndex, onPointNudge, onPointRemove, points]
  );

  return (
    <div className={clsx('flex h-full min-h-0 w-full flex-col', className)}>
      <div
        ref={canvasRef}
        className={clsx(
          'group relative min-h-[420px] flex-1 overflow-hidden rounded-[24px] border border-black/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(248,250,252,0.78))] shadow-[0_18px_42px_rgba(15,23,42,0.08)] transition-all duration-300 outline-none dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(2,6,23,0.78))]',
          'hover:border-blue-400/40 dark:hover:border-blue-400/30',
          stageClassName,
          isFullscreen ? 'fixed inset-0 z-50 min-h-screen rounded-none' : 'w-full'
        )}
        onClick={handleCanvasClick}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        style={{ touchAction: 'none' }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.14),transparent_55%)]" />
        <div className="canvas-grid absolute inset-0 opacity-80 dark:opacity-60" />
        <div className="absolute inset-[10px] rounded-[18px] border border-white/70 shadow-inner dark:border-white/8" />
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.45),inset_0_-24px_50px_rgba(15,23,42,0.05)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),inset_0_-24px_50px_rgba(2,6,23,0.34)]" />

        <div className="absolute left-2.5 top-2.5 z-20 flex max-w-[calc(100%-4.75rem)] flex-wrap items-center gap-2">
          {activePointIndex !== null ? (
            <>
              <Badge>已选中顶点 {activePointIndex + 1}</Badge>
              <button
                onClick={event => {
                  event.stopPropagation();
                  onPointRemove(activePointIndex);
                }}
                className="surface-button-danger px-2.5 py-1.5"
              >
                <Trash2 size={16} />
                删除顶点
              </button>
            </>
          ) : (
            <Badge>点击顶点选中，点击边线或中点 + handle 在线段上插入新顶点</Badge>
          )}
        </div>

        <button
          onClick={event => {
            event.stopPropagation();
            toggleFullscreen();
          }}
          className="surface-button absolute right-2.5 top-2.5 z-20 rounded-full p-2"
          aria-label={isFullscreen ? '退出全屏' : '进入全屏'}
          title={isFullscreen ? '退出全屏' : '进入全屏'}
        >
          {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </button>

        <PolygonRenderer clipPath={serializeClipPath(points)} isActive={true} />

        <svg className="absolute inset-0 h-full w-full">
          {edges.map(edge => (
            <PolygonEdge key={`edge-${edge.index}`} {...edge} onEdgeClick={handleEdgeClick} />
          ))}
        </svg>

        {points.map((point, index) => (
          <PolygonVertex
            key={`vertex-${index}`}
            point={point}
            index={index}
            isActive={activePointIndex === index}
            showLabel={activePointIndex === index}
            onPointerDown={handleVertexPointerDown}
            onContextMenu={handlePointContextMenu}
          />
        ))}
      </div>
    </div>
  );
}
