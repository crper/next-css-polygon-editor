# CSS多边形编辑器

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/crper/next-css-polygon-editor?style=flat-square)
![GitHub forks](https://img.shields.io/github/forks/crper/next-css-polygon-editor?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/crper/next-css-polygon-editor?style=flat-square)
![GitHub license](https://img.shields.io/github/license/crper/next-css-polygon-editor?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/crper/next-css-polygon-editor?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-15.3.1-blue?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-blue?style=flat-square)

</div>

<p align="center">一款直观的CSS clip-path多边形编辑工具，帮助您轻松创建和编辑复杂的多边形形状。</p>

## 🎯 功能特色

### 基础功能

- ✏️ 可视化编辑多边形顶点，所见即所得
- 🔄 实时预览多边形效果
- 📋 自动生成CSS clip-path代码
- 📱 响应式设计，适配不同设备
- 🎨 支持自定义背景图片和预览尺寸

### 使用方式

- 🖱️ 拖拽顶点 - 直观调整多边形形状
- 📝 复制代码 - 一键复制生成的CSS代码
- 🔍 实时预览 - 即时查看效果

### Demo演示

https://github.com/user-attachments/assets/87d41b8b-c0c0-4a67-8950-9cb3c8709212



## 🔧 技术栈

<table>
<tr>
<td align="center">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg" width="40" height="40"/><br />
Next.js 15.3
</td>
<td align="center">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" width="40" height="40"/><br />
React 19
</td>
<td align="center">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" width="40" height="40"/><br />
TypeScript
</td>
<td align="center">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg" width="40" height="40"/><br />
Tailwind CSS 4.1
</td>
</tr>
</table>

## 📁 项目结构

```
.
├── src/
│   ├── app/               # 应用路由
│   │   ├── page.tsx       # 首页
│   │   ├── about/         # 关于页面
│   │   └── layout.tsx     # 全局布局
│   ├── components/        # 组件目录
│   │   ├── ui/            # 通用UI组件
│   │   └── polygon-editor/ # 多边形编辑器相关组件
│   │       ├── components/    # 编辑器子组件
│   │       │   ├── CodePreview.tsx   # 代码预览组件
│   │       │   ├── ControlPanel.tsx  # 控制面板组件
│   │       │   ├── PolygonCanvas.tsx # 多边形画布组件
│   │       │   └── PolygonPreview.tsx # 多边形预览组件
│   │       └── PolygonEditor.tsx     # 主编辑器组件
│   ├── hooks/            # 自定义钩子
│   │   └── usePolygon.ts # 多边形状态管理钩子
│   └── utils/            # 全局工具函数
├── public/               # 静态资源目录
├── package.json          # 依赖配置
├── postcss.config.mjs    # PostCSS配置
└── tsconfig.json         # TypeScript配置
```

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

### 构建项目

```bash
pnpm build
```

## 📝 使用方法

1. 在画布上拖拽顶点调整多边形形状
2. 实时查看预览效果
3. 复制生成的CSS代码到您的项目中

## 🤝 贡献

欢迎提交问题和贡献代码，请参阅 [贡献指南](.github/CONTRIBUTING.md)。

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)。
