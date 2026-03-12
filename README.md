# CSS 多边形编辑器

一个面向前端开发与视觉调试场景的 `clip-path: polygon()` 可视化编辑工具。

它不是一个庞杂的图形系统，而是一个更专注的工具型项目：进入画布、调整顶点、确认预览、复制代码。

## Features

- 可视化拖拽 polygon 顶点
- 点击边线 / 中点插入新顶点
- 选中顶点后支持删除与键盘微调
- 实时预览 `clip-path` + 背景图 / 渐变组合效果
- 一键复制 `polygon(...)` 或完整 CSS 示例
- 独立 editor workspace：中央大画布 + 单一 inspector panel
- Desktop / Mobile 共享同一套 IA，移动端改为底部单一 panel
- 支持浅色 / 深色主题切换
- 支持 GitHub Pages 静态导出部署

## Project Structure

```text
src/app/(site)              首页与 About 页面
src/app/(workspace)/editor  独立编辑器工作区
src/components/polygon-editor
├── PolygonEditor.tsx       workspace 编排器
├── components/             画布、预览、设置、导出 UI
└── lib/                    polygon 领域逻辑与工具函数
src/hooks/usePolygon.ts     编辑器状态与交互逻辑
```

## Workspace IA

当前版本已经把“首页里的 editor”拆成独立工作区：

- `/`：工具入口与项目简介
- `/about`：项目说明、开源与支持信息
- `/editor`：真正的 polygon workspace

工作区设计目标：

- 让画布成为主舞台
- 让预览与代码退居辅助位置
- 让设置中心收敛为单一 inspector

## Tech Stack

- Next.js 16
- React 19
- TypeScript 5.9
- Tailwind CSS 4
- next-themes
- lucide-react
- react-hot-toast
- Vitest

## Getting Started

安装依赖：

```bash
pnpm install
```

启动开发环境：

```bash
pnpm dev
```

打开：

```text
http://localhost:3000/editor
```

## Development Commands

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Deployment

项目面向 GitHub Pages project site 部署，生产环境使用静态导出：

- `output: 'export'`
- `basePath: '/next-css-polygon-editor'`
- `assetPrefix: '${BASE_PATH}/'`
- `images.unoptimized: true`
- `trailingSlash: true`

由于 GitHub Pages 不是部署在站点根路径 `/` 下，静态资源统一通过 `src/lib/site.ts` 的 `withBasePath()` 生成 URL，避免 About 页图片与其他 public 资源在子路径部署时出现 404。

## Notes

如果你准备继续扩展这个项目，建议优先沿着下面方向做：

- 继续优化移动端触控体验
- 为 inspector 增加更清晰的状态反馈
- 增加导入 / 导出 preset 能力
- 增加更强的历史记录与快捷键系统

## License

MIT
