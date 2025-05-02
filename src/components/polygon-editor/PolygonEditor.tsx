'use client';

import { usePolygon } from '@/hooks/usePolygon';
import clsx from 'clsx';
import { Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { CodeToolbar } from './components/CodeToolbar';
import { ConfigAccordion } from './components/ConfigAccordion';
import { PolygonCanvas } from './components/PolygonCanvas';
import { PolygonPreview } from './components/render/PolygonPreview';
import {
  BackgroundSettings,
  GradientSettings,
  PresetsSettings,
  SizeSettings,
  VertexSettings,
} from './components/settings';

/**
 * 多边形编辑器组件属性
 */
export interface PolygonEditorProps {
  className?: string;
}

/**
 * 多边形编辑器组件
 */
export function PolygonEditor({ className = '' }: PolygonEditorProps) {
  const polygon = usePolygon();
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [previewSize, setPreviewSize] = useState({ width: 300, height: 300 });
  const [gradient, setGradient] = useState<string>('');

  const [gradientSettings, setGradientSettings] = useState({
    type: 'linear',
    direction: '135deg',
    colors: ['#6366f1', '#8b5cf6', '#d946ef'],
    enabled: false,
  });

  const handleGradientChange = (field: string, value: string | string[] | boolean) => {
    const newSettings = { ...gradientSettings, [field]: value };
    setGradientSettings(newSettings);

    if (newSettings.enabled) {
      const colorStops = newSettings.colors.join(', ');
      const gradientValue = `${newSettings.type}-gradient(${newSettings.type === 'linear' ? newSettings.direction : 'circle'}, ${colorStops})`;
      setGradient(gradientValue);
    } else {
      setGradient('');
    }
  };

  const handleColorChange = (index: number, color: string) => {
    const newColors = [...gradientSettings.colors];
    newColors[index] = color;
    handleGradientChange('colors', newColors);
  };

  return (
    <div className={clsx('w-full', className)}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mb-4 flex items-center gap-2">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">多边形编辑器</h2>
        <Sparkles className="h-5 w-5 text-amber-500" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-xl bg-white/10 p-5 shadow-lg backdrop-blur-sm dark:bg-black/10">
          <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
            编辑区域
          </h2>

          <div className="overflow-hidden rounded-lg bg-white/5 p-4 shadow-sm transition-all duration-300 hover:shadow-lg dark:bg-black/5">
            <PolygonCanvas
              points={polygon.points}
              activePointIndex={polygon.activePointIndex}
              isDragging={polygon.isDragging}
              onPointDragStart={polygon.startDragging}
              onPointDragEnd={polygon.stopDragging}
              onPointMove={polygon.moveActivePoint}
              onPointAdd={polygon.addPoint}
              onPointRemove={polygon.removePoint}
            />
          </div>

          <div className="space-y-4 rounded-lg bg-white/5 p-4 shadow-sm dark:bg-black/5">
            <ConfigAccordion title="顶点配置" defaultOpen={true}>
              <VertexSettings
                points={polygon.points}
                onUpdatePoint={polygon.updatePoint}
                onResetPolygon={polygon.resetPolygon}
              />
            </ConfigAccordion>

            <ConfigAccordion title="样式配置" defaultOpen={true}>
              <div className="space-y-4">
                <SizeSettings
                  width={previewSize.width}
                  height={previewSize.height}
                  onChange={(width, height) => setPreviewSize({ width, height })}
                />

                <div className="mt-4">
                  <PresetsSettings
                    onApplyPreset={polygon.setPoints}
                    currentWidth={previewSize.width}
                    currentHeight={previewSize.height}
                    onSizeChange={(width, height) => setPreviewSize({ width, height })}
                  />
                </div>

                <BackgroundSettings
                  backgroundImage={backgroundImage}
                  onChange={setBackgroundImage}
                />

                {/* 移除圆角和阴影设置 */}

                <div className="mt-4">
                  <GradientSettings
                    settings={gradientSettings}
                    onSettingChange={handleGradientChange}
                    onColorChange={handleColorChange}
                  />
                </div>
              </div>
            </ConfigAccordion>
          </div>

          <div className="rounded-lg bg-white/5 p-4 shadow-sm dark:bg-black/5">
            <h3 className="mb-2 text-lg font-semibold">操作说明</h3>
            <ul className="list-disc space-y-1 pl-5 text-sm text-gray-600 dark:text-gray-400">
              <li>点击画布或边线添加顶点</li>
              <li>拖拽顶点移动位置</li>
              <li>右键点击顶点删除</li>
              <li>使用样式配置调整外观</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4 rounded-xl bg-white/10 p-5 shadow-lg backdrop-blur-sm dark:bg-black/10">
          <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
            预览区域
          </h2>

          <div className="rounded-lg bg-white/5 p-4 shadow-sm dark:bg-black/5">
            <PolygonPreview
              clipPath={polygon.generateCssClipPath()}
              backgroundImage={backgroundImage}
              width={previewSize.width}
              height={previewSize.height}
              gradient={gradient}
            />
          </div>

          <div className="rounded-lg bg-white/5 p-4 shadow-sm dark:bg-black/5">
            <h3 className="mb-4 text-lg font-semibold">代码配置</h3>
            <CodeToolbar points={polygon.points} gradient={gradient} previewSize={previewSize} />
          </div>
        </div>
      </div>
    </div>
  );
}
