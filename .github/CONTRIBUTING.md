# 贡献指南

感谢您考虑为 CSS 多边形编辑器项目做出贡献！以下是一些指导原则，帮助您参与项目开发。

## 开发流程

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'feat: 添加一些很棒的功能'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建一个 Pull Request

## 提交规范

我们使用 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/v1.0.0/) 规范来标准化提交信息。

提交格式如下：

```
<类型>[可选的作用域]: <描述>

[可选的正文]

[可选的脚注]
```

常用的提交类型：

- `feat`: 新功能
- `fix`: 修复 Bug
- `docs`: 文档更新
- `style`: 代码风格或格式修改（不影响代码逻辑）
- `refactor`: 代码重构（既不是新增功能，也不是修复 Bug）
- `perf`: 性能优化
- `test`: 添加测试
- `chore`: 构建过程或辅助工具的变动

## 代码风格

- 使用 TypeScript 编写代码
- 遵循 ESLint 和 Prettier 配置
- 组件使用函数式组件和 React Hooks
- 使用 Tailwind CSS 进行样式设计

## 开发设置

1. 安装依赖：

   ```bash
   pnpm install
   ```

2. 启动开发服务器：

   ```bash
   pnpm dev
   ```

3. 构建项目：
   ```bash
   pnpm build
   ```

## 问题和功能请求

如果您发现了 Bug 或有功能建议，请创建一个 Issue。请尽可能详细地描述问题或建议，包括：

- 对于 Bug：复现步骤、预期行为和实际行为
- 对于功能请求：详细描述功能及其使用场景

## 许可证

通过贡献代码，您同意您的贡献将在 [MIT 许可证](../LICENSE) 下发布。
