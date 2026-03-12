'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { serializeClipPath, usePolygon } from '@/hooks/usePolygon';
import clsx from 'clsx';
import {
  ChevronDown,
  ChevronUp,
  Code2,
  Eye,
  Layers3,
  Settings2,
  SlidersHorizontal,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { CodeToolbar } from './components/CodeToolbar';
import { PolygonCanvas } from './components/PolygonCanvas';
import { PolygonPreview } from './components/render/PolygonPreview';
import {
  BackgroundSettings,
  GradientSettings,
  PresetsSettings,
  SizeSettings,
  VertexSettings,
} from './components/settings';

export interface PolygonEditorProps {
  className?: string;
}

type InspectorTab = 'shape' | 'size' | 'style' | 'export';

type PolygonEditorModel = ReturnType<typeof usePolygon>;

const inspectorTabs: Array<{ value: InspectorTab; label: string }> = [
  { value: 'shape', label: 'Shape' },
  { value: 'size', label: 'Size' },
  { value: 'style', label: 'Style' },
  { value: 'export', label: 'Export' },
];

function InspectorSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="surface-soft space-y-4 rounded-[24px] p-4">
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
        <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">{description}</p>
      </div>
      <Separator />
      {children}
    </section>
  );
}

function InspectorShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="surface-card flex h-full min-h-0 flex-col overflow-hidden rounded-[28px] p-3">
      <div className="mb-3 space-y-1 px-1">
        <h2 className="text-sm font-semibold text-slate-950 dark:text-white">{title}</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>
      </div>
      <Separator className="mb-3" />
      {children}
    </div>
  );
}

