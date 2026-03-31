# 开发规范

本文档定义了项目的开发规范和最佳实践。

## 📂 目录规范

### 文件命名

- **组件文件**：使用 PascalCase，如 `UserProfile.tsx`
- **工具文件**：使用 camelCase，如 `formatDate.ts`
- **样式文件**：使用 camelCase，如 `index.less`
- **常量文件**：使用 camelCase，如 `constants.ts`

### 目录结构

```
pages/
└── PageName/           # 页面目录使用 PascalCase
    ├── index.tsx       # 页面组件
    ├── index.less      # 页面样式
    └── components/     # 页面级组件
        └── Header.tsx

components/             # 通用组件
└── ComponentName/
    ├── index.tsx
    ├── index.less
    └── types.ts

services/              # API 服务
└── modules/
    └── moduleName.ts  # 模块名使用 camelCase
```

## 🎨 代码规范

### TypeScript

#### 类型定义

```typescript
// ✅ 推荐：使用 interface 定义对象类型
interface User {
  id: string
  name: string
  email?: string // 可选属性
}

// ✅ 推荐：使用 type 定义联合类型
type Status = 'pending' | 'success' | 'error'

// ❌ 避免：使用 any
function getData(): any { } // 不推荐

// ✅ 推荐：使用具体类型
function getData(): User[] { }
```

#### 导入顺序

```typescript
import type { FC } from 'react'
import type { User } from '@/types'

// 2. 第三方库
import { Button, Toast } from 'antd-mobile'
import axios from 'axios'

// 1. React 相关
import { useEffect, useState } from 'react'
import { userApi } from '@/services'
// 3. 项目内部模块
import { useUserStore } from '@/stores'

// 4. 相对路径导入
import Header from './components/Header'
import styles from './index.less'
```

### React 组件

#### 函数组件

```typescript
// ✅ 推荐：使用函数组件 + Hooks
import type { FC } from 'react'

interface Props {
  title: string
  onConfirm?: () => void
}

const MyComponent: FC<Props> = ({ title, onConfirm }) => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>{title}</h1>
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  )
}

export default MyComponent
```

#### Hooks 使用规范

```typescript
function MyComponent() {
  // 1. useState
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<User[]>([])

  // 2. useStore（Zustand）
  const { token, userInfo } = useUserStore()

  // 3. useEffect
  useEffect(() => {
    fetchData()
  }, [])

  // 4. 自定义逻辑
  const fetchData = async () => {
    setLoading(true)
    try {
      const result = await userApi.getList()
      setData(result)
    }
    finally {
      setLoading(false)
    }
  }

  return <div>...</div>
}
```

### 样式规范

#### Less 变量使用

```less
// ✅ 推荐：使用全局变量
@import '@/styles/variables.less';

.container {
  padding: @spacing-lg;
  color: @text-color;
  background: @bg-color-white;
}

// ❌ 避免：硬编码样式值
.container {
  padding: 16px; // 应使用 @spacing-lg
  color: #333; // 应使用 @text-color
  background: #fff; // 应使用 @bg-color-white
}
```

#### CSS Modules

```less
// index.less
.page {
  min-height: 100vh;

  .header {
    padding: 16px;
  }

  .content {
    flex: 1;
  }
}
```

```typescript
// index.tsx
import styles from './index.less'

function Page() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>Header</div>
      <div className={styles.content}>Content</div>
    </div>
  )
}
```

#### Mixins 使用

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

## 🌐 API 请求规范

### 定义 API

```typescript
// src/services/modules/user.ts
import { request } from '../http'

// 1. 定义类型
export interface User {
  id: string
  username: string
  phone: string
}

export interface LoginParams {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  userInfo: User
}

// 2. 定义 API
export const userApi = {
  // 登录
  login: (params: LoginParams) => {
    return request.post<LoginResponse>('/user/login', params)
  },

  // 获取用户信息
  getUserInfo: () => {
    return request.get<User>('/user/info')
  },

  // 更新用户信息
  updateUserInfo: (data: Partial<User>) => {
    return request.put<User>('/user/info', data)
  },
}
```

### 使用 API

```typescript
import { useState } from 'react'
import { Toast } from 'antd-mobile'
import { userApi } from '@/services'
import type { User } from '@/services'

function MyComponent() {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const fetchUser = async () => {
    setLoading(true)
    try {
      const data = await userApi.getUserInfo()
      setUser(data)
    }
    catch (error) {
      // 错误已在 errorHandler 中处理，显示了 Toast
      console.error('获取用户信息失败:', error)
    }
    finally {
      setLoading(false)
    }
  }

  return <div>...</div>
}
```

## 🔄 状态管理规范

### 创建 Store

```typescript
// src/stores/todoStore.ts
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface Todo {
  id: string
  title: string
  completed: boolean
}

interface TodoState {
  // 状态
  todos: Todo[]
  filter: 'all' | 'active' | 'completed'

  // 操作
  addTodo: (title: string) => void
  toggleTodo: (id: string) => void
  removeTodo: (id: string) => void
  setFilter: (filter: TodoState['filter']) => void
}

export const useTodoStore = create<TodoState>()(
  immer(set => ({
    // 初始状态
    todos: [],
    filter: 'all',

    // 添加待办
    addTodo: title =>
      set((state) => {
        state.todos.push({
          id: Date.now().toString(),
          title,
          completed: false,
        })
      }),

    // 切换完成状态
    toggleTodo: id =>
      set((state) => {
        const todo = state.todos.find(t => t.id === id)
        if (todo)
          todo.completed = !todo.completed
      }),

    // 删除待办
    removeTodo: id =>
      set((state) => {
        state.todos = state.todos.filter(t => t.id !== id)
      }),

    // 设置过滤条件
    setFilter: filter =>
      set((state) => {
        state.filter = filter
      }),
  })),
)
```

