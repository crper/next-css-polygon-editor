import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CSS多边形编辑器',
  description: '一款直观的CSS clip-path多边形编辑工具，帮助您轻松创建和编辑复杂的多边形形状',
  keywords: 'CSS, clip-path, 多边形, 编辑器, 前端工具',
  authors: [{ name: 'Polygon Editor Team' }],
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <body className="flex min-h-screen flex-col">
        {/* 背景渐变和图案已移至_document.tsx */}

        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
