'use client';

import { Point } from '@/hooks/usePolygon';
import { motion } from 'motion/react';
import { MouseEvent } from 'react';

/**
 * 多边形顶点组件属性
 */
export interface PolygonVertexProps {
  point: Point;
  index: number;
  isActive: boolean;
  onDragStart: (index: number) => void;
  onContextMenu: (e: MouseEvent<HTMLDivElement>, index: number) => void;
}

/**
 * 多边形顶点组件
 * 渲染可拖拽的多边形顶点
 */
export function PolygonVertex({
  point,
  index,
  isActive,
  onDragStart,
  onContextMenu,
}: PolygonVertexProps) {
  return (
    <motion.div
      className={`absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 transform cursor-move rounded-full ${isActive ? 'bg-red-500 ring-2 ring-red-200 dark:ring-red-800' : 'bg-blue-500 hover:bg-blue-600'}`}
      style={{
        left: `${point.x}%`,
        top: `${point.y}%`,
        boxShadow: isActive ? '0 0 0 2px white' : 'none',
      }}
      onMouseDown={() => onDragStart(index)}
      onContextMenu={e => onContextMenu(e, index)}
      animate={{
        scale: isActive ? 1.25 : 1,
      }}
      whileHover={{ scale: 1.25 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="absolute -top-6 left-1/2 -translate-x-1/2 transform rounded-md bg-gray-800 px-1.5 py-0.5 text-xs text-white shadow-sm"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        animate={{ opacity: isActive ? 1 : 0 }}
      >
        {index + 1}
      </motion.div>
    </motion.div>
  );
}
