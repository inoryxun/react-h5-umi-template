# UnoCSS 使用指南

UnoCSS 是一个即时原子化 CSS 引擎，已成功集成到项目中。

## 📦 已安装的预设

- ✅ **presetUno** - Tailwind CSS / Windi CSS 兼容预设
- ✅ **presetAttributify** - 属性化模式
- ✅ **presetIcons** - 纯 CSS 图标
- ✅ **transformerDirectives** - @apply、@screen 等指令
- ✅ **transformerVariantGroup** - 变体组简写

## 🎨 基础使用

### 1. 类名方式（推荐）

```tsx
// 基础工具类
<div className="flex items-center justify-center p-4 bg-blue-500 text-white">
  居中内容
</div>

// 响应式
<div className="text-sm md:text-base lg:text-lg">
  响应式文本
</div>

// 伪类
<div className="hover:bg-blue-600 active:bg-blue-700">
  可交互元素
</div>

// 变体组简写
<div className="hover:(bg-blue-600 text-white scale-105)">
  组合效果
</div>
```

### 2. 属性化模式

```tsx
// 使用属性而不是 class
<div
  flex="~"
  items="center"
  justify="center"
  p="4"
  bg="blue-500"
  text="white"
>
  属性化模式
</div>

// 响应式属性
<div text="sm md:base lg:lg">
  响应式文本
</div>
```

### 3. 图标使用

需要先安装图标集：

```bash
pnpm add -D @iconify-json/carbon
```

然后使用：

```tsx
// 方式一：类名
<div className="i-carbon-sun" />
<div className="i-carbon-moon text-2xl" />

// 方式二：属性化
<div i-carbon-sun />
<div i-carbon-moon text="2xl" />
```

更多图标集：https://icon-sets.iconify.design/

## 🎯 预定义快捷方式

项目中已经预定义了一些常用的快捷方式：

```tsx
// 布局快捷方式
<div className="flex-center">Flex 居中</div>
<div className="flex-between">两端对齐</div>
<div className="flex-col-center">纵向居中</div>

// 按钮快捷方式
<button className="btn">默认按钮</button>
<button className="btn-primary">主要按钮</button>
<button className="btn-danger">危险按钮</button>
<button className="btn-success">成功按钮</button>

// 卡片
<div className="card">卡片内容</div>

// 文本省略
<div className="text-ellipsis">单行省略</div>
<div className="text-ellipsis-2">两行省略</div>
<div className="text-ellipsis-3">三行省略</div>
```

## 🎨 主题颜色

项目中自定义了一些主题颜色：

```tsx
// 主色调
<div className="bg-primary text-white">主色</div>
<div className="bg-primary-light">浅色</div>
<div className="bg-primary-dark">深色</div>

// 语义化颜色
<div className="text-success">成功</div>
<div className="text-warning">警告</div>
<div className="text-danger">危险</div>
```

## 📱 响应式断点

项目配置的断点：

| 断点 | 尺寸   | 使用示例       |
| ---- | ------ | -------------- |
| xs   | 320px  | `xs:text-sm`   |
| sm   | 375px  | `sm:text-base` |
| md   | 768px  | `md:text-lg`   |
| lg   | 1024px | `lg:text-xl`   |
| xl   | 1280px | `xl:text-2xl`  |

```tsx
<div className="text-sm md:text-lg sm:text-base">
  响应式文本
</div>
```

## 🔧 @apply 指令

在 CSS/Less 文件中使用 @apply：

```less
// src/pages/Example/index.less
.custom-button {
  @apply px-4 py-2 bg-blue-500 text-white rounded;
  @apply hover:bg-blue-600 active:bg-blue-700;
}

.container {
  @apply max-w-screen-lg mx-auto px-4;
}
```

## 📝 完整示例

### 示例 1：卡片组件

```tsx
import type { FC } from 'react'

interface CardProps {
  title: string
  description: string
  imageUrl: string
}

const Card: FC<CardProps> = ({ title, description, imageUrl }) => {
  return (
    <div className="card transition-all duration-300 hover:(scale-105 shadow-lg)">
      <img
        src={imageUrl}
        alt={title}
        className="h-48 w-full rounded-t-lg object-cover"
      />
      <div className="p-4">
        <h3 className="text-ellipsis text-lg font-bold">
          {title}
        </h3>
        <p className="text-ellipsis-2 mt-2 text-sm text-gray-600">
          {description}
        </p>
      </div>
    </div>
  )
}
```

### 示例 2：表单布局

