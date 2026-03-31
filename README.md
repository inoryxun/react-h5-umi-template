# Umi 4 + Vite + React H5 项目模板

> 基于 Umi 4 + Vite + React + antd-mobile 的移动端 H5 项目模板

## ✨ 特性

- 🚀 **Vite 构建** - 极速的开发体验，秒级热更新
- 📱 **移动端适配** - postcss-px-to-viewport 自动将 px 转换为 vw
- 🎨 **UI 组件库** - antd-mobile v5，移动端组件库
- 🔄 **状态管理** - Zustand 轻量级状态管理，支持持久化
- 🌐 **网络请求** - Axios 完整封装，拦截器、错误处理
- 📝 **TypeScript** - 完整的类型支持
- 🎯 **代码规范** - @antfu/eslint-config 开箱即用
- 🎭 **路由系统** - Umi 内置路由，支持布局嵌套
- 🔧 **开发调试** - VConsole 移动端调试工具
- ⚡ **UnoCSS** - 即时原子化 CSS 引擎，Tailwind CSS 超集

## 📦 技术栈

| 类别       | 技术                 | 版本    |
| ---------- | -------------------- | ------- |
| 框架       | Umi                  | ^4.6.35 |
| 构建工具   | Vite                 | 内置    |
| UI 库      | antd-mobile          | ^5.37.1 |
| 状态管理   | Zustand              | ^4.5.2  |
| 请求库     | Axios                | ^1.6.8  |
| 样式处理   | Less + UnoCSS        | 内置    |
| 原子化 CSS | UnoCSS               | ^66.6.7 |
| 代码规范   | @antfu/eslint-config | ^7.7.3  |
| 包管理器   | pnpm                 | >=8.0.0 |

## 📚 文档导航

| 文档                               | 说明                       |
| ---------------------------------- | -------------------------- |
| [README.md](README.md)             | 项目使用说明（本文档）     |
| [DEVELOPMENT.md](DEVELOPMENT.md)   | 开发规范和最佳实践         |
| [SKILLS.md](SKILLS.md)             | Claude Code Skills 配置    |
| [UNOCSS.md](UNOCSS.md)             | UnoCSS 原子化 CSS 使用指南 |
| [.claude/skills/](.claude/skills/) | 项目级开发规范 Skills      |

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:8000

### 构建生产版本

```bash
pnpm build
```

### 预览生产构建

```bash
pnpm preview
```

## 📝 NPM Scripts

| 命令                 | 说明                |
| -------------------- | ------------------- |
| `pnpm dev`           | 启动开发服务器      |
| `pnpm build`         | 构建生产版本        |
| `pnpm build:analyze` | 构建并分析包大小    |
| `pnpm preview`       | 预览生产构建        |
| `pnpm lint`          | ESLint 代码检查     |
| `pnpm lint:fix`      | ESLint 自动修复     |
| `pnpm type-check`    | TypeScript 类型检查 |

## 📁 项目结构

```
my-app/
├── public/                    # 静态资源（不经过构建）
│   └── favicon.ico
├── src/
│   ├── app.tsx                # Umi 运行时配置
│   ├── global.less            # 全局样式
│   ├── layouts/               # 布局组件
│   │   ├── BasicLayout/       # 基础布局（带底部导航）
│   │   └── BlankLayout/       # 空白布局
│   ├── pages/                 # 页面组件
│   │   ├── Home/              # 首页
│   │   ├── Login/             # 登录页
│   │   └── User/              # 用户中心
│   ├── services/              # API 服务层
│   │   ├── http/              # HTTP 封装
│   │   │   ├── index.ts       # Axios 实例
│   │   │   ├── types.ts       # 类型定义
│   │   │   └── errorHandler.ts # 错误处理
│   │   ├── modules/           # API 模块
│   │   │   └── user.ts        # 用户相关 API
│   │   └── index.ts           # 统一导出
│   ├── stores/                # 状态管理
│   │   ├── userStore.ts       # 用户状态
│   │   ├── appStore.ts        # 应用状态
│   │   └── index.ts           # 统一导出
│   ├── styles/                # 全局样式
│   │   ├── reset.less         # 样式重置
│   │   ├── variables.less     # 样式变量
│   │   ├── mixins.less        # 样式 Mixins
│   │   └── global.less        # 全局样式入口
│   └── types/                 # 全局类型定义
├── .env                       # 公共环境变量
├── .env.development           # 开发环境变量
├── .env.production            # 生产环境变量
├── .umirc.ts                  # Umi 配置文件
├── postcss.config.js          # PostCSS 配置
├── eslint.config.mjs          # ESLint 配置
├── tsconfig.json              # TypeScript 配置
└── package.json               # 项目配置
```

