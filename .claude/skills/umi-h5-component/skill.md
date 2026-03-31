---
name: umi-h5-component
description: Umi H5 项目组件开发规范 - React + TypeScript + antd-mobile + UnoCSS
tags: [React, TypeScript, Umi, H5, Mobile, Component]
---

# Umi H5 组件开发规范

用于 Umi 4 + Vite + React 18 + TypeScript + antd-mobile + UnoCSS 的 H5 移动端项目组件开发。

## 🎯 何时使用

当需要创建、修改或优化以下内容时自动应用：

- React 组件
- 页面组件
- 通用组件
- 移动端 UI

## 📦 技术栈

- Umi 4 + Vite + React 18
- TypeScript 5+
- antd-mobile v5
- UnoCSS + Less
- Zustand

## 📁 组件结构

```
src/
├── types/                   # 全局类型定义
│   ├── components.d.ts      # 通用组件 Props
│   └── pages.d.ts           # 页面组件 Props（可选）
├── pages/PageName/          # 页面组件（PascalCase）
│   ├── index.tsx
│   └── index.less           # 可选，优先用 UnoCSS
└── components/MyComponent/  # 通用组件
    ├── index.tsx
    └── index.less
```

⚠️ **类型定义规范**：

- ✅ 通用组件 Props → `src/types/components.d.ts`（全局类型）
- ✅ 页面级组件 Props → 可在组件文件内定义（局部类型）
- ❌ 不再使用 `types.ts` 文件（改用 `.d.ts`）

## 🎨 组件模板

```tsx
import type { FC } from 'react'

interface Props {
  /** 标题 */
  title: string
  /** 描述 */
  description?: string
  /** 点击回调 */
  onClick?: () => void
}

const MyComponent: FC<Props> = ({ title, description, onClick }) => {
  const [loading, setLoading] = useState(false)

  return (
    <div className="flex-center card p-4">
      <h2 className="text-lg font-bold">{title}</h2>
      {description && <p className="text-gray-600">{description}</p>}
      <button className="btn-primary" onClick={onClick}>
        操作
      </button>
    </div>
  )
}

export default MyComponent
```

## 样式规范

### 优先 UnoCSS

```tsx
<div className="flex items-center justify-between rounded bg-white p-4 shadow">
  <span className="text-lg font-bold">文本</span>
  <button className="btn-primary">按钮</button>
</div>
```

### Less（复杂场景）

```less
@import '@/styles/variables.less';

.component {
  @apply rounded-lg shadow; // 可混用 UnoCSS
  padding: @spacing-lg;
}
```

## antd-mobile 集成

```tsx
import { Button, Card, Toast } from 'antd-mobile'

<Card title="标题" className="mb-4">
  <Button block color="primary" onClick={() => Toast.show('成功')}>
    操作
  </Button>
</Card>
```

## 状态管理

```tsx
import { useUserStore } from '@/stores'

const { userInfo, isLogin } = useUserStore()
```

## 移动端优化

```tsx
// 安全区域
<div className="pb-safe">底部内容</div>

// 触摸优化
<div className="active:bg-gray-100 cursor-pointer min-h-11">
  可点击区域
</div>
```

## ✅ 检查清单

- [ ] PascalCase 组件命名
- [ ] 完整 TypeScript 类型
- [ ] JSDoc 注释
- [ ] 优先使用 UnoCSS
- [ ] 使用 antd-mobile 组件
- [ ] 移动端交互优化
- [ ] 错误处理
- [ ] 性能优化（memo/useMemo/useCallback）

---

**创建高质量 H5 组件！**
