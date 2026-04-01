'use client';

import { cn } from '@/lib/utils';
import { Laptop, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';

const THEMES = [
  { value: 'light', label: '浅色', icon: Sun },
  { value: 'dark', label: '深色', icon: Moon },
  { value: 'system', label: '系统', icon: Laptop },
] as const;

const subscribe = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme, theme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
  const activeTheme = mounted ? theme : undefined;

  const resolvedLabel =
    resolvedTheme === 'dark' ? '深色' : resolvedTheme === 'light' ? '浅色' : '...';

  return (
    <div className="surface-panel inline-flex items-center rounded-full p-1">
      {THEMES.map(option => {
        const Icon = option.icon;
        const active = activeTheme === option.value;
        const systemLabel = mounted ? `系统·${resolvedLabel}` : '系统';
        const label = option.value === 'system' ? systemLabel : option.label;
        const ariaLabel =
          option.value === 'system'
            ? mounted
              ? `切换到跟随系统，当前${resolvedLabel}`
              : '切换到跟随系统'
            : `切换到${option.label}`;
        const title =
          option.value === 'system'
            ? mounted
              ? `跟随系统（当前${resolvedLabel}）`
              : '跟随系统'
            : option.label;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setTheme(option.value)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
              active
                ? 'bg-slate-950 text-white shadow-sm dark:bg-white dark:text-slate-950'
                : 'text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'
            )}
            aria-label={ariaLabel}
            title={title}
          >
            <Icon size={14} />
            <span className="hidden sm:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
