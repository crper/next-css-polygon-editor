'use client';

import type { EditorDocument } from '@/components/polygon-editor/lib';
import { getBackgroundValue, serializeClipPath } from '@/components/polygon-editor/lib';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Copy } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';

export interface CodeToolbarProps {
  document: EditorDocument;
}

type CodeType = 'polygon' | 'css';

function buildPolygonCode(document: EditorDocument) {
  return serializeClipPath(document.points);
}

function buildCssCode(document: EditorDocument) {
  const clipPath = serializeClipPath(document.points);
  const background = getBackgroundValue(document.backgroundImage, {
    ...document.gradient,
    enabled: document.gradient.enabled || document.backgroundImage.trim().length === 0,
  });

  return `.element {
  width: ${document.previewSize.width}px;
  height: ${document.previewSize.height}px;
  clip-path: ${clipPath};
  background: ${background};
}`;
}

export function CodeToolbar({ document }: CodeToolbarProps) {
  const [type, setType] = useState<CodeType>('polygon');
  const [copied, setCopied] = useState<CodeType | null>(null);
  const resetTimerRef = useRef<number | null>(null);

  const polygonCode = useMemo(() => buildPolygonCode(document), [document]);
  const cssCode = useMemo(() => buildCssCode(document), [document]);
  const code = type === 'polygon' ? polygonCode : cssCode;

  const clearResetTimer = useCallback(() => {
    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
  }, []);

  useEffect(() => clearResetTimer, [clearResetTimer]);

  const copyToClipboard = useCallback(
    (value: string, currentType: CodeType) => {
      navigator.clipboard
        .writeText(value)
        .then(() => {
          clearResetTimer();
          setCopied(currentType);
          toast.success(
            currentType === 'polygon' ? 'polygon 值已复制到剪贴板' : 'CSS 示例已复制到剪贴板'
          );
          resetTimerRef.current = window.setTimeout(() => {
            setCopied(null);
            resetTimerRef.current = null;
          }, 2000);
        })
        .catch(() => {
          toast.error(
            currentType === 'polygon'
              ? '复制 polygon 值失败，请手动复制'
              : '复制 CSS 示例失败，请手动复制'
          );
        });
    },
    [clearResetTimer]
  );

  return (
    <div className="space-y-3.5">
      <div className="surface-panel space-y-3 p-4">
        <div className="space-y-1.5">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">导出代码</h3>
          <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
            默认推荐复制 polygon 值；需要完整样式时再切到 CSS 示例。
          </p>
        </div>

        <div className="inspector-grid inspector-grid-2">
          <Button
            size="sm"
            className="h-auto w-full rounded-2xl px-4 py-3"
            onClick={() => copyToClipboard(polygonCode, 'polygon')}
          >
            {copied === 'polygon' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            复制 polygon 值
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-auto w-full rounded-2xl px-4 py-3"
            onClick={() => copyToClipboard(cssCode, 'css')}
          >
            {copied === 'css' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            复制 CSS 示例
          </Button>
        </div>
      </div>

      <Tabs
        value={type}
        onValueChange={value => setType(value as CodeType)}
        className="w-full gap-0"
      >
        <TabsList className="grid w-full grid-cols-2 gap-1.5 p-1.5">
          <TabsTrigger value="polygon">polygon 值</TabsTrigger>
          <TabsTrigger value="css">CSS 示例</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="surface-code">
        <pre className="max-h-[280px] overflow-auto p-4 text-sm text-white sm:max-h-[320px]">
          <code>{code}</code>
        </pre>
      </div>

      <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
        {type === 'polygon'
          ? '这是可直接粘贴到 clip-path 属性值中的 polygon 值。'
          : '这是包含尺寸、clip-path 与背景的完整 CSS 示例。'}
      </p>
    </div>
  );
}
