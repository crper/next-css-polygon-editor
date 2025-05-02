# 股票投资回报计算工具结构说明

本文档描述了股票投资回报计算工具的项目结构和关键文件。

## 目录结构

```
src/app/
│
├── components/               # 组件目录
│   ├── common/               # 公共组件
│   │   ├── Badge.tsx         # 徽章组件
│   │   ├── Card.tsx          # 卡片组件
│   │   ├── FormattedValue.tsx # 格式化值显示组件
│   │   ├── LoadingSpinner.tsx # 加载指示器组件
│   │   └── ResultsFilter.tsx  # 结果过滤器组件
│   │
│   ├── stock-calculator/     # 股票计算器相关组件
│   │   ├── StockCalculator.tsx    # 股票计算器主组件
│   │   ├── StockCalculatorForm.tsx # 计算参数表单
│   │   ├── StockResultCard.tsx    # 结果卡片组件
│   │   └── ...
│   │
│   ├── CardView.tsx          # 卡片视图组件
│   ├── ChartView.tsx         # 图表视图组件
│   ├── TableView.tsx         # 表格视图组件
│   ├── TabView.tsx           # 标签页视图组件
│   └── DataExportImport.tsx  # 数据导入导出组件
│
├── utils/                    # 工具函数目录
│   ├── calculators.ts        # 计算相关工具函数
│   ├── dataAdapters.ts       # 数据转换适配器
│   ├── formatters.ts         # 格式化工具函数
│   ├── types.ts              # 类型定义
│   └── validation.ts         # 表单验证工具
│
└── ...                       # 其他页面和文件
```

## 主要模块说明

### 1. 公共工具函数

- **formatters.ts**: 提供各种数据格式化功能，如数字格式化、单位转换、百分比格式化等
- **calculators.ts**: 提供股票价格和收益计算的核心功能
- **dataAdapters.ts**: 负责在不同数据格式间进行转换
- **validation.ts**: 提供表单验证功能
- **types.ts**: 集中管理所有类型定义

### 2. 公共UI组件

- **Card.tsx**: 通用卡片容器组件
- **Badge.tsx**: 展示状态或标签的徽章组件
- **FormattedValue.tsx**: 格式化显示数值的组件
- **LoadingSpinner.tsx**: 加载状态指示器
- **ResultsFilter.tsx**: 结果过滤功能组件

### 3. 业务组件

- **StockCalculator.tsx**: 主计算容器组件
- **StockCalculatorForm.tsx**: 参数输入表单
- **StockResultCard.tsx**: 显示单个结果的卡片
- **CardView.tsx**: 卡片视图布局
- **TableView.tsx**: 表格视图布局
- **ChartView.tsx**: 图表视图布局
- **TabView.tsx**: 标签页切换组件

## 数据流

1. 用户通过 `StockCalculatorForm` 输入参数
2. `StockCalculator` 接收参数并使用 `calculators.ts` 中的函数计算结果
3. 结果通过 `dataAdapters.ts` 转换为适合各视图组件的格式
4. 数据传递给 `CardView`/`TableView`/`ChartView` 进行展示
5. 用户可以通过 `ResultsFilter` 筛选结果

## 最佳实践

1. 使用公共工具函数而非重新实现功能
2. 组件属性使用 TypeScript 类型定义
3. 使用 React Hooks 管理状态和副作用
4. 使用 Tailwind CSS 构建一致的 UI 样式
