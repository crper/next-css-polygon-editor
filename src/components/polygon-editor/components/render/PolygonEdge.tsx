'use client';

import { Point } from '@/hooks/usePolygon';
import { MouseEvent } from 'react';

/**
 * 多边形边线组件属性
 */
export interface PolygonEdgeProps {
  start: Point;
  end: Point;
  index: number;
  onEdgeClick?: (e: MouseEvent<SVGLineElement>, edgeIndex: number, point: Point) => void;
}

/**
 * 多边形边线组件
 * 渲染多边形的边线，并处理边线点击事件
 */
export function PolygonEdge({ start, end, index, onEdgeClick }: PolygonEdgeProps) {
  // 处理边线点击事件
  const handleEdgeClick = (e: MouseEvent<SVGLineElement>) => {
    if (!onEdgeClick) return;

    // 获取点击位置相对于SVG的坐标
    const svg = e.currentTarget.ownerSVGElement;
    if (!svg) return;

    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // 调用回调函数，传递边线索引和点击位置
    onEdgeClick(e, index, { x, y });
  };

  return (
    <line
      key={`edge-${index}`}
      x1={`${start.x}%`}
      y1={`${start.y}%`}
      x2={`${end.x}%`}
      y2={`${end.y}%`}
      stroke="rgba(59, 130, 246, 0.3)"
      strokeWidth="10"
      strokeLinecap="round"
      className="cursor-crosshair transition-all duration-200 hover:stroke-blue-300 hover:stroke-opacity-50"
      onClick={handleEdgeClick}
    />
  );
}