```tsx
function LoginForm() {
  return (
    <div className="min-h-screen flex-center bg-gray-50">
      <div className="max-w-md w-full card p-8">
        <h1 className="mb-6 text-center text-2xl font-bold">
          用户登录
        </h1>

        <form className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">
              用户名
            </label>
            <input
              type="text"
              className="w-full border rounded px-4 py-2 focus:(border-blue-500 outline-none)"
              placeholder="请输入用户名"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              密码
            </label>
            <input
              type="password"
              className="w-full border rounded px-4 py-2 focus:(border-blue-500 outline-none)"
              placeholder="请输入密码"
            />
          </div>

          <button
            type="submit"
            className="w-full btn-primary"
          >
            登录
          </button>
        </form>
      </div>
    </div>
  )
}
```

### 示例 3：网格布局

```tsx
function ProductGrid() {
  return (
    <div className="container mx-auto p-4">
      <h2 className="mb-6 text-2xl font-bold">
        商品列表
      </h2>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        {products.map(product => (
          <div key={product.id} className="card">
            <img
              src={product.image}
              className="h-48 w-full rounded-t object-cover"
            />
            <div className="p-4">
              <h3 className="text-ellipsis font-bold">
                {product.name}
              </h3>
              <p className="mt-2 text-lg text-red-500 font-bold">
                ¥
                {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

### 示例 4：使用图标

```tsx
function IconExample() {
  return (
    <div className="flex items-center gap-4">
      {/* Carbon 图标集 */}
      <div i-carbon-sun className="text-2xl text-yellow-500" />
      <div i-carbon-moon className="text-2xl text-blue-500" />

      {/* 带背景的图标 */}
      <div className="rounded bg-blue-500 p-2">
        <div i-carbon-user className="text-xl text-white" />
      </div>

      {/* 可交互图标 */}
      <button className="rounded p-2 hover:bg-gray-100">
        <div i-carbon-close className="text-xl" />
      </button>
    </div>
  )
}
```

## 🚀 与 Less/CSS 混用

UnoCSS 可以与现有的 Less 样式完美共存：

```tsx
// Component.tsx
import styles from './index.less'

function Component() {
  return (
    <div className={`${styles.customClass} flex items-center p-4`}>
      {/* Less 类名 + UnoCSS 工具类 */}
    </div>
  )
}
```

```less
// index.less
.customClass {
  // 自定义样式
  border: 1px solid #eee;

  // 也可以使用 @apply
  @apply rounded-lg shadow;
}
```

## ⚡ 性能优化

### 1. 使用 safelist（安全列表）

动态类名需要添加到安全列表：

```typescript
// uno.config.ts
export default defineConfig({
  safelist: [
    // 动态颜色类
    'text-red-500',
    'text-blue-500',
    'text-green-500',

    // 或使用正则
    ...Array.from({ length: 10 }, (_, i) => `text-${i + 1}xl`),
  ],
})
```

### 2. 使用 shortcuts（快捷方式）

经常组合使用的工具类应该定义为快捷方式：

```typescript
// uno.config.ts
shortcuts: {
  'my-button': 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600',
}
```

## 📚 常用工具类速查

### 布局

```
flex, inline-flex, block, inline-block, grid, inline-grid
flex-row, flex-col, flex-wrap
items-center, items-start, items-end
justify-center, justify-start, justify-end, justify-between
gap-1, gap-2, gap-4 (4px, 8px, 16px)
```

### 尺寸

```
w-full, w-1/2, w-64 (256px)
h-full, h-screen, h-32 (128px)
max-w-sm, max-w-md, max-w-lg
min-h-screen
```

### 间距

```
p-4 (padding: 16px)
px-4, py-4 (水平/垂直 padding)
m-4 (margin: 16px)
space-x-4 (子元素间距)
```

### 文本

```
text-sm, text-base, text-lg, text-xl
text-left, text-center, text-right
font-bold, font-medium, font-normal
text-gray-500, text-red-500
truncate, line-clamp-2
```

### 背景

```
bg-white, bg-gray-100, bg-blue-500
bg-opacity-50
```

### 边框

```
border, border-2, border-t
border-gray-300, border-blue-500
rounded, rounded-lg, rounded-full
```

### 阴影

```
shadow, shadow-md, shadow-lg
```

### 过渡动画

```
transition, transition-all
duration-300
ease-in-out
```

## 🔗 相关链接

- [UnoCSS 官方文档](https://unocss.dev/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)（语法兼容）
- [Iconify 图标集](https://icon-sets.iconify.design/)
- [UnoCSS 交互式文档](https://unocss.dev/interactive/)

---

**开始使用 UnoCSS，提升开发效率！** ⚡
