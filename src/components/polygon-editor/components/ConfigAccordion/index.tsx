'use client';

import clsx from 'clsx';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

/**
 * 配置手风琴组件属性
 */
export interface ConfigAccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

/**
 * 配置手风琴组件
 * 提供可折叠的配置面板，用于分组显示配置项
 */
export function ConfigAccordion({ title, children, defaultOpen = false }: ConfigAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-3 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
      <button
        className={clsx(
          'flex w-full items-center justify-between px-4 py-3 text-left transition-colors',
          isOpen
            ? 'bg-blue-50 dark:bg-blue-900/20'
            : 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-800/50 dark:hover:bg-gray-800'
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm font-medium">{title}</span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        )}
      </button>
      <div
        className={clsx(
          'overflow-hidden transition-all duration-300 ease-in-out',
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
