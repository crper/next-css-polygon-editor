import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { withBasePath } from '@/lib/site';
import { cn } from '@/lib/utils';
import { ArrowRight, Github, HeartHandshake, Scissors } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const sponsorImages = [
  {
    src: withBasePath('/images/sponsor/sponsor_alipay.jpg'),
    alt: '支付宝打赏',
    label: '支付宝打赏',
  },
  {
    src: withBasePath('/images/sponsor/sponsor_wechat.jpg'),
    alt: '微信打赏',
    label: '微信打赏',
  },
];

const principles = [
  '可视化编辑顶点',
  '实时预览裁切结果',
  '支持背景图与渐变',
  '复制 polygon 或 CSS',
];
const stack = ['Next.js 16', 'React 19', 'TypeScript 5.9', 'Tailwind CSS 4', 'next-themes'];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <section className="surface-card relative overflow-hidden rounded-[32px] p-6 sm:p-8 lg:p-10">
        <div className="absolute inset-x-0 top-0 h-36 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_70%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.16),transparent_70%)]" />
        <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_300px] lg:items-start">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium tracking-[0.2em] text-blue-700 uppercase dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-200">
              <Scissors className="h-3.5 w-3.5" />
              About project
            </div>
            <div className="space-y-3">
              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">关于这个工具</h1>
              <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 dark:text-slate-300">
                一个面向前端开发与视觉调试场景的 clip-path polygon 工具。首页负责入口与说明，独立
                editor route 负责真正的 workspace 体验，这里继续承担定位、开源与支持信息。
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              {['独立 workspace', '实时预览', '主题切换', 'GitHub Pages 部署'].map(item => (
                <span key={item} className="surface-chip px-3 py-1.5">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <Card className="rounded-[28px] shadow-lg shadow-blue-500/8 dark:shadow-black/20">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">项目定位</CardTitle>
              <CardDescription>少一点网站壳层，多一点直接编辑。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
              <p>它不是庞杂的图形系统，而是围绕 polygon 编辑主路径做收敛。</p>
              <p>当前版本的核心目标，是让它更像一个轻量设计工作区，而不是首页中的内容块。</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">当前核心能力</CardTitle>
              <CardDescription>只保留最有用的那部分。</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 pt-0 sm:grid-cols-2">
              {principles.map(item => (
                <div
                  key={item}
                  className="surface-panel p-4 text-sm leading-6 text-slate-700 dark:text-slate-300"
                >
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">技术栈</CardTitle>
              <CardDescription>当前真实使用的核心栈。</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3 pt-0 sm:grid-cols-5">
              {stack.map(item => (
                <div key={item} className="surface-panel p-4 text-center text-sm font-semibold">
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">查看源码</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
              <p>欢迎查看实现、提交 issue 或参与改进。</p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="https://github.com/crper/next-css-polygon-editor"
                  target="_blank"
                  className={cn(buttonVariants(), 'rounded-full px-4')}
                >
                  <Github className="h-4 w-4" />
                  GitHub 仓库
                </Link>
                <Link
                  href="/editor"
                  className={cn(buttonVariants({ variant: 'outline' }), 'rounded-full px-4')}
                >
                  <ArrowRight className="h-4 w-4" />
                  打开工作区
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <HeartHandshake className="h-5 w-5 text-pink-500" />
                <CardTitle className="text-xl">支持项目</CardTitle>
              </div>
              <CardDescription>如果这个工具对你有帮助，欢迎支持持续维护。</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {sponsorImages.map(image => (
                  <div key={image.src} className="surface-panel p-3">
                    <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-900">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <p className="mt-3 text-center text-sm font-medium">{image.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>
      </section>
    </div>
  );
}
