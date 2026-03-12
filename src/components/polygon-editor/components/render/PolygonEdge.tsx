'use client';

import { getPointFromRect, type Point } from '@/components/polygon-editor/lib';
import type { MouseEvent } from 'react';

export interface PolygonEdgeProps {
  start: Point;
  end: Point;
  index: number;
  onEdgeClick?: (event: MouseEvent<SVGLineElement>, edgeIndex: number, point: Point) => void;
}

export function PolygonEdge({ start, end, index, onEdgeClick }: PolygonEdgeProps) {
  const handleEdgeClick = (event: MouseEvent<SVGElement>) => {
    if (!onEdgeClick) {
      return;
    }

    const svg = event.currentTarget.ownerSVGElement;

    if (!svg) {
      return;
    }

    const point = getPointFromRect(svg.getBoundingClientRect(), event.clientX, event.clientY);

    onEdgeClick(event as MouseEvent<SVGLineElement>, index, point);
  };

  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2;

  return (
    <g className="group">
      <line
        x1={`${start.x}%`}
        y1={`${start.y}%`}
        x2={`${end.x}%`}
        y2={`${end.y}%`}
        stroke="var(--editor-edge-hit)"
        strokeWidth="18"
        strokeLinecap="round"
        className="cursor-crosshair"
        style={{ pointerEvents: 'stroke' }}
        onClick={handleEdgeClick}
      />
      <line
        x1={`${start.x}%`}
        y1={`${start.y}%`}
        x2={`${end.x}%`}
        y2={`${end.y}%`}
        stroke="var(--editor-edge)"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="pointer-events-none transition-all duration-200 group-hover:opacity-100"
        opacity="0.7"
      />
      <g
        className="cursor-crosshair opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        onClick={handleEdgeClick}
      >
        <circle
          cx={`${midX}%`}
          cy={`${midY}%`}
          r="9"
          fill="rgba(255,255,255,0.92)"
          className="dark:fill-slate-950/90"
        />
        <circle
          cx={`${midX}%`}
          cy={`${midY}%`}
          r="8"
          fill="none"
          stroke="var(--editor-edge)"
          strokeWidth="1.5"
        />
        <line
          x1={`${midX}%`}
          y1={`${midY - 1.6}%`}
          x2={`${midX}%`}
          y2={`${midY + 1.6}%`}
          stroke="var(--editor-edge-hover)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1={`${midX - 1.6}%`}
          y1={`${midY}%`}
          x2={`${midX + 1.6}%`}
          y2={`${midY}%`}
          stroke="var(--editor-edge-hover)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
    </g>
  );
}
