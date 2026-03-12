import { ThemeToggle } from '@/components/theme-toggle';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Github, Home, Info, Scissors } from 'lucide-react';
import Link from 'next/link';

type SiteLayoutProps = {
  children: React.ReactNode;
};

const navigation = [
  { href: '/', label: '首页', description: '工具入口与说明', icon: Home },
  { href: '/about', label: '关于', description: '项目说明与开源', icon: Info },
  { href: '/editor', label: '工作区', description: '进入独立编辑器', icon: Scissors },
];

export default function SiteLayout({ children }: Readonly<SiteLayoutProps>) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/78 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/78">
        <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center justify-between gap-3">
              <Link href="/" className="inline-flex min-w-0 items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/25">
                  <Scissors className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-base font-semibold sm:text-lg">
                    CSS 多边形编辑器
                  </span>
                  <span className="block truncate text-xs text-slate-500 dark:text-slate-400">
                    Tool-first clip-path workspace
                  </span>
                </span>
              </Link>

              <Link
                href="https://github.com/crper/next-css-polygon-editor"
                target="_blank"
                className={cn(
                  buttonVariants({ size: 'icon', variant: 'outline' }),
                  'rounded-full sm:hidden'
                )}
              >
                <Github className="h-4 w-4" />
              </Link>
            </div>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-end">
              <nav className="surface-panel grid grid-cols-3 gap-2 p-2 sm:flex sm:flex-wrap sm:items-center">
                {navigation.map(item => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-2xl px-3 py-2 transition hover:bg-white/80 dark:hover:bg-white/8"
                    >
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-100">
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {item.description}
                      </p>
                    </Link>
                  );
                })}
              </nav>

              <div className="flex items-center justify-between gap-2 sm:justify-end">
                <ThemeToggle />
                <Link
                  href="https://github.com/crper/next-css-polygon-editor"
                  target="_blank"
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'hidden rounded-full px-4 py-2 text-sm sm:inline-flex'
                  )}
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-black/5 py-8 dark:border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 text-sm text-slate-600 sm:px-6 sm:text-base lg:flex-row lg:items-center lg:justify-between lg:px-8 dark:text-slate-400">
          <p>© {new Date().getFullYear()} CSS 多边形编辑器</p>
          <p>首页负责入口与介绍，独立工作区负责沉浸式编辑。</p>
        </div>
      </footer>
    </div>
  );
}
