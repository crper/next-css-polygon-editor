import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowRight, CheckCircle2, Copy, MousePointer2, Sparkles } from 'lucide-react';
import Link from 'next/link';

const highlights = [
  { title: '拖拽编辑', description: '拖点、插点，立刻看到变化。', icon: MousePointer2 },
  {
    title: '大画布 workspace',
    description: '独立 route，进入后就是沉浸式工作区。',
    icon: Sparkles,
  },
  { title: '复制代码', description: '直接拿走 polygon 或 CSS。', icon: Copy },
];

const workflow = ['进入工作区', '拖点 / 插点 / 删点', '复制 polygon 或 CSS'];

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.16fr)_320px] xl:items-start">
        <div className="surface-card relative overflow-hidden rounded-[32px] p-6 sm:p-8 lg:p-10">
          <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_68%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.16),transparent_68%)]" />
          <div className="relative max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium tracking-[0.22em] text-blue-700 uppercase dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-200">
              <Sparkles className="h-3.5 w-3.5" />
              Workspace first
            </div>

            <div className="space-y-4">
              <h1 className="max-w-3xl text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                拖一拖，
                <span className="gradient-text block">直接得到 polygon()</span>
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 dark:text-slate-300">
                首页只负责入口与说明。真正的编辑体验已经迁移到独立
                workspace：更大的画布、更聚焦的操作路径、单一 inspector panel。
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="/editor"
                className={cn(buttonVariants({ size: 'lg' }), 'rounded-full px-6')}
              >
                进入编辑工作区
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className={cn(
                  buttonVariants({ size: 'lg', variant: 'outline' }),
                  'rounded-full px-6'
                )}
              >
                查看项目说明
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {highlights.map(item => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="surface-panel p-4">
                    <div className="mb-3 inline-flex rounded-2xl bg-slate-950 p-2.5 text-white dark:bg-white dark:text-slate-950">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <Card className="rounded-[28px] shadow-lg shadow-blue-500/8 dark:shadow-black/20">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">快速开始</CardTitle>
            <CardDescription>按最短路径进入新的 workspace。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            <div className="space-y-3">
              {workflow.map((item, index) => (
                <div key={item} className="surface-panel flex items-start gap-3 p-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                  <p className="pt-0.5 text-sm leading-6 text-slate-700 dark:text-slate-300">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="surface-soft p-4">
              <div className="mt-0 flex flex-wrap gap-2 text-xs">
                {['顶点选中', '边线插点', 'Delete 删除', '预览辅助', '复制 polygon / CSS'].map(
                  item => (
                    <span key={item} className="surface-chip px-3 py-1.5">
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-8 grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <Card className="rounded-[28px]">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">你会得到什么</CardTitle>
            <CardDescription>更像设计工具的主工作路径。</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 pt-0 sm:grid-cols-3">
            {['更大的中央画布', '统一 inspector 面板', '更短的复制路径'].map(item => (
              <div
                key={item}
                className="surface-panel p-4 text-sm leading-6 text-slate-700 dark:text-slate-300"
              >
                {item}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[28px] bg-slate-950 text-white dark:bg-white dark:text-slate-950">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">小提示</CardTitle>
            <CardDescription className="text-slate-300 dark:text-slate-600">
              首页不再承载完整 editor。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pt-0 text-sm leading-6 text-slate-300 dark:text-slate-700">
            {[
              '真正开始编辑请进入 workspace。',
              '预览与代码都已收敛为辅助能力。',
              '项目说明、开源与支持信息继续放在 About。',
            ].map(item => (
              <div key={item} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
