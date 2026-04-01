# AGENT_LEARNINGS

## 2026-04-01

### 错误

- 在 `src/app/globals.css` 里给新自定义类写 `@apply surface-soft`，导致 Tailwind 4 构建时报 `Cannot apply unknown utility class 'surface-soft'`。

### 应避免的模式

- 不要在 `@apply` 里继续套用项目自定义 class。
- 不要只看 `eslint` / `tsc` / `vitest`，样式层改动后还要跑一次真实 `next build`。

### 更好的方法

- 在新的 CSS 抽象类里直接展开原子 utility，或改成普通 CSS 属性组合。
- 只要改了 `globals.css`、Tailwind class 结构、container query 或 design token，就把 `build` 当成必跑项。
