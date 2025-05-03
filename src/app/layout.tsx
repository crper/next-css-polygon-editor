import { Github, Home, Info } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
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
        {/* 导航栏 */}
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold">CSS多边形魔方</span>
            </Link>

            <nav className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <Home className="h-4 w-4" />
                <span>首页</span>
              </Link>
              <Link
                href="/about"
                className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <Info className="h-4 w-4" />
                <span>关于</span>
              </Link>
              <Link
                href="https://github.com/crper/next-css-polygon-editor"
                target="_blank"
                className="flex items-center gap-1 rounded-md bg-gray-800 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-grow">{children}</main>

        {/* 页脚 */}
        <footer className="border-t border-gray-200 py-6 dark:border-gray-800">
          <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>
              © {new Date().getFullYear()} CSS多边形魔方 - 一款强大的CSS clip-path多边形编辑工具
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
