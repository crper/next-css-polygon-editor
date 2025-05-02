'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

/**
 * 多边形预览组件属性
 */
export interface PolygonPreviewProps {
  clipPath: string;
  backgroundImage?: string;
  width: number;
  height: number;
  gradient?: string;
  previewMode?: 'div' | 'svg';
}

/**
 * 多边形预览组件
 * 展示应用了clip-path的效果
 * 支持div和svg两种渲染模式
 */
export function PolygonPreview({
  clipPath,
  backgroundImage = '',
  width,
  height,
  gradient = '',
  previewMode: initialMode = 'div',
}: PolygonPreviewProps) {
  // 预览模式状态（div或svg）
  const [previewMode, setPreviewMode] = useState<'div' | 'svg'>(initialMode);

  // 背景样式
  const backgroundStyle = backgroundImage
    ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : gradient
      ? { background: gradient }
      : { background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #d946ef)' };

  // 移除未使用的 extractPolygonPoints 函数

  // 切换预览模式
  const togglePreviewMode = () => {
    setPreviewMode(prev => (prev === 'div' ? 'svg' : 'div'));
    toast.success(`已切换到 ${previewMode === 'div' ? 'SVG' : 'DIV'} 模式`);
  };

  // 渲染SVG模式预览
  const renderSvgPreview = () => {
    // 从 clip-path 中提取点坐标
    const pointsMatch = clipPath.match(/polygon\(([^)]+)\)/);
    if (!pointsMatch) return <div>Invalid clip-path format</div>;

    const pointsStr = pointsMatch[1];
    const pointPairs = pointsStr.split(',').map(p => p.trim());

    // 将百分比转换为实际的像素坐标
    const svgPoints = pointPairs
      .map(pair => {
        const [x, y] = pair.split(' ');
        // 将百分比转换为 0-100 范围内的数值
        const xVal = parseFloat(x);
        const yVal = parseFloat(y);
        return `${xVal} ${yVal}`;
      })
      .join(' ');

    // 生成渐变定义
    let gradientColors = ['#6366f1', '#8b5cf6', '#d946ef'];

    if (gradient) {
      if (gradient.includes('linear-gradient')) {
        // 处理完整的 linear-gradient 字符串
        const match = gradient.match(/linear-gradient\([^,]*,\s*([^,]+),\s*([^,]+),\s*([^)]+)\)/);
        if (match && match.length >= 4) {
          gradientColors = [match[1].trim(), match[2].trim(), match[3].trim()];
        }
      } else if (gradient.includes(',')) {
        // 处理纯色值列表
        gradientColors = gradient.split(',').map(c => c.trim());
        // 确保至少有三种颜色
        while (gradientColors.length < 3) {
          gradientColors.push(gradientColors[gradientColors.length - 1] || '#d946ef');
        }
      }
    }

    const gradientDef = (
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gradientColors[0]} />
          <stop offset="50%" stopColor={gradientColors[1]} />
          <stop offset="100%" stopColor={gradientColors[2]} />
        </linearGradient>
      </defs>
    );

    // 创建图片ID（如果有背景图片）
    const imageId = backgroundImage
      ? `polygon-image-${Math.random().toString(36).substring(2, 9)}`
      : '';

    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        {gradientDef}
        {backgroundImage && (
          <pattern id={imageId} patternUnits="userSpaceOnUse" width={width} height={height}>
            <image
              href={backgroundImage}
              width={width}
              height={height}
              preserveAspectRatio="xMidYMid slice"
            />
          </pattern>
        )}
        <polygon
          points={svgPoints}
          fill={backgroundImage ? `url(#${imageId})` : `url(#gradient)`}
          stroke="#3b82f6"
          strokeWidth="0.5"
        />
      </svg>
    );
  };

  // 渲染DIV模式预览
  const renderDivPreview = () => {
    return (
      <div className="relative h-full w-full">
        <div
          className="absolute inset-0 z-10"
          style={{
            ...backgroundStyle,
            clipPath,
          }}
        />
      </div>
    );
  };

  return (
    <div className="relative flex flex-col items-center space-y-4">
      {/* 标题和切换按钮 */}
      <div className="flex w-full items-center justify-between">
        <h3 className="text-lg font-semibold">实时预览</h3>
        <button
          onClick={togglePreviewMode}
          className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white shadow-md transition-colors hover:bg-blue-700"
        >
          切换到{previewMode === 'div' ? 'SVG' : 'DIV'}模式
        </button>
      </div>

      {/* 预览容器 */}
      <div
        className="relative overflow-hidden rounded-lg bg-white/5 shadow-sm dark:bg-black/5"
        style={{ width, height }}
      >
        {/* 渲染预览内容 */}
        {previewMode === 'svg' ? renderSvgPreview() : renderDivPreview()}
      </div>

      {/* 尺寸显示 */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        {width} × {height}px
      </div>
    </div>
  );
}