## 🔧 配置说明

### 1. 环境变量

项目使用环境变量来区分不同环境的配置。

#### `.env` - 公共配置

```bash
VITE_APP_TITLE=H5应用
VITE_APP_VERSION=1.0.0
```

#### `.env.development` - 开发环境

```bash
# API 配置
VITE_API_BASE_URL=https://dev-api.example.com
VITE_API_TIMEOUT=15000

# 调试配置
VITE_ENABLE_MOCK=true
VITE_ENABLE_VCONSOLE=true
```

#### `.env.production` - 生产环境

```bash
# API 配置
VITE_API_BASE_URL=https://api.example.com
VITE_API_TIMEOUT=15000

# 调试配置
VITE_ENABLE_MOCK=false
VITE_ENABLE_VCONSOLE=false
```

**注意**：

- 环境变量必须以 `VITE_` 开头才能在客户端访问
- 使用 `import.meta.env.VITE_XXX` 访问环境变量

### 2. 移动端适配

项目使用 `postcss-px-to-viewport-8-plugin` 插件实现移动端适配。

#### 配置参数（postcss.config.js）

```javascript
{
  viewportWidth: 375,      // 设计稿宽度
  viewportUnit: 'vw',      // 使用 vw 单位
  exclude: [/node_modules/, /antd-mobile/] // 排除 UI 库
}
```

#### 使用方法

直接在样式中使用 px 单位，会自动转换为 vw：

```less
.box {
  width: 375px; // 转换为 100vw
  height: 200px; // 转换为 53.333vw
  font-size: 14px; // 转换为 3.733vw
}
```

#### 忽略转换

如果某些元素不想被转换，可以添加 `.ignore` 类名：

```less
.ignore {
  width: 100px; // 不会被转换，保持 100px
}
```

### 3. 状态管理

项目使用 Zustand 进行状态管理，轻量且易用。

#### 使用示例

```typescript
import { useUserStore } from '@/stores'

function MyComponent() {
  // 获取状态
  const { token, userInfo, isLogin } = useUserStore()

  // 获取方法
  const { setToken, setUserInfo, clearUser } = useUserStore()

  // 使用
  const handleLogin = () => {
    setToken('your-token')
    setUserInfo({ username: 'user', phone: '1234567890' })
  }

  return <div>{userInfo?.username}</div>
}
```

#### 持久化配置

用户状态会自动保存到 localStorage（Key: `user-storage`），刷新页面后自动恢复。

### 4. 网络请求

项目对 Axios 进行了完整封装，包含请求/响应拦截、错误处理等。

#### 使用示例

```typescript
import { request, userApi } from '@/services'

// 方式一：使用封装的 request
const data = await request.get('/api/users')
const result = await request.post('/api/login', { username, password })

// 方式二：使用 API 模块（推荐）
const response = await userApi.login({ username, password })
const userInfo = await userApi.getUserInfo()
```

#### 添加新的 API 模块

在 `src/services/modules/` 下创建新文件：

```typescript
// src/services/modules/product.ts
import { request } from '../http'

export interface Product {
  id: string
  name: string
  price: number
}

export const productApi = {
  getList: () => request.get<Product[]>('/products'),
  getDetail: (id: string) => request.get<Product>(`/products/${id}`),
  create: (data: Partial<Product>) => request.post('/products', data),
}
```

然后在 `src/services/index.ts` 中导出：

```typescript
export * from './modules/product'
```

### 5. 路由配置

路由配置在 `.umirc.ts` 中：

```typescript
routes: [
  {
    path: '/',
    component: '@/layouts/BasicLayout',
    routes: [
      { path: '/', component: '@/pages/Home' },
      { path: '/user', component: '@/pages/User' },
    ],
  },
  {
    path: '/login',
    component: '@/layouts/BlankLayout',
    routes: [
      { path: '/login', component: '@/pages/Login' },
    ],
  },
]
```

## 💡 开发指南

### TypeScript 类型定义

⚠️ **重要规范**：项目使用全局类型声明（`.d.ts` 文件）

```typescript
// ✅ 正确：在 src/types/*.d.ts 中定义全局类型
// src/types/product.d.ts
interface Product {
  id: string
  name: string
  price: number
}

// ✅ 正确：直接使用全局类型，无需 import
// src/services/modules/product.ts
export const productApi = {
  getList: () => request.get<Product[]>('/products'),
}

// src/components/ProductCard.tsx
function ProductCard({ product }: { product: Product }) {
  return <div>{product.name}</div>
}
```

**注意**：

- ❌ 不在 `.d.ts` 中使用 `export`
- ❌ 不需要 `import` 类型
- ✅ 类型自动全局可用