### 使用 Store

```typescript
import { useTodoStore } from '@/stores/todoStore'

function TodoList() {
  // 只订阅需要的状态
  const todos = useTodoStore(state => state.todos)
  const filter = useTodoStore(state => state.filter)

  // 获取方法
  const { toggleTodo, removeTodo } = useTodoStore()

  // 计算派生状态
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active')
      return !todo.completed
    if (filter === 'completed')
      return todo.completed
    return true
  })

  return (
    <div>
      {filteredTodos.map(todo => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <span>{todo.title}</span>
          <button onClick={() => removeTodo(todo.id)}>删除</button>
        </div>
      ))}
    </div>
  )
}
```

## 🎯 最佳实践

### 1. 避免过度嵌套

```typescript
// ❌ 避免：过度嵌套
function MyComponent() {
  return (
    <div>
      <div>
        <div>
          <div>
            <span>内容</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ✅ 推荐：扁平化结构
function MyComponent() {
  return (
    <div className={styles.container}>
      <span>内容</span>
    </div>
  )
}
```

### 2. 提取可复用逻辑

```typescript
// ✅ 自定义 Hook
function useUserInfo() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    setLoading(true)
    try {
      const data = await userApi.getUserInfo()
      setUser(data)
    }
    finally {
      setLoading(false)
    }
  }

  return { user, loading, refresh: fetchUser }
}

// 使用
function MyComponent() {
  const { user, loading, refresh } = useUserInfo()

  if (loading)
    return <div>加载中...</div>

  return <div>{user?.username}</div>
}
```

### 3. 错误边界

```typescript
// src/components/ErrorBoundary/index.tsx
import React from 'react'
import { ErrorBlock } from 'antd-mobile'

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorBlock
          status="default"
          title="出错了"
          description={this.state.error?.message}
        />
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
```

### 4. 性能优化

```typescript
import { memo, useMemo, useCallback } from 'react'

// 1. 使用 memo 避免不必要的重渲染
const ExpensiveComponent = memo(({ data }: { data: any[] }) => {
  return <div>{/* 渲染数据 */}</div>
})

// 2. 使用 useMemo 缓存计算结果
function MyComponent({ list }: { list: number[] }) {
  const total = useMemo(() => {
    return list.reduce((sum, num) => sum + num, 0)
  }, [list])

  return <div>总和: {total}</div>
}

// 3. 使用 useCallback 缓存回调函数
function MyComponent() {
  const [count, setCount] = useState(0)

  const handleClick = useCallback(() => {
    setCount(c => c + 1)
  }, [])

  return <button onClick={handleClick}>{count}</button>
}
```

## 📝 注释规范

### 函数注释

```typescript
/**
 * 格式化日期
 * @param date - 日期对象或时间戳
 * @param format - 格式字符串，默认 'YYYY-MM-DD'
 * @returns 格式化后的日期字符串
 */
function formatDate(date: Date | number, format = 'YYYY-MM-DD'): string {
  // 实现...
}
```

### 组件注释

````typescript
/**
 * 用户信息卡片组件
 *
 * @example
 * ```tsx
 * <UserCard
 *   user={{ id: '1', name: '张三' }}
 *   onEdit={() => console.log('编辑')}
 * />
 * ```
 */
interface UserCardProps {
  /** 用户信息 */
  user: User
  /** 编辑回调 */
  onEdit?: () => void
}

const UserCard: FC<UserCardProps> = ({ user, onEdit }) => {
  // 实现...
}
````

## 🔒 安全规范

### 1. 敏感信息

```typescript
// ❌ 避免：在代码中硬编码敏感信息
const API_KEY = 'sk-1234567890abcdef'

// ✅ 推荐：使用环境变量
const API_KEY = import.meta.env.VITE_API_KEY
```

### 2. XSS 防护

```typescript
// ❌ 避免：直接渲染用户输入
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ 推荐：使用 React 的自动转义
<div>{userInput}</div>
```

### 3. 数据验证

```typescript
// ✅ 推荐：验证用户输入
function validatePhone(phone: string): boolean {
  return /^1[3-9]\d{9}$/.test(phone)
}

function handleSubmit(phone: string) {
  if (!validatePhone(phone)) {
    Toast.show('请输入正确的手机号')
  }
  // 继续处理...
}
```

## 📱 移动端开发注意事项

### 1. 点击延迟

已通过全局样式解决：

```less
* {
  -webkit-tap-highlight-color: transparent;
}
```

### 2. 安全区域适配

```less
.footer {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
```

### 3. 滚动优化

```less
.scroll-container {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
```

### 4. 1px 边框问题

使用提供的 mixin：

```less
@import '@/styles/mixins.less';

.box {
  .hairline-border(@border-color, bottom);
}
```

## 🧪 测试规范

### 单元测试（待添加）

```typescript
// 推荐使用 Vitest
import { describe, expect, it } from 'vitest'
import { formatDate } from '@/utils/format'

describe('formatDate', () => {
  it('should format date correctly', () => {
    const date = new Date('2024-01-01')
    expect(formatDate(date)).toBe('2024-01-01')
  })
})
```

## 📦 Git 规范

### Commit Message 格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type 类型：**

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档修改
- `style`: 代码格式修改（不影响代码运行）
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

**示例：**

```bash
feat(user): 添加用户登录功能

- 实现登录表单
- 集成登录 API
- 添加 token 存储

Closes #123
```

### 分支管理

- `main` - 主分支（生产环境）
- `develop` - 开发分支
- `feature/*` - 功能分支
- `bugfix/*` - Bug 修复分支
- `hotfix/*` - 紧急修复分支

---

**遵循规范，写出优雅的代码！** ✨
