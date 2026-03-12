import { ThemeProvider } from '@/components/theme-provider';
import { withBasePath } from '@/lib/site';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CSS 多边形编辑器',
  description: '可视化编辑 CSS clip-path polygon，支持实时预览与代码复制。',
  keywords: 'CSS, clip-path, polygon, 多边形, editor',
  authors: [{ name: 'crper' }],
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="zh-CN" className="scroll-smooth" suppressHydrationWarning>
      <body className="min-h-screen bg-[radial-gradient(circle_at_top,#dbeafe,transparent_35%),linear-gradient(135deg,#f8fbff_0%,#eef2ff_45%,#f8fafc_100%)] text-slate-900 antialiased dark:bg-[radial-gradient(circle_at_top,#1d4ed8,transparent_25%),linear-gradient(135deg,#020617_0%,#0f172a_35%,#111827_100%)] dark:text-slate-50">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="pointer-events-none fixed inset-0 -z-20 opacity-40 dark:opacity-20">
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent dark:from-white/5" />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${withBasePath('/grid-pattern.svg')})`,
                backgroundPosition: 'center',
              }}
            />
          </div>

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
