'use client';

import { Badge } from '@/components/ui/badge';
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
  type LucideIcon,
} from 'lucide-react';
import { useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { Toaster } from 'react-hot-toast';
import { CodeToolbar } from './components/CodeToolbar';
import { PolygonCanvas } from './components/PolygonCanvas';
import { PolygonPreview } from './components/render/PolygonPreview';
import {
  BackgroundSettings,
  GradientSettings,
  ScalePresets,
  ShapePresets,
  SizeSettings,
  VertexSettings,
} from './components/settings';

export interface PolygonEditorProps {
  className?: string;
}

type InspectorTab = 'shape' | 'size' | 'style' | 'export';

type PolygonEditorModel = ReturnType<typeof usePolygon>;

type MobileSheetPointerState = {
  pointerId: number;
  startY: number;
  initialOpen: boolean;
  hasDragged: boolean;
};

const inspectorTabs: Array<{ value: InspectorTab; label: string }> = [
  { value: 'shape', label: '形状' },
  { value: 'size', label: '尺寸' },
  { value: 'style', label: '样式' },
  { value: 'export', label: '导出' },
];

const MOBILE_SHEET_PEEK = 112;
const MOBILE_SHEET_DRAG_THRESHOLD = 48;

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
    <section className="surface-soft space-y-4 rounded-[22px] p-4">
      <div className="space-y-1.5">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
        <p className="text-xs leading-6 text-slate-500 dark:text-slate-400">{description}</p>
      </div>
      <Separator className="bg-black/5 dark:bg-white/10" />
      {children}
    </section>
  );
}

function InspectorShell({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        'surface-card flex h-full min-h-0 flex-col overflow-hidden rounded-[26px] p-3 sm:p-3.5',
        className
      )}
    >
      <div className="mb-3 space-y-1.5 px-1">
        <h2 className="text-[15px] font-semibold text-slate-950 dark:text-white">{title}</h2>
        <p className="text-xs leading-6 text-slate-500 dark:text-slate-400">{description}</p>
      </div>
      <Separator className="mb-3 bg-black/5 dark:bg-white/10" />
      <div className="inspector-content-shell min-h-0 flex-1">{children}</div>
    </div>
  );
}

