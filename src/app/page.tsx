import { PolygonEditor } from '@/components/polygon-editor';
import { Code, Layers, Palette, Scissors, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* 页面标题和介绍 */}
      <div className="mx-auto mb-12 max-w-4xl text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <Scissors className="h-8 w-8 text-blue-600" />
          <h1 className="gradient-text text-3xl font-bold sm:text-4xl">CSS 多边形魔方</h1>
          <Sparkles className="h-6 w-6 text-amber-500" />
        </div>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          一款强大的CSS clip-path多边形编辑工具，支持渐变效果，帮助您轻松创建和编辑精美的多边形形状
        </p>
      </div>

      {/* 编辑器区域 */}
      <PolygonEditor />

      {/* 功能特点介绍 */}
      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {featureCards.map((feature, index) => (
          <div
            className="flex h-full flex-col rounded-lg bg-white/5 p-5 shadow-sm transition-all duration-300 hover:shadow-md dark:bg-black/5"
            key={index}
          >
            <div className="mb-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900">
                {feature.icon}
              </span>
            </div>
            <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
            <p className="flex-grow text-sm text-gray-600 dark:text-gray-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const featureCards = [
  {
    title: '可视化编辑',
    description: '通过直观的可视化界面拖拽编辑多边形顶点，交互动效反馈，所见即所得',
    icon: <Scissors className="h-6 w-6" />,
  },
  {
    title: '实时预览',
    description: '实时预览多边形效果，支持自定义背景图片和预览尺寸',
    icon: <Code className="h-6 w-6" />,
  },
  {
    title: '代码生成',
    description: '自动生成CSS clip-path代码，一键复制粘贴到您的项目中',
    icon: <Layers className="h-6 w-6" />,
  },
  {
    title: '渐变背景',
    description: '支持线性和径向渐变背景，自定义颜色和方向',
    icon: <Palette className="h-6 w-6" />,
  },
];