function InspectorContent({
  activeTab,
  onTabChange,
  editor,
  clipPath,
  onGradientFieldChange,
  onGradientTypeChange,
  onColorChange,
}: {
  activeTab: InspectorTab;
  onTabChange: (tab: InspectorTab) => void;
  editor: PolygonEditorModel;
  clipPath: string;
  onGradientFieldChange: (field: 'enabled' | 'direction' | 'type', value: boolean | string) => void;
  onGradientTypeChange: (type: 'linear' | 'radial') => void;
  onColorChange: (index: number, color: string) => void;
}) {
  return (
    <Tabs
      value={activeTab}
      onValueChange={value => onTabChange(value as InspectorTab)}
      className="flex min-h-0 flex-1 flex-col gap-3"
    >
      <TabsList className="grid w-full grid-cols-4">
        {inspectorTabs.map(tab => (
          <TabsTrigger key={tab.value} value={tab.value} className="px-2 text-xs sm:text-sm">
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="min-h-0 flex-1 overflow-hidden">
        <TabsContent value="shape" className="h-full overflow-y-auto pr-1">
          <div className="space-y-3">
            <InspectorSection
              title="Shape / Vertex"
              description="优先处理形状本身。这里负责顶点选择、微调和与画布的精确对应。"
            >
              <div className="flex flex-wrap gap-2 text-xs">
                <Badge>{editor.points.length} 个顶点</Badge>
                <Badge>
                  {editor.activePointIndex === null
                    ? '未选中顶点'
                    : `已选中顶点 P${editor.activePointIndex + 1}`}
                </Badge>
              </div>
              <VertexSettings
                points={editor.points}
                activePointIndex={editor.activePointIndex}
                onSelectPoint={editor.selectPoint}
                onUpdatePoint={editor.updatePoint}
                onResetPolygon={editor.resetPolygon}
              />
            </InspectorSection>
          </div>
        </TabsContent>

        <TabsContent value="size" className="h-full overflow-y-auto pr-1">
          <div className="space-y-3">
            <InspectorSection
              title="Size / Presets"
              description="尺寸、比例和预设集中放在一起，优先让画布与预览比例更合理。"
            >
              <SizeSettings
                width={editor.document.previewSize.width}
                height={editor.document.previewSize.height}
                onChange={editor.setPreviewSize}
              />
            </InspectorSection>
            <InspectorSection
              title="Presets"
              description="快速试形状，再回到画布精修。比例、缩放与预设都在同一个任务分组里。"
            >
              <PresetsSettings
                onApplyPreset={editor.setPoints}
                currentWidth={editor.document.previewSize.width}
                currentHeight={editor.document.previewSize.height}
                onSizeChange={editor.setPreviewSize}
              />
            </InspectorSection>
          </div>
        </TabsContent>

        <TabsContent value="style" className="h-full overflow-y-auto pr-1">
          <div className="space-y-3">
            <InspectorSection
              title="Background"
              description="背景图属于辅助视觉，不再与主舞台抢占版面。"
            >
              <BackgroundSettings
                backgroundImage={editor.document.backgroundImage}
                onChange={editor.setBackgroundImage}
              />
            </InspectorSection>
            <InspectorSection
              title="Gradient"
              description="没有背景图时，可直接使用渐变生成预览背景。"
            >
              <GradientSettings
                settings={editor.document.gradient}
                onSettingChange={onGradientFieldChange}
                onGradientTypeChange={onGradientTypeChange}
                onColorChange={onColorChange}
              />
            </InspectorSection>
          </div>
        </TabsContent>

        <TabsContent value="export" className="h-full overflow-y-auto pr-1">
          <div className="space-y-3">
            <InspectorSection
              title="Preview"
              description="预览保留为辅助能力，但会按真实宽高比缩放显示，避免被压成长条。"
            >
              <PolygonPreview document={editor.document} clipPath={clipPath} compact />
            </InspectorSection>
            <InspectorSection
              title="Export / Code"
              description="确认无误后，直接复制 polygon 值或完整 CSS 示例。"
            >
              <CodeToolbar document={editor.document} />
            </InspectorSection>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
}

export function PolygonEditor({ className = '' }: PolygonEditorProps) {
  const editor = usePolygon();
  const [activeTab, setActiveTab] = useState<InspectorTab>('shape');
  const [mobileInspectorOpen, setMobileInspectorOpen] = useState(false);

  const clipPath = useMemo(() => serializeClipPath(editor.points), [editor.points]);

  const handleGradientFieldChange = (
    field: 'enabled' | 'direction' | 'type',
    value: boolean | string
  ) => {
    editor.setGradient(current => ({
      ...current,
      [field]: value,
    }));
  };

  const handleGradientTypeChange = (type: 'linear' | 'radial') => {
    editor.setGradient(current => {
      const safeDirection =
        type === 'radial'
          ? '135deg'
          : current.direction === '135deg'
            ? 'to right'
            : current.direction;
      return {
        ...current,
        type,
        direction: safeDirection,
      };
    });
  };

  const handleColorChange = (index: number, color: string) => {
    editor.setGradient(current => {
      const nextColors = [...current.colors];
      nextColors[index] = color;
      return {
        ...current,
        colors: nextColors,
      };
    });
  };

  return (
    <div className={clsx('relative flex h-full min-h-0 w-full flex-col gap-3 lg:gap-4', className)}>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="surface-panel flex flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white">
            <Layers3 className="h-4 w-4 text-blue-600 dark:text-blue-300" />
            <span>Polygon Workspace</span>
          </div>
          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
            画布是主舞台，预览与代码回收到 inspector，设置区按任务重新编排。
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge>{editor.points.length} 个顶点</Badge>
          <Badge>
            {editor.document.previewSize.width} × {editor.document.previewSize.height}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full px-3 lg:hidden"
            onClick={() => setMobileInspectorOpen(current => !current)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Inspector
          </Button>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 gap-3 lg:gap-4">
        <section className="flex min-h-0 min-w-0 flex-1 flex-col pb-20 lg:pb-0">
          <div className="surface-soft mb-3 flex flex-wrap items-center gap-2 px-3 py-2 text-xs text-slate-600 dark:text-slate-300">
            <Badge className="bg-white/80 dark:bg-white/[0.06]">
              <Settings2 className="h-3.5 w-3.5" />
              点击顶点选中
            </Badge>
            <Badge className="bg-white/80 dark:bg-white/[0.06]">
              <Eye className="h-3.5 w-3.5" />
              点击边线插点
            </Badge>
            <Badge className="bg-white/80 dark:bg-white/[0.06]">
              <Code2 className="h-3.5 w-3.5" />
              Delete 删除，方向键微调
            </Badge>
          </div>

          <div className="min-h-0 flex-1">
            <PolygonCanvas
              className="h-full"
              points={editor.points}
              activePointIndex={editor.activePointIndex}
              isDragging={editor.isDragging}
              onSelectPoint={editor.selectPoint}
              onPointDragStart={editor.startDragging}
              onPointDragEnd={editor.stopDragging}
              onPointMove={editor.moveActivePoint}
              onPointAdd={editor.addPoint}
              onPointRemove={editor.removePoint}
              onPointNudge={(index, point) => editor.updatePoint(index, point)}
            />
          </div>
        </section>

        <aside className="hidden h-full w-[392px] shrink-0 lg:block xl:w-[436px]">
          <InspectorShell title="Inspector" description="单一垂直面板，分组更清晰，层级更轻。">
            <InspectorContent
              activeTab={activeTab}
              onTabChange={setActiveTab}
              editor={editor}
              clipPath={clipPath}
              onGradientFieldChange={handleGradientFieldChange}
              onGradientTypeChange={handleGradientTypeChange}
              onColorChange={handleColorChange}
            />
          </InspectorShell>
        </aside>

        {mobileInspectorOpen ? (
          <button
            type="button"
            aria-label="关闭 inspector"
            className="absolute inset-0 z-20 bg-slate-950/20 backdrop-blur-[1px] lg:hidden"
            onClick={() => setMobileInspectorOpen(false)}
          />
        ) : null}

        <div
          className={clsx(
            'absolute inset-x-0 bottom-0 z-30 lg:hidden',
            mobileInspectorOpen ? 'pointer-events-auto' : 'pointer-events-none'
          )}
        >
          <div
            className={clsx(
              'pointer-events-auto mx-1 transition-transform duration-300',
              mobileInspectorOpen ? 'translate-y-0' : 'translate-y-[calc(100%-4.5rem)]'
            )}
          >
            <InspectorShell
              title="Inspector"
              description="同一套信息架构，移动端改为底部单一 panel。"
            >
              <button
                type="button"
                className="-mt-1 mb-3 flex w-full items-center justify-between gap-3"
                onClick={() => setMobileInspectorOpen(current => !current)}
              >
                <div className="h-1.5 w-12 rounded-full bg-slate-300 dark:bg-slate-700" />
                {mobileInspectorOpen ? (
                  <ChevronDown className="h-4 w-4 shrink-0" />
                ) : (
                  <ChevronUp className="h-4 w-4 shrink-0" />
                )}
              </button>
              <div className="h-[min(62dvh,560px)] overflow-hidden">
                <InspectorContent
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  editor={editor}
                  clipPath={clipPath}
                  onGradientFieldChange={handleGradientFieldChange}
                  onGradientTypeChange={handleGradientTypeChange}
                  onColorChange={handleColorChange}
                />
              </div>
            </InspectorShell>
          </div>
        </div>

        {!mobileInspectorOpen ? (
          <button
            type="button"
            className="surface-button absolute bottom-3 right-3 z-20 rounded-full px-4 py-2 text-sm lg:hidden"
            onClick={() => setMobileInspectorOpen(true)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            打开 inspector
          </button>
        ) : null}
      </div>
    </div>
  );
}