function WorkspaceHint({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="workspace-hint-chip">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-700 dark:bg-blue-400/10 dark:text-blue-200">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-900 dark:text-white">{title}</p>
        <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{description}</p>
      </div>
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
  rootClassName,
  bodyClassName,
}: {
  activeTab: InspectorTab;
  onTabChange: (tab: InspectorTab) => void;
  editor: PolygonEditorModel;
  clipPath: string;
  onGradientFieldChange: (field: 'enabled' | 'direction' | 'type', value: boolean | string) => void;
  onGradientTypeChange: (type: 'linear' | 'radial') => void;
  onColorChange: (index: number, color: string) => void;
  rootClassName?: string;
  bodyClassName?: string;
}) {
  return (
    <Tabs
      value={activeTab}
      onValueChange={value => onTabChange(value as InspectorTab)}
      className={clsx('flex min-h-0 flex-1 flex-col gap-3', rootClassName)}
    >
      <TabsList className="grid w-full grid-cols-2 gap-1.5 rounded-[20px] p-1.5 sm:grid-cols-4">
        {inspectorTabs.map(tab => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="min-h-10 px-3 py-2 text-[13px] sm:text-sm"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <div
        className={clsx('min-h-0 flex-1 overflow-y-auto overscroll-contain pr-0.5', bodyClassName)}
      >
        <TabsContent value="shape" className="mt-0 data-[state=inactive]:hidden">
          <div className="space-y-3 pb-2">
            <InspectorSection
              title="形状与顶点"
              description="先选一个基础形状，再微调选中的顶点，画布和输入会同步更新。"
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

            <InspectorSection
              title="形状预设"
              description="先套用常见形状，再回到画布继续拖动顶点微调。"
            >
              <ShapePresets onApplyPreset={editor.setPoints} />
            </InspectorSection>
          </div>
        </TabsContent>

        <TabsContent value="size" className="mt-0 data-[state=inactive]:hidden">
          <div className="space-y-3 pb-2">
            <InspectorSection
              title="尺寸"
              description="直接输入宽高，预览会立即按新尺寸更新，方便确认最终占位。"
            >
              <SizeSettings
                width={editor.document.previewSize.width}
                height={editor.document.previewSize.height}
                onChange={editor.setPreviewSize}
              />
            </InspectorSection>

            <InspectorSection
              title="等比缩放"
              description="保持当前宽高比例不变，用快捷倍率快速放大或缩小预览。"
            >
              <ScalePresets
                currentWidth={editor.document.previewSize.width}
                currentHeight={editor.document.previewSize.height}
                onSizeChange={editor.setPreviewSize}
              />
            </InspectorSection>
          </div>
        </TabsContent>

        <TabsContent value="style" className="mt-0 data-[state=inactive]:hidden">
          <div className="space-y-3 pb-2">
            <InspectorSection
              title="背景图"
              description="输入背景图 URL，立即查看图形裁切后的最终效果。"
            >
              <BackgroundSettings
                backgroundImage={editor.document.backgroundImage}
                onChange={editor.setBackgroundImage}
              />
            </InspectorSection>

            <InspectorSection title="渐变" description="如果没有背景图，可以直接用渐变生成底色。">
              <GradientSettings
                settings={editor.document.gradient}
                onSettingChange={onGradientFieldChange}
                onGradientTypeChange={onGradientTypeChange}
                onColorChange={onColorChange}
              />
            </InspectorSection>

            <InspectorSection
              title="预览"
              description="改完样式后可立即确认结果，不用切到导出区再检查。"
            >
              <PolygonPreview document={editor.document} clipPath={clipPath} compact />
            </InspectorSection>
          </div>
        </TabsContent>

        <TabsContent value="export" className="mt-0 data-[state=inactive]:hidden">
          <div className="space-y-3 pb-2">
            <InspectorSection
              title="导出代码"
              description="确认预览无误后，再复制 polygon 值或完整 CSS 代码。"
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
  const [mobileSheetDragOffset, setMobileSheetDragOffset] = useState(0);
  const [mobileSheetDragging, setMobileSheetDragging] = useState(false);
  const mobileSheetPointerRef = useRef<MobileSheetPointerState | null>(null);
  const suppressSheetClickRef = useRef(false);

  const clipPath = useMemo(() => serializeClipPath(editor.points), [editor.points]);
  const activeTabLabel =
    inspectorTabs.find(tab => tab.value === activeTab)?.label ?? inspectorTabs[0].label;
  const selectedPointLabel =
    editor.activePointIndex === null
      ? '当前还没有选中顶点'
      : `P${editor.activePointIndex + 1} 已被选中`;

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

  const resetMobileSheetDrag = () => {
    mobileSheetPointerRef.current = null;
    setMobileSheetDragging(false);
    setMobileSheetDragOffset(0);
  };

  const closeMobileInspector = () => {
    setMobileInspectorOpen(false);
    resetMobileSheetDrag();
  };

  const handleMobileSheetPointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    mobileSheetPointerRef.current = {
      pointerId: event.pointerId,
      startY: event.clientY,
      initialOpen: mobileInspectorOpen,
      hasDragged: false,
    };
    suppressSheetClickRef.current = false;
    setMobileSheetDragging(true);
    setMobileSheetDragOffset(0);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleMobileSheetPointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const pointerState = mobileSheetPointerRef.current;

    if (!pointerState || pointerState.pointerId !== event.pointerId) {
      return;
    }

    const deltaY = event.clientY - pointerState.startY;
    const nextOffset = pointerState.initialOpen ? Math.max(0, deltaY) : Math.min(0, deltaY);

    if (Math.abs(deltaY) > 6) {
      pointerState.hasDragged = true;
    }

    setMobileSheetDragOffset(nextOffset);
  };

  const handleMobileSheetPointerEnd = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const pointerState = mobileSheetPointerRef.current;

    if (!pointerState || pointerState.pointerId !== event.pointerId) {
      return;
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const deltaY = event.clientY - pointerState.startY;

    if (pointerState.hasDragged) {
      suppressSheetClickRef.current = true;
      setMobileInspectorOpen(
        pointerState.initialOpen
          ? deltaY <= MOBILE_SHEET_DRAG_THRESHOLD
          : deltaY < -MOBILE_SHEET_DRAG_THRESHOLD
      );
    }

    resetMobileSheetDrag();
  };

  const handleMobileSheetPointerCancel = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const pointerState = mobileSheetPointerRef.current;

    if (pointerState && pointerState.pointerId === event.pointerId) {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      resetMobileSheetDrag();
    }
  };

  const handleMobileSheetToggle = () => {
    if (suppressSheetClickRef.current) {
      suppressSheetClickRef.current = false;
      return;
    }

    setMobileInspectorOpen(current => !current);
  };

  const mobileSheetTransform = mobileInspectorOpen
    ? `translateY(${Math.max(0, mobileSheetDragOffset)}px)`
    : `translateY(calc(100% - ${MOBILE_SHEET_PEEK}px + ${Math.min(0, mobileSheetDragOffset)}px))`;

  return (
    <div className={clsx('relative flex h-full min-h-0 w-full flex-col gap-3 lg:gap-4', className)}>
      <Toaster position="top-center" reverseOrder={false} />

      <section className="surface-card relative overflow-hidden rounded-[28px] p-4 sm:p-5 lg:p-6">
        <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.16),transparent_70%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.18),transparent_70%)]" />

        <div className="relative grid gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(320px,360px)] xl:items-start">
          <div className="space-y-4">
            <Badge className="w-fit bg-blue-500/10 text-blue-700 dark:bg-blue-400/10 dark:text-blue-200">
              <Layers3 className="h-3.5 w-3.5" />
              clip-path polygon() workspace
            </Badge>

            <div className="space-y-2">
              <h1 className="text-lg font-semibold tracking-tight text-slate-950 sm:text-[1.625rem] dark:text-white">
                画布优先的 Polygon Workspace
              </h1>
              <p className="max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
                拖点、插点、预览与导出被整理成一条更短的工作路径：中央画布负责编辑， Inspector
                只做参数和输出，不再抢主舞台。
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
            <div className="workspace-stat">
              <p className="workspace-stat-label">编辑状态</p>
              <p className="workspace-stat-value">{editor.points.length} 个顶点</p>
              <p className="workspace-stat-note">{selectedPointLabel}</p>
            </div>

            <div className="workspace-stat">
              <p className="workspace-stat-label">预览尺寸</p>
              <p className="workspace-stat-value">
                {editor.document.previewSize.width} × {editor.document.previewSize.height}
              </p>
              <p className="workspace-stat-note">实时预览与导出代码会同步引用这组尺寸。</p>
            </div>

            <div className="workspace-stat">
              <p className="workspace-stat-label">当前面板</p>
              <p className="workspace-stat-value">{activeTabLabel}</p>
              <p className="workspace-stat-note">
                Inspector 已按形状、尺寸、样式和导出四段整理信息。
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="relative flex min-h-0 flex-1 gap-3 lg:gap-4">
        <section className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 pb-[120px] lg:pb-0">
          <div className="grid gap-2.5 sm:grid-cols-2 2xl:grid-cols-3">
            <WorkspaceHint
              icon={Settings2}
              title="点击即可选点"
              description="选中后可直接拖动，也能在 Inspector 中精确输入 X / Y。"
            />
            <WorkspaceHint
              icon={Eye}
              title="边线可继续插点"
              description="在现有边线上点击，就能快速补新顶点扩展多边形结构。"
            />
            <WorkspaceHint
              icon={Code2}
              title="键盘辅助微调"
              description="Delete 删除当前点，方向键移动位置，Shift 可加大步长。"
            />
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

        <aside className="hidden h-full w-[392px] shrink-0 lg:block xl:w-[420px]">
          <InspectorShell
            title="Inspector"
            description="所有设置集中在一个侧边面板里，方便边调整边查看画布。"
          >
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
            className="absolute inset-0 z-20 bg-slate-950/18 backdrop-blur-[1px] lg:hidden"
            onClick={closeMobileInspector}
          />
        ) : null}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 lg:hidden">
          <div className="pointer-events-auto mx-2 sm:mx-3">
            <div
              className={clsx(
                'flex h-[min(82dvh,720px)] max-h-[calc(100dvh-0.5rem)] min-h-[460px] flex-col overflow-hidden rounded-t-[28px] border border-black/8 bg-white/96 shadow-[0_-18px_48px_rgba(15,23,42,0.16)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/96',
                mobileSheetDragging
                  ? 'transition-none'
                  : 'transition-transform duration-280 ease-out'
              )}
              style={{ transform: mobileSheetTransform }}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-white/70 to-transparent dark:from-slate-950/70" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-white/90 to-transparent dark:from-slate-950/90" />

              <div className="relative flex min-h-0 flex-1 flex-col">
                <button
                  type="button"
                  className="flex items-start justify-between gap-3 border-b border-black/5 px-3.5 pb-3 pt-3 text-left dark:border-white/10"
                  style={{ touchAction: 'none' }}
                  onPointerDown={handleMobileSheetPointerDown}
                  onPointerMove={handleMobileSheetPointerMove}
                  onPointerUp={handleMobileSheetPointerEnd}
                  onPointerCancel={handleMobileSheetPointerCancel}
                  onClick={handleMobileSheetToggle}
                  aria-expanded={mobileInspectorOpen}
                  aria-label={mobileInspectorOpen ? '收起 inspector' : '展开 inspector'}
                >
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex justify-center">
                      <div className="h-1.5 w-12 rounded-full bg-slate-300 dark:bg-slate-700" />
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-slate-950 dark:text-white">
                        Inspector
                      </p>
                      <Badge className="bg-white/70 dark:bg-white/[0.06]">{activeTabLabel}</Badge>
                      <Badge className="bg-white/70 dark:bg-white/[0.06]">
                        {editor.points.length} 个顶点
                      </Badge>
                    </div>
                    <p className="mt-1.5 text-xs leading-5 text-slate-500 dark:text-slate-400">
                      点击或拖动把手展开设置，移动端保持和桌面端一致的信息结构。
                    </p>
                  </div>
                  {mobileInspectorOpen ? (
                    <ChevronDown className="mt-6 h-4 w-4 shrink-0 text-slate-500 dark:text-slate-400" />
                  ) : (
                    <ChevronUp className="mt-6 h-4 w-4 shrink-0 text-slate-500 dark:text-slate-400" />
                  )}
                </button>

                <div className="min-h-0 flex-1 overflow-hidden px-3 pb-3 pt-2.5">
                  <InspectorContent
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    editor={editor}
                    clipPath={clipPath}
                    onGradientFieldChange={handleGradientFieldChange}
                    onGradientTypeChange={handleGradientTypeChange}
                    onColorChange={handleColorChange}
                    rootClassName="h-full"
                    bodyClassName="h-full pb-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
