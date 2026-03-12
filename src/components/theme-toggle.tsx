'use client';

import { cn } from '@/lib/utils';
import { Laptop, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const THEMES = [
  { value: 'light', label: '浅色', icon: Sun },
  { value: 'dark', label: '深色', icon: Moon },
  { value: 'system', label: '系统', icon: Laptop },
] as const;

export function ThemeToggle() {
  const { resolvedTheme, setTheme, theme } = useTheme();
  const resolvedLabel =
    resolvedTheme === 'dark' ? '深色' : resolvedTheme === 'light' ? '浅色' : '...';

  return (
    <div className="surface-panel inline-flex items-center rounded-full p-1">
      {THEMES.map(option => {
        const Icon = option.icon;
        const active = theme === option.value;
        const label = option.value === 'system' ? `系统·${resolvedLabel}` : option.label;

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
            aria-label={`切换到${option.value === 'system' ? `跟随系统，当前${resolvedLabel}` : option.label}`}
            title={option.value === 'system' ? `跟随系统（当前${resolvedLabel}）` : option.label}
          >
            <Icon size={14} />
            <span className="hidden sm:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
