---
name: ahooks-guide
description: ahooks 使用指南 - React Hooks 工具库最佳实践。MUST be used when writing data fetching code, using useRequest, or implementing async logic in React components. Always prefer ahooks over manual state management.
---

# ahooks 使用指南

ahooks 是一套高质量可靠的 React Hooks 库，提供了大量常用的 Hooks。

## 🎯 何时使用

- 发起 API 请求
- 需要防抖/节流
- 需要轮询
- 状态持久化
- DOM 操作
- 生命周期管理

## 📦 核心 Hooks

### 1. useRequest - 请求管理 ⭐⭐⭐⭐⭐

最常用的 Hook，用于管理异步请求。

#### 基础用法

```tsx
import { useRequest } from 'ahooks'

function Component() {
  const { data, loading, error, run, refresh } = useRequest(fetchData)
  
  return (
    <div>
      {loading && <Loading />}
      {error && <Error error={error} />}
      {data && <Content data={data} />}
    </div>
  )
}
```

#### 手动触发

```tsx
const { run, loading } = useRequest(createUser, {
  manual: true,  // 不自动执行
  onSuccess: (data) => {
    Toast.show('创建成功')
  },
})

// 使用
<Button onClick={() => run(userData)} loading={loading}>创建</Button>
```

#### 依赖刷新

```tsx
const { data } = useRequest(
  () => fetchDetail(id),
  {
    refreshDeps: [id],  // id 变化时自动重新请求
  }
)
```

#### 防抖

```tsx
const { data } = useRequest(
  () => searchAPI(keyword),
  {
    debounceWait: 300,  // 防抖 300ms
    refreshDeps: [keyword],
  }
)
```

#### 节流

```tsx
const { data } = useRequest(fetchData, {
  throttleWait: 1000,  // 节流 1s
})
```

#### 轮询

```tsx
const { data, cancel } = useRequest(checkStatus, {
  pollingInterval: 3000,  // 每 3 秒轮询
  pollingWhenHidden: false,  // 页面隐藏时停止
})

// 条件停止
useEffect(() => {
  if (data?.completed) {
    cancel()
  }
}, [data])
```

#### 缓存

```tsx
const { data } = useRequest(fetchData, {
  cacheKey: 'user-data',  // 缓存 key
  staleTime: 60000,  // 60s 内使用缓存
})
```

#### 完整配置

```tsx
const {
  data,      // 响应数据
  error,     // 错误对象
  loading,   // 加载状态
  run,       // 手动触发
  refresh,   // 刷新（使用上次参数）
  cancel,    // 取消请求
  mutate,    // 直接修改 data
} = useRequest(
  fetchFunction,
  {
    // 基础
    manual: false,           // 是否手动触发
    defaultParams: [],       // 默认参数
    ready: true,            // 是否准备好
    
    // 依赖
    refreshDeps: [],        // 依赖数组
    refreshOnWindowFocus: false,
    
    // 防抖/节流
    debounceWait: 0,
    throttleWait: 0,
    
    // 轮询
    pollingInterval: 0,
    pollingWhenHidden: true,
    
    // 缓存
    cacheKey: '',
    staleTime: 0,
    
    // 重试
    retryCount: 0,
    retryInterval: 0,
    
    // 回调
    onBefore: (params) => {},
    onSuccess: (data, params) => {},
    onError: (error, params) => {},
    onFinally: (params, data, error) => {},
  }
)
```

---

### 2. useDebounce / useThrottle - 防抖/节流

```tsx
import { useDebounce, useThrottle } from 'ahooks'

function Search() {
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value, { wait: 500 })
  
  useEffect(() => {
    // debouncedValue 变化时搜索
    search(debouncedValue)
  }, [debouncedValue])
}
```

---

### 3. useLocalStorageState / useSessionStorageState - 持久化

```tsx
import { useLocalStorageState } from 'ahooks'

function Component() {
  const [user, setUser] = useLocalStorageState('user', {
    defaultValue: null,
  })
  
  // 自动同步到 localStorage
  return (
    <div>
      <div>{user?.name}</div>
      <Button onClick={() => setUser({ name: 'Tom' })}>设置</Button>
    </div>
  )
}
```

---

### 4. usePagination - 分页

```tsx
import { usePagination } from 'ahooks'

function List() {
  const {
    data,
    loading,
    pagination: { current, pageSize, total, onChange },
  } = usePagination(
    ({ current, pageSize }) => fetchList({ current, pageSize })
  )
  
  return (
    <div>
      <List data={data?.list} />
      <Pagination
        current={current}
        pageSize={pageSize}
        total={total}
        onChange={onChange}
      />
    </div>
  )
}
```

---

### 5. useInfiniteScroll - 无限滚动

```tsx
import { useInfiniteScroll } from 'ahooks'

function InfiniteList() {
  const { data, loading, loadMore, noMore } = useInfiniteScroll(
    (d) => fetchMoreData(d?.nextId)
  )
  
  return (
    <div>
      {data?.list.map(item => <Item key={item.id} data={item} />)}
      {!noMore && <Button onClick={loadMore}>加载更多</Button>}
    </div>
  )
}
```

---

### 6. useMount / useUnmount - 生命周期

```tsx
import { useMount, useUnmount } from 'ahooks'

function Component() {
  useMount(() => {
    console.log('组件挂载')
  })
  
  useUnmount(() => {
    console.log('组件卸载')
  })
}
```

---

### 7. useUpdateEffect - 跳过首次执行

