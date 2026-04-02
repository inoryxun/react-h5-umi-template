---
name: umi-h5-style
description: Umi H5 项目样式规范 - UnoCSS + Less + 移动端适配。MUST be used when writing styles, className, or creating .less files. Always prefer UnoCSS utilities over custom CSS.
---

# Umi H5 样式规范

UnoCSS + Less 混合样式开发规范。

## 🎯 何时使用

- 编写组件样式
- 页面布局开发
- 移动端适配
- 样式优化

## 🎨 样式方案优先级

1. **UnoCSS 工具类**（最优先）- 简单样式
2. **UnoCSS 快捷方式** - 组合样式
3. **Less + @apply** - 复杂组件
4. **Less 原生** - 特殊场景

## ⚡ UnoCSS 使用

### 基础工具类

```tsx
<div className="flex items-center justify-between rounded bg-white p-4 shadow">
  <span className="text-lg text-gray-800 font-bold">标题</span>
  <button className="btn-primary">操作</button>
</div>
```

### 快捷方式

```tsx
<div className="flex-center">居中</div>
<div className="flex-between">两端对齐</div>
<button className="btn-primary">主要按钮</button>
<div className="card">卡片</div>
<p className="text-ellipsis">单行省略</p>
<p className="text-ellipsis-2">两行省略</p>
```

### 响应式

```tsx
<div className="text-sm sm:text-base md:text-lg lg:text-xl">
  响应式文本
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  响应式网格
</div>
```

### 伪类和状态

```tsx
<button className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 disabled:bg-gray-400">
  交互按钮
</button>

<div className="opacity-0 hover:opacity-100 transition-opacity">
  渐显效果
</div>
```

### 变体组

```tsx
<div className="transition-all hover:(scale-105 bg-blue-600 text-white)">
  组合效果
</div>
```

## 📝 Less 样式

### 使用场景

- 复杂的组件内部样式
- 需要深度嵌套的样式
- 特殊的样式计算

### 模板

```less
@import '@/styles/variables.less';
@import '@/styles/mixins.less';

.component {
  // 可混用 UnoCSS
  @apply rounded-lg shadow;

  // Less 变量
  padding: @spacing-lg;
  color: @text-color;

  // 嵌套
  .header {
    @apply flex-between;
    border-bottom: 1px solid @border-color;
  }

  // Mixins
  .content {
    .hairline-border(@border-color, bottom);
  }

  // 伪类
  &:hover {
    background-color: @bg-color-gray;
  }
}
```

### 全局变量

```less
// src/styles/variables.less
@primary-color: #1677ff;
@text-color: #333;
@spacing-lg: 16px;
```

### Mixins

```less
// src/styles/mixins.less
.flex-center() {
  display: flex;
  align-items: center;
  justify-center: center;
}

.ellipsis(@lines: 1) when (@lines = 1) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

## 📱 移动端适配

### px 自动转 vw

```less
// 直接写 px，会自动转换为 vw
.box {
  width: 375px; // → 100vw
  height: 200px; // → 53.333vw
  font-size: 14px; // → 3.733vw
}
```

### 忽略转换

```less
// 使用 .ignore 类名
.ignore {
  width: 100px; // 不转换
}

// 或使用 /*px*/ 注释
.box {
  border: 1px solid #eee; /* 不转换 */
}
```

### 安全区域

```tsx
// UnoCSS
<div className="pb-safe">底部</div>

// Less
.footer {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
```

### 1px 边框

```tsx
// UnoCSS
<div className="hairline-bottom">1px 底边框</div>

// Less
.box {
  .hairline-border(@border-color, bottom);
}
```

## 🎯 最佳实践

### 优先级

```tsx
// ✅ 简单样式用 UnoCSS
<div className="p-4 bg-white rounded">

// ✅ 复杂组件用 Less + @apply
// index.less
.complex-component {
  @apply rounded-lg shadow;

  .inner {
    // 复杂逻辑
  }
}
```

### 命名

```less
// BEM 命名（Less）
.component-name {
  &__element {
  }
  &--modifier {
  }
}

// 或语义化命名
.header {
}
.content {
}
.footer {
}
```

### 避免冲突

```tsx
// ✅ CSS Modules + UnoCSS
import styles from './index.less'

<div className={`${styles.custom} flex items-center`}>
  {/* Less 类 + UnoCSS */}
</div>
```

## 🎨 主题定制

### UnoCSS 主题色

```tsx
<div className="bg-primary">主色</div>
<div className="text-success">成功色</div>
<div className="border-warning">警告色</div>
```

### antd-mobile 主题

```tsx
// app.tsx
import { ConfigProvider } from 'antd-mobile'

<ConfigProvider
  theme={{
    '--adm-color-primary': '#1677ff',
  }}
>
  <App />
</ConfigProvider>
```

## ✅ 检查清单

- [ ] 优先使用 UnoCSS
- [ ] 导入必要的 Less 变量/mixins
- [ ] 移动端适配（安全区域、1px 边框）
- [ ] 响应式设计
- [ ] 性能优化（避免过度嵌套）
- [ ] 与 antd-mobile 样式兼容

## 常用工具类

```
布局: flex, grid, flex-center, flex-between
间距: p-4, m-4, gap-4, space-y-4
尺寸: w-full, h-screen, max-w-md
文本: text-lg, font-bold, text-center, text-ellipsis
颜色: bg-white, text-gray-600, border-gray-200
边框: rounded, border, shadow
动画: transition, hover:scale-105, active:opacity-80
```

---

**使用现代化样式方案！**
