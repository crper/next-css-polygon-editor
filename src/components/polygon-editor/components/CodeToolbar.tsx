'use client';

import { Point } from '@/hooks/usePolygon';
import clsx from 'clsx';
import { Check, Copy } from 'lucide-react';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

/**
 * 代码工具栏组件属性
 */
export interface CodeToolbarProps {
  points: Point[];
  gradient?: string;
  previewSize: {
    width: number;
    height: number;
  };
}

/**
 * 代码工具栏组件
 */
export function CodeToolbar({ points, gradient = '', previewSize }: CodeToolbarProps) {
  const [renderMode, setRenderMode] = useState<'svg' | 'css'>('css');
  const [copied, setCopied] = useState(false);

  // 生成 SVG 代码
  const generateSvgCode = useCallback(() => {
    const svgWidth = previewSize.width;
    const svgHeight = previewSize.height;
    // SVG中不需要百分比，直接使用数字即可
    const polygonPoints = points.map(p => `${p.x},${p.y}`).join(' ');

    let code = `<svg width="${svgWidth}" height="${svgHeight}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>`;

    if (gradient) {
      // 解析渐变字符串
      let colors = ['#6366f1', '#8b5cf6', '#d946ef'];

      if (gradient.includes('linear-gradient')) {
        // 处理完整的 linear-gradient 字符串
        const match = gradient.match(/linear-gradient\([^,]*,\s*([^,]+),\s*([^,]+),\s*([^)]+)\)/);
        if (match && match.length >= 4) {
          colors = [match[1].trim(), match[2].trim(), match[3].trim()];
        }
      } else if (gradient.includes(',')) {
        // 处理纯色值列表
        colors = gradient.split(',').map(c => c.trim());
        // 确保至少有三种颜色
        while (colors.length < 3) {
          colors.push(colors[colors.length - 1] || '#d946ef');
        }
      }

      code += `
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${colors[0]}" />
      <stop offset="50%" stop-color="${colors[1]}" />
      <stop offset="100%" stop-color="${colors[2]}" />
    </linearGradient>`;
    }

    code += `
  </defs>
  <polygon points="${polygonPoints}"
           fill="${gradient ? 'url(#gradient)' : '#6366f1'}"
           stroke="#3b82f6"
           stroke-width="0.5" />
</svg>`;

    return code;
  }, [points, gradient, previewSize]);

  // 生成 CSS 代码
  const generateCssCode = useCallback(() => {
    const clipPathValue = `polygon(${points.map(p => `${p.x}% ${p.y}%`).join(', ')})`;

    // 确保渐变值是有效的 CSS 渐变
    let gradientValue = 'linear-gradient(135deg, #6366f1, #8b5cf6, #d946ef)';
    if (gradient) {
      if (gradient.startsWith('linear-gradient')) {
        gradientValue = gradient;
      } else {
        // 如果只提供了颜色，构造完整的渐变
        const colors = gradient.split(',').map(c => c.trim());
        gradientValue = `linear-gradient(135deg, ${colors.join(', ')})`;
      }
    }

    // 生成 CSS 代码
    return `.element {
  width: ${previewSize.width}px;
  height: ${previewSize.height}px;
  clip-path: ${clipPathValue};
  background: ${gradientValue};
}`;
  }, [points, gradient, previewSize]);

  // 复制代码到剪贴板
  const copyToClipboard = useCallback((code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      toast.success(`代码已复制到剪贴板`);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  // 获取当前代码
  const getCode = useCallback(() => {
    return renderMode === 'css' ? generateCssCode() : generateSvgCode();
  }, [renderMode, generateCssCode, generateSvgCode]);

  return (
    <div className="space-y-6">
      <div className="w-full">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">代码格式</h3>
          <div className="flex space-x-2">
            <button
              className={clsx(
                'rounded-md px-3 py-1 text-sm transition-colors',
                renderMode === 'css'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              )}
              onClick={() => setRenderMode('css')}
            >
              CSS
            </button>
            <button
              className={clsx(
                'rounded-md px-3 py-1 text-sm transition-colors',
                renderMode === 'svg'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              )}
              onClick={() => setRenderMode('svg')}
            >
              SVG
            </button>
          </div>
        </div>

        <div className="relative">
          <pre className="max-h-[300px] overflow-auto rounded-md bg-gray-800 p-4 text-sm text-white">
            <code>{getCode()}</code>
          </pre>
          <button
            className="absolute right-2 top-2 rounded-md bg-gray-700 p-2 text-white transition-colors hover:bg-gray-600"
            onClick={() => copyToClipboard(getCode())}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
