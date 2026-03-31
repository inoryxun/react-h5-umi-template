---
name: umi-h5-state
description: Umi H5 项目状态管理规范 - Zustand + TypeScript
tags: [Zustand, State, TypeScript, Store]
---

# Umi H5 状态管理规范

使用 Zustand 进行状态管理的标准规范。

## 🎯 何时使用

- 创建新的 Store
- 管理全局状态
- 需要跨组件共享数据
- 需要持久化状态

## 📁 目录结构

```
src/stores/
├── userStore.ts    # 用户状态
├── appStore.ts     # 应用状态
├── types.ts        # 类型定义（可选）
└── index.ts        # 统一导出
```

## 📝 Store 模板

### 基础 Store

```typescript
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface TodoState {
  // 状态
  todos: Todo[]
  filter: 'all' | 'active' | 'completed'

  // 操作
  addTodo: (text: string) => void
  toggleTodo: (id: string) => void
  removeTodo: (id: string) => void
  setFilter: (filter: TodoState['filter']) => void
}

export const useTodoStore = create<TodoState>()(
  immer(set => ({
    // 初始状态
    todos: [],
    filter: 'all',

    // 添加
    addTodo: text =>
      set((state) => {
        state.todos.push({
          id: Date.now().toString(),
          text,
          completed: false,
        })
      }),

    // 切换
    toggleTodo: id =>
      set((state) => {
        const todo = state.todos.find(t => t.id === id)
        if (todo)
          todo.completed = !todo.completed
      }),

    // 删除
    removeTodo: id =>
      set((state) => {
        state.todos = state.todos.filter(t => t.id !== id)
      }),

    // 设置过滤
    setFilter: filter =>
      set((state) => {
        state.filter = filter
      }),
  })),
)
```

### 持久化 Store

```typescript
import { create } from 'zustand'
import { immer, persist } from 'zustand/middleware'

interface UserState {
  token: string | null
  userInfo: UserInfo | null
  isLogin: boolean

  setToken: (token: string) => void
  setUserInfo: (info: UserInfo) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    immer(set => ({
      token: null,
      userInfo: null,
      isLogin: false,

      setToken: token =>
        set((state) => {
          state.token = token
          state.isLogin = true
        }),

      setUserInfo: userInfo =>
        set((state) => {
          state.userInfo = userInfo
        }),

      clearUser: () =>
        set({
          token: null,
          userInfo: null,
          isLogin: false,
        }),
    })),
    {
      name: 'user-storage', // localStorage key
      partialize: state => ({
        // 只持久化部分状态
        token: state.token,
        userInfo: state.userInfo,
      }),
    },
  ),
)
```

## 组件中使用

### 基础用法

```typescript
import { useTodoStore } from '@/stores'

function TodoList() {
  // 获取状态
  const todos = useTodoStore(state => state.todos)
  const filter = useTodoStore(state => state.filter)

  // 获取方法
  const { addTodo, toggleTodo, removeTodo } = useTodoStore()

  return (
    <div>
      <button onClick={() => addTodo('新任务')}>添加</button>
      {todos.map(todo => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <span>{todo.text}</span>
          <button onClick={() => removeTodo(todo.id)}>删除</button>
        </div>
      ))}
    </div>
  )
}
```

### 计算派生状态

```typescript
function FilteredTodoList() {
  // 订阅多个状态
  const { todos, filter } = useTodoStore()

  // 计算派生值
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === 'active')
        return !todo.completed
      if (filter === 'completed')
        return todo.completed
      return true
    })
  }, [todos, filter])

  return <div>{/* 渲染 */}</div>
}
```

### 异步操作

```typescript
import { productApi } from '@/services'

interface ProductState {
  products: Product[]
  loading: boolean

  fetchProducts: () => Promise<void>
}

export const useProductStore = create<ProductState>()(
  immer(set => ({
    products: [],
    loading: false,

    fetchProducts: async () => {
      set(state => { state.loading = true })
      try {
        const data = await productApi.getList({ pageNum: 1, pageSize: 20 })
        set((state) => {
          state.products = data.list
        })
      }
      finally {
        set(state => { state.loading = false })
      }
    },
  })),
)

// 使用
function ProductList() {
  const { products, loading, fetchProducts } = useProductStore()

  useEffect(() => {
    fetchProducts()
  }, [])

  if (loading)
    return <div>加载中...</div>
  return <div>{/* 渲染 */}</div>
}
```

## 命名规范

```typescript
// Store 命名: use + 领域 + Store
export const useUserStore = create()
export const useProductStore = create()
export const useCartStore = create()

// 状态命名: 名词
items, users, products, loading, error

// 操作命名: 动词 + 名词
addItem, removeItem, updateUser, fetchProducts, setLoading
```

## 性能优化

### 选择性订阅

```typescript
// ❌ 订阅整个 store（不推荐）
const store = useUserStore()

// ✅ 只订阅需要的状态
const token = useUserStore(state => state.token)
const userInfo = useUserStore(state => state.userInfo)
```

### 批量更新

```typescript
// ✅ 一次性更新多个状态
set((state) => {
  state.loading = false
  state.data = data
  state.error = null
})

// 而不是多次 set
```

## Store 组织

### 小型应用

```
src/stores/
├── appStore.ts     # 应用全局状态
├── userStore.ts    # 用户状态
└── index.ts        # 导出
```

### 大型应用

```
src/stores/
├── app/            # 应用相关
│   ├── appStore.ts
│   └── themeStore.ts
├── user/           # 用户相关
│   ├── userStore.ts
│   └── authStore.ts
├── business/       # 业务相关
│   ├── productStore.ts
│   └── orderStore.ts
└── index.ts        # 统一导出
```

## ✅ 检查清单

- [ ] 使用 TypeScript 类型
- [ ] 使用 immer 中间件
- [ ] 合理的状态粒度
- [ ] 必要的持久化配置
- [ ] 选择性订阅状态
- [ ] 导出到 stores/index.ts

## 常见模式

### Loading 状态

```typescript
interface State {
  data: any[]
  loading: boolean
  error: Error | null

  fetchData: () => Promise<void>
}
```

### 分页状态

```typescript
interface State {
  list: Item[]
  pageNum: number
  pageSize: number
  total: number

  setPage: (page: number) => void
  nextPage: () => void
  prevPage: () => void
}
```

### 表单状态

```typescript
interface FormState {
  values: FormValues
  errors: Record<string, string>
  touched: Record<string, boolean>

  setFieldValue: (field: string, value: any) => void
  setFieldError: (field: string, error: string) => void
  setFieldTouched: (field: string, touched: boolean) => void
  reset: () => void
}
```

---

**使用 Zustand 管理全局状态！**
