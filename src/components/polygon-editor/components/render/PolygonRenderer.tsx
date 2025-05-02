'use client';

import { Point } from '@/hooks/usePolygon';
import { useMemo } from 'react';

/**
 * 多边形渲染器组件属性
 */
export interface PolygonRendererProps {
  points: Point[];
  cornerRadius?: number;
  isActive?: boolean;
}

/**
 * 多边形渲染器组件
 * 使用div+CSS实现多边形渲染，支持阴影和圆角效果
 */
export function PolygonRenderer({
  points,
  cornerRadius = 0,
  isActive = false,
}: PolygonRendererProps) {
  // 生成CSS clip-path值
  const clipPathValue = useMemo(() => {
    return `polygon(${points.map(p => `${p.x}% ${p.y}%`).join(', ')})`;
  }, [points]);

  // 注意：CSS clip-path会导致borderRadius和boxShadow失效
  // 因此我们创建两个div：一个用于显示形状，一个用于显示阴影
  return (
    <>
      {/* 底层div - 用于显示阴影效果 */}
      {cornerRadius > 0 || isActive ? (
        <div
          className="absolute inset-0 h-full w-full transition-all duration-300"
          style={{
            clipPath: clipPathValue,
            background: 'transparent',
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.25))',
            transform: 'translateY(2px)', // 轻微偏移以增强阴影效果
          }}
        />
      ) : null}

      {/* 主要div - 显示多边形 */}
      <div
        className={`absolute inset-0 h-full w-full transition-all duration-300`}
        style={{
          clipPath: clipPathValue,
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))',
          border: '2px solid #3b82f6',
        }}
      />
    </>
  );
}