```tsx
import { useUpdateEffect } from 'ahooks'

function Component() {
  const [count, setCount] = useState(0)
  
  useUpdateEffect(() => {
    // 首次渲染不执行，仅在更新时执行
    console.log('count 更新了')
  }, [count])
}
```

---

### 8. useSize - 监听元素尺寸

```tsx
import { useSize } from 'ahooks'
import { useRef } from 'react'

function Component() {
  const ref = useRef(null)
  const size = useSize(ref)
  
  return (
    <div ref={ref}>
      宽: {size?.width}px, 高: {size?.height}px
    </div>
  )
}
```

---

### 9. useInViewport - 元素可见性

```tsx
import { useInViewport } from 'ahooks'
import { useRef } from 'react'

function Component() {
  const ref = useRef(null)
  const [inViewport] = useInViewport(ref)
  
  return (
    <div ref={ref}>
      {inViewport ? '在视口内' : '不在视口内'}
    </div>
  )
}
```

---

### 10. useMemoizedFn - 持久化函数引用

```tsx
import { useMemoizedFn } from 'ahooks'

function Component() {
  const [count, setCount] = useState(0)
  
  // 函数引用永远不变，避免子组件重渲染
  const handleClick = useMemoizedFn(() => {
    console.log(count)
  })
  
  return <Child onClick={handleClick} />
}
```

---

## 🎯 实际应用场景

### 场景 1: 列表页

```tsx
import { useRequest } from 'ahooks'
import { getList } from '@/services'

function ListPage() {
  const { data, loading, refresh } = useRequest(getList)
  
  return (
    <PullToRefresh onRefresh={async () => refresh()}>
      {loading && <Loading />}
      {data && <List data={data} />}
    </PullToRefresh>
  )
}
```

### 场景 2: 详情页

```tsx
import { useRequest } from 'ahooks'
import { getDetail } from '@/services'

function DetailPage({ id }: { id: string }) {
  const { data, loading } = useRequest(
    () => getDetail(id),
    { refreshDeps: [id] }
  )
  
  return loading ? <Loading /> : <Detail data={data} />
}
```

### 场景 3: 表单提交

```tsx
import { useRequest } from 'ahooks'
import { createItem } from '@/services'

function CreateForm() {
  const { run: submit, loading } = useRequest(createItem, {
    manual: true,
    onSuccess: () => {
      Toast.show('创建成功')
      navigate('/list')
    },
  })
  
  return <Form onSubmit={submit} loading={loading} />
}
```

### 场景 4: 搜索

```tsx
import { useRequest } from 'ahooks'
import { useState } from 'react'

function Search() {
  const [keyword, setKeyword] = useState('')
  
  const { data, loading } = useRequest(
    () => searchAPI(keyword),
    {
      debounceWait: 300,
      refreshDeps: [keyword],
      ready: !!keyword,  // 有关键词才请求
    }
  )
  
  return (
    <div>
      <SearchBar onChange={setKeyword} />
      <List data={data} loading={loading} />
    </div>
  )
}
```

### 场景 5: 轮询状态

```tsx
import { useRequest } from 'ahooks'
import { useEffect } from 'react'

function OrderStatus({ orderId }: { orderId: string }) {
  const { data, cancel } = useRequest(
    () => getOrderStatus(orderId),
    {
      pollingInterval: 3000,
      pollingWhenHidden: false,
    }
  )
  
  useEffect(() => {
    if (data?.status === 'completed') {
      cancel()
      Toast.show('订单已完成')
    }
  }, [data?.status])
  
  return <Status data={data} />
}
```

---

## ✅ 最佳实践

### ✅ 推荐

```tsx
// 1. 优先使用 useRequest
const { data, loading } = useRequest(fetchData)

// 2. 合理配置选项
const { data } = useRequest(fetchData, {
  cacheKey: 'user-data',  // 缓存
  staleTime: 60000,  // 60s 内复用
})

// 3. 使用生命周期 Hooks
useMount(() => init())
useUnmount(() => cleanup())

// 4. 使用 useMemoizedFn 避免重渲染
const handleClick = useMemoizedFn(() => {})
```

### ❌ 避免

```tsx
// 1. 不要手动管理 loading（useRequest 已提供）
const [loading, setLoading] = useState(false)

// 2. 不要手动 try-catch（useRequest 已处理）
try { await fetch() } catch (e) {}

// 3. 不要过度使用 useEffect
useEffect(() => {
  fetchData()
}, [dep1, dep2, dep3])
// 改用 useRequest 的 refreshDeps
```

---

## 📚 常用 Hooks 速查

| Hook | 用途 | 常用场景 |
|------|------|---------|
| useRequest | 请求管理 | ⭐⭐⭐⭐⭐ 最常用 |
| useDebounce | 防抖 | 搜索框 |
| useThrottle | 节流 | 滚动事件 |
| usePagination | 分页 | 列表分页 |
| useInfiniteScroll | 无限滚动 | 信息流 |
| useLocalStorageState | 本地存储 | 用户设置 |
| useMount | 组件挂载 | 初始化 |
| useUnmount | 组件卸载 | 清理资源 |
| useSize | 元素尺寸 | 响应式布局 |
| useInViewport | 可见性 | 懒加载 |

---

## 🔗 参考资源

- [ahooks 官方文档](https://ahooks.js.org/)
- [GitHub](https://github.com/alibaba/hooks)

---

**使用 ahooks 让代码更简洁、更优雅！**
