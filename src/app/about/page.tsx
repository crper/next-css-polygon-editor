import { Github, Scissors } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* 页面标题 */}
      <div className="mx-auto mb-12 max-w-4xl text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <Scissors className="h-8 w-8 text-blue-600" />
          <h1 className="gradient-text text-3xl font-bold sm:text-4xl">关于项目</h1>
        </div>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          了解CSS多边形魔方的功能特点、技术实现和支持方式
        </p>
      </div>

      {/* 项目介绍 */}
      <div className="mx-auto mb-12 max-w-4xl rounded-lg bg-white/10 p-6 shadow-sm dark:bg-black/10">
        <h2 className="mb-4 text-2xl font-bold">项目简介</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          CSS多边形魔方是一款直观的CSS
          clip-path多边形编辑工具，帮助您轻松创建和编辑复杂的多边形形状。无论您是前端开发者、设计师还是CSS爱好者，都能通过这个工具快速实现各种多边形效果。
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link
            href="https://github.com/crper/next-css-polygon-editor"
            target="_blank"
            className="flex items-center gap-2 rounded-full bg-gray-800 px-4 py-2 text-white transition-colors hover:bg-gray-700"
          >
            <Github className="h-5 w-5" />
            <span>GitHub 仓库</span>
          </Link>
        </div>
      </div>

      {/* 功能特点 */}
      <div className="mx-auto mb-12 max-w-4xl rounded-lg bg-white/10 p-6 shadow-sm dark:bg-black/10">
        <h2 className="mb-4 text-2xl font-bold">功能特点</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-white/5 p-4 dark:bg-black/5">
            <h3 className="mb-2 text-lg font-semibold">可视化编辑</h3>
            <p className="text-gray-600 dark:text-gray-400">
              通过直观的可视化界面拖拽编辑多边形顶点，交互动效反馈，所见即所得
            </p>
          </div>
          <div className="rounded-lg bg-white/5 p-4 dark:bg-black/5">
            <h3 className="mb-2 text-lg font-semibold">实时预览</h3>
            <p className="text-gray-600 dark:text-gray-400">
              实时预览多边形效果，支持自定义背景图片和预览尺寸
            </p>
          </div>
          <div className="rounded-lg bg-white/5 p-4 dark:bg-black/5">
            <h3 className="mb-2 text-lg font-semibold">代码生成</h3>
            <p className="text-gray-600 dark:text-gray-400">
              自动生成CSS clip-path代码，一键复制粘贴到您的项目中
            </p>
          </div>
          <div className="rounded-lg bg-white/5 p-4 dark:bg-black/5">
            <h3 className="mb-2 text-lg font-semibold">渐变背景</h3>
            <p className="text-gray-600 dark:text-gray-400">
              支持线性和径向渐变背景，自定义颜色和方向
            </p>
          </div>
        </div>
      </div>

      {/* 技术栈 */}
      <div className="mx-auto mb-12 max-w-4xl rounded-lg bg-white/10 p-6 shadow-sm dark:bg-black/10">
        <h2 className="mb-4 text-2xl font-bold">技术栈</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="flex flex-col items-center rounded-lg bg-white/5 p-4 text-center dark:bg-black/5">
            <span className="text-lg font-semibold">Next.js 15.3</span>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-white/5 p-4 text-center dark:bg-black/5">
            <span className="text-lg font-semibold">React 19</span>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-white/5 p-4 text-center dark:bg-black/5">
            <span className="text-lg font-semibold">TypeScript</span>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-white/5 p-4 text-center dark:bg-black/5">
            <span className="text-lg font-semibold">Tailwind CSS 4.1</span>
          </div>
        </div>
      </div>

      {/* 支持项目 */}
      <div className="mx-auto mb-12 max-w-4xl rounded-lg bg-white/10 p-6 shadow-sm dark:bg-black/10">
        <h2 className="mb-4 text-2xl font-bold">支持项目</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          如果这个项目对您有帮助，欢迎打赏支持作者继续开发和维护。您的支持是我们持续改进的动力！
        </p>
        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
          <div className="flex flex-col items-center">
            <div className="relative h-[200px] w-[200px] overflow-hidden rounded-lg">
              <Image
                src="/images/sponsor/sponsor_alipay.jpg"
                alt="支付宝打赏"
                fill
                className="object-cover"
              />
            </div>
            <p className="mt-2 text-center font-medium">支付宝打赏</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative h-[200px] w-[200px] overflow-hidden rounded-lg">
              <Image
                src="/images/sponsor/sponsor_wechat.jpg"
                alt="微信打赏"
                fill
                className="object-cover"
              />
            </div>
            <p className="mt-2 text-center font-medium">微信打赏</p>
          </div>
        </div>
      </div>

      {/* 返回首页 */}
      <div className="mx-auto mt-8 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}
