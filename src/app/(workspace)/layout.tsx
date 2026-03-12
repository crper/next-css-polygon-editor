import { ThemeToggle } from '@/components/theme-toggle';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft, Github, Scissors } from 'lucide-react';
import Link from 'next/link';

type WorkspaceLayoutProps = {
  children: React.ReactNode;
};

export default function WorkspaceLayout({ children }: Readonly<WorkspaceLayoutProps>) {
  return (
    <div className="relative flex min-h-[100dvh] flex-col overflow-hidden">
      <header className="border-b border-black/5 bg-white/72 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/72">
        <div className="mx-auto flex w-full max-w-[1800px] items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'sm' }),
                'rounded-full px-3'
              )}
            >
              <ArrowLeft className="h-4 w-4" />
              返回首页
            </Link>
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                <Scissors className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-950 dark:text-white">
                  Polygon Workspace
                </p>
                <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                  中央画布 + 单一 inspector panel
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="https://github.com/crper/next-css-polygon-editor"
              target="_blank"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'sm' }),
                'rounded-full px-3'
              )}
            >
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 min-h-0 overflow-hidden">{children}</main>
    </div>
  );
}
