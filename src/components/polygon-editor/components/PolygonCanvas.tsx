'use client';

import { Point } from '@/hooks/usePolygon';
import { useFullscreen } from 'ahooks';
import { Maximize2, Minimize2 } from 'lucide-react';
import { MouseEvent, useCallback, useEffect, useMemo, useRef } from 'react';
import { PolygonEdge, PolygonRenderer, PolygonVertex } from './render';

/**
 * 多边形画布组件属性
 */
export interface PolygonCanvasProps {
  points: Point[];
  activePointIndex: number | null;
  isDragging: boolean;
  onPointDragStart: (index: number) => void;
  onPointDragEnd: () => void;
  onPointMove: (point: Point) => void;
  onPointAdd: (point: Point, insertIndex?: number) => void;
  onPointRemove: (index: number) => void;
}

/**
 * 多边形画布组件
 * 提供可视化编辑多边形顶点的功能
 */
export function PolygonCanvas({
  points,
  activePointIndex,
  isDragging,
  onPointDragStart,
  onPointDragEnd,
  onPointMove,
  onPointAdd,
  onPointRemove,
}: PolygonCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  // 使用ahooks的useFullscreen钩子
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(canvasRef);

  // 计算多边形的边线
  const edges = useMemo(() => {
    if (points.length < 2) return [];

    return points.map((point, index) => {
      const nextIndex = (index + 1) % points.length;
      const nextPoint = points[nextIndex];
      return {
        start: point,
        end: nextPoint,
        index,
      };
    });
  }, [points]);

  // 处理边线点击事件 - 在边线上添加新顶点
  const handleEdgeClick = useCallback(
    (e: MouseEvent<SVGLineElement>, edgeIndex: number, clickPoint: Point) => {
      if (isDragging) return;

      // 检查是否点击了已有的点附近
      const clickedNearPoint = points.some(point => {
        const distance = Math.sqrt(
          Math.pow(point.x - clickPoint.x, 2) + Math.pow(point.y - clickPoint.y, 2)
        );
        return distance < 5; // 5%的容差范围
      });

      if (clickedNearPoint) return;

      // 在边的终点索引位置插入新点（考虑到数组循环）
      const insertIndex = (edgeIndex + 1) % points.length;
      // 使用addPoint函数，传入insertIndex参数
      onPointAdd(clickPoint, insertIndex);
    },
    [isDragging, points, onPointAdd]
  );

  // 处理画布点击事件 - 仅处理初始化时的点击
  const handleCanvasClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!canvasRef.current || isDragging) return;

      // 只有当没有点时，才允许直接点击画布添加点
      if (points.length === 0) {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        onPointAdd({ x, y });
      }
    },
    [canvasRef, isDragging, points.length, onPointAdd]
  );

  // 处理鼠标移动事件 - 拖拽顶点
  useEffect(() => {
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      if (!isDragging || activePointIndex === null || !canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      // 确保坐标在0-100范围内
      const clampedX = Math.max(0, Math.min(100, x));
      const clampedY = Math.max(0, Math.min(100, y));

      // 使用requestAnimationFrame优化拖拽性能
      requestAnimationFrame(() => {
        onPointMove({ x: clampedX, y: clampedY });
      });
    };

    const handleMouseUp = () => {
      if (isDragging) {
        onPointDragEnd();
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true }); // 添加passive标志提高性能
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, activePointIndex, onPointMove, onPointDragEnd]);

  // 处理顶点右键点击 - 删除顶点
  const handlePointContextMenu = useCallback(
    (e: MouseEvent<HTMLDivElement>, index: number) => {
      e.preventDefault();
      onPointRemove(index);
    },
    [onPointRemove]
  );

  return (
    <div className="w-full">
      <div
        ref={canvasRef}
        className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900' : 'h-[400px] w-full'} group cursor-crosshair rounded-lg border-2 border-gray-300 bg-white/10 backdrop-blur-sm transition-all duration-300 hover:border-blue-400 dark:border-gray-700 dark:bg-black/10 dark:hover:border-blue-600`}
        onClick={handleCanvasClick}
      >
        {/* 全屏切换按钮 */}
        <button
          onClick={e => {
            e.stopPropagation(); // 阻止事件冒泡，避免触发画布点击事件
            toggleFullscreen();
          }}
          className="absolute top-2 right-2 z-10 rounded-md bg-gray-800/70 p-1.5 text-white transition-colors hover:bg-gray-700"
          aria-label={isFullscreen ? '退出全屏' : '进入全屏'}
          title={isFullscreen ? '退出全屏' : '进入全屏'}
        >
          {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </button>

        {/* 使用div渲染多边形，替代SVG实现 */}
        <PolygonRenderer points={points} isActive={true} />

        {/* 渲染多边形边线 */}
        <svg className="absolute inset-0 h-full w-full">
          {edges.map(edge => (
            <PolygonEdge key={`edge-${edge.index}`} {...edge} onEdgeClick={handleEdgeClick} />
          ))}
        </svg>

        {/* 绘制顶点 */}
        {points.map((point, index) => (
          <PolygonVertex
            key={`vertex-${index}`}
            point={point}
            index={index}
            isActive={activePointIndex === index}
            onDragStart={onPointDragStart}
            onContextMenu={handlePointContextMenu}
          />
        ))}
      </div>

      <div className="mt-4 space-y-4">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <p>点击画布添加顶点 | 拖拽顶点移动 | 右键点击顶点删除 | 点击预设形状快速创建</p>
        </div>
      </div>
    </div>
  );
}