详细规范见 `/umi-h5-types`

### 创建新页面

1. 在 `src/pages/` 下创建页面目录
2. 添加页面组件和样式
3. 在 `.umirc.ts` 中配置路由

示例：

```bash
src/pages/
└── About/
    ├── index.tsx
    └── index.less
```

```typescript
// src/pages/About/index.tsx
import styles from './index.less'

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <h1>关于我们</h1>
    </div>
  )
}
```

```typescript
// .umirc.ts
routes: [
  {
    path: '/',
    component: '@/layouts/BasicLayout',
    routes: [
      { path: '/about', component: '@/pages/About' },
    ],
  },
]
```

### 使用 antd-mobile 组件

```typescript
import { Button, Toast, List } from 'antd-mobile'

function MyComponent() {
  return (
    <>
      <Button onClick={() => Toast.show('点击了')}>
        点击我
      </Button>

      <List>
        <List.Item>列表项 1</List.Item>
        <List.Item>列表项 2</List.Item>
      </List>
    </>
  )
}
```

更多组件请查看：https://mobile.ant.design/zh/components

### 使用 UnoCSS

UnoCSS 是一个即时原子化 CSS 引擎，兼容 Tailwind CSS 语法。

#### 基础用法

```tsx
// 工具类方式
<div className="flex items-center justify-center p-4 bg-blue-500 text-white">
  内容
</div>

// 响应式
<div className="text-sm md:text-base lg:text-lg">
  响应式文本
</div>

// 使用预定义快捷方式
<button className="btn-primary">按钮</button>
<div className="flex-center">居中布局</div>
<div className="card">卡片</div>
```

#### 图标使用

```bash
# 先安装图标集
pnpm add -D @iconify-json/carbon
```

```tsx
// 使用图标
<div className="i-carbon-sun text-2xl" />
<div className="i-carbon-moon text-lg text-blue-500" />
```

**详细文档**：查看 [UNOCSS.md](UNOCSS.md) 获取完整使用指南

### 样式编写

#### 使用变量

```less
@import '@/styles/variables.less';

.box {
  color: @text-color;
  background: @bg-color;
  padding: @spacing-lg;
  border-radius: @border-radius-md;
}
```

#### 使用 Mixins

```less
@import '@/styles/mixins.less';

.container {
  .flex-center(); // Flexbox 居中
}

.title {
  .ellipsis(2); // 两行省略
}

.card {
  .hairline-border(@border-color, bottom); // 1px 底部边框
}
```

## 🔨 常见问题

### 1. 端口被占用

修改 `.umirc.ts` 中的端口：

```typescript
export default defineConfig({
  port: 3000, // 修改为其他端口
})
```

### 2. API 请求 CORS 错误

开发环境使用代理，在 `.umirc.ts` 中配置：

```typescript
proxy: {
  '/api': {
    target: 'https://your-api.com',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  },
}
```

### 3. 移动端调试

开发环境已自动启用 VConsole，可以在移动端查看 console 日志。

如需关闭，修改 `.env.development`：

```bash
VITE_ENABLE_VCONSOLE=false
```

### 4. 样式不生效

检查是否导入了全局样式：

```typescript
// src/global.less 应该已自动加载
// 如果使用变量或 mixins，需要在组件样式中导入
@import '@/styles/variables.less';
@import '@/styles/mixins.less';
```

### 5. TypeScript 类型错误

运行类型检查：

```bash
pnpm type-check
```

## 📚 相关文档

- [Umi 官方文档](https://umijs.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [antd-mobile 文档](https://mobile.ant.design/)
- [Zustand 文档](https://docs.pmnd.rs/zustand)
- [Axios 文档](https://axios-http.com/)
- [UnoCSS 文档](https://unocss.dev/)
- [@antfu/eslint-config](https://github.com/antfu/eslint-config)

## 🎯 开发规范 Skills

项目已配置专属的开发规范 Skills（位于 `.claude/skills/`），确保代码质量和一致性：

| Skill              | 说明                   |
| ------------------ | ---------------------- |
| `umi-h5-component` | React 组件开发规范     |
| `umi-h5-api`       | API 请求封装规范       |
| `umi-h5-state`     | Zustand 状态管理规范   |
| `umi-h5-style`     | UnoCSS + Less 样式规范 |
| `umi-h5-workflow`  | 完整开发工作流程       |

**使用方式**：

- 自动触发：Claude Code 会根据上下文自动应用相关规范
- 手动调用：使用 `/skill-name` 命令
- 详细说明：查看 [.claude/skills/README.md](.claude/skills/README.md)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

---

**开发愉快！** 🎉
# Test
