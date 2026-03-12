import { PolygonEditor } from '@/components/polygon-editor';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editor Workspace · CSS 多边形编辑器',
  description: '更聚焦的 clip-path polygon workspace，强调大画布与单一 inspector。',
};

export default function EditorPage() {
  return (
    <div className="editor-workspace-shell h-full px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-5">
      <PolygonEditor className="h-full" />
    </div>
  );
}
