---
name: umi-h5-api
description: Umi H5 项目 API 请求规范 - Axios + TypeScript + ahooks。MUST be used when creating API interfaces, writing request methods, or working with services/ directory. Always use ahooks useRequest for data fetching.
---

# Umi H5 API 请求规范

定义项目中所有 API 请求的标准写法，推荐使用 ahooks 简化请求逻辑。

## 🎯 何时使用

- 创建新 API 接口
- 封装请求方法
- 处理 HTTP 请求
- 添加接口类型

## 📁 目录结构

```
src/
├── types/              # 类型定义（.d.ts 文件）
│   ├── user.d.ts
│   ├── product.d.ts
│   ├── api.d.ts        # API 通用类型
│   └── common.d.ts
└── services/
    ├── http/
    │   ├── index.ts        # Axios 实例
    │   └── errorHandler.ts # 错误处理
    ├── modules/
    │   ├── user.ts         # 用户 API
    │   ├── product.ts      # 产品 API
    │   └── order.ts        # 订单 API
    └── index.ts            # 统一导出
```

## 📝 API 开发步骤

### Step 1: 定义全局类型（`.d.ts` 文件）

```typescript
// src/types/product.d.ts
/** 产品信息 */
interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  imageUrl: string
}

/** 产品列表查询参数 */
interface ProductListParams extends PageParams {
  keyword?: string
  category?: string
}

/** 创建产品参数 */
interface CreateProductParams {
  name: string
  price: number
  stock: number
}
```

⚠️ **重要**：

- ❌ 不使用 `export interface`
- ❌ 不使用 `import`
- ✅ 类型自动全局可用

### Step 2: 实现 API 模块

```typescript
// src/services/modules/product.ts
import { request } from '../http'

// 直接使用全局类型，无需 import
/** API 方法 */
export const productApi = {
  /** 获取列表 */
  getList: (params: ProductListParams) => {
    return request.get<PageData<Product>>('/products', { params })
  },

  /** 获取详情 */
  getDetail: (id: string) => {
    return request.get<Product>(`/products/${id}`)
  },

  /** 创建 */
  create: (data: Partial<Product>) => {
    return request.post<Product>('/products', data)
  },

  /** 更新 */
  update: (id: string, data: Partial<Product>) => {
    return request.put<Product>(`/products/${id}`, data)
  },

  /** 删除 */
  delete: (id: string) => {
    return request.delete(`/products/${id}`)
  },
}
```

## 🚀 组件中使用（推荐 ahooks）

### ⭐ 方式 1: 使用 ahooks useRequest（推荐）

```typescript
import { useRequest } from 'ahooks'
import { productApi } from '@/services'

function ProductList() {
  // 自动请求（组件挂载时）
  const { data, loading, error, refresh } = useRequest(
    () => productApi.getList({ pageNum: 1, pageSize: 20 })
  )

  return (
    <div>
      {loading && <Loading />}
      {error && <Error />}
      {data && <List data={data.list} onRefresh={refresh} />}
    </div>
  )
}
```

**优势：**
- ✅ 自动管理 loading 状态
- ✅ 自动错误处理
- ✅ 代码减少 60%
- ✅ 支持防抖、节流、轮询、缓存等高级功能

### 方式 2: 手动触发请求

```typescript
import { useRequest } from 'ahooks'
import { productApi } from '@/services'

function ProductCreate() {
  const { run: createProduct, loading } = useRequest(
    (data: CreateProductParams) => productApi.create(data),
    {
      manual: true,  // 手动触发
      onSuccess: () => {
        Toast.show('创建成功')
      },
    }
  )

  const handleSubmit = (formData: CreateProductParams) => {
    createProduct(formData)
  }

  return <Form onSubmit={handleSubmit} loading={loading} />
}
```

### 方式 3: 带参数依赖刷新

```typescript
import { useRequest } from 'ahooks'
import { productApi } from '@/services'

function ProductDetail({ id }: { id: string }) {
  // id 变化时自动重新请求
  const { data, loading } = useRequest(
    () => productApi.getDetail(id),
    {
      refreshDeps: [id],  // 依赖变化自动刷新
    }
  )

  return <Detail data={data} loading={loading} />
}
```

### 方式 4: 防抖搜索

```typescript
import { useRequest } from 'ahooks'
import { productApi } from '@/services'

function ProductSearch() {
  const [keyword, setKeyword] = useState('')

  const { data, loading } = useRequest(
    () => productApi.search({ keyword }),
    {
      debounceWait: 300,  // 防抖 300ms
      refreshDeps: [keyword],
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

### 方式 5: 轮询

```typescript
import { useRequest } from 'ahooks'
import { orderApi } from '@/services'

function OrderStatus({ orderId }: { orderId: string }) {
  const { data, cancel } = useRequest(
    () => orderApi.getStatus(orderId),
    {
      pollingInterval: 3000,  // 每 3 秒轮询一次
      pollingWhenHidden: false,  // 页面隐藏时停止轮询
    }
  )

  useEffect(() => {
    if (data?.status === 'completed') {
      cancel()  // 完成后停止轮询
    }
  }, [data?.status])

  return <Status data={data} />
}
```

## 📦 原生 React Hooks 方式（不推荐）

仅在无法使用 ahooks 时使用：

```typescript
import { useState, useEffect, useCallback } from 'react'
import { productApi } from '@/services'

function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      const data = await productApi.getList({ pageNum: 1, pageSize: 20 })
      setProducts(data.list)
    }
    catch (error) {
      console.error('获取失败:', error)
    }
    finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return <div>{/* 渲染 */}</div>
}
```

**缺点：**
- ❌ 代码冗长（多 3 倍代码）
- ❌ 需手动管理 loading 状态
- ❌ 需手动错误处理
- ❌ 缺少高级功能（防抖、节流、轮询等）

## 🎯 useRequest 常用配置

```typescript
const { data, loading, error, run, refresh, cancel } = useRequest(
  fetchFunction,
  {
    // 基础配置
    manual: false,           // 是否手动触发（默认 false）
    defaultParams: [],       // 默认参数
    ready: true,             // 是否准备好（常用于条件请求）

    // 依赖刷新
    refreshDeps: [],         // 依赖变化时自动刷新
    refreshOnWindowFocus: false, // 窗口聚焦时刷新

    // 防抖节流
    debounceWait: 0,         // 防抖延迟（ms）
    throttleWait: 0,         // 节流延迟（ms）

    // 轮询
    pollingInterval: 0,      // 轮询间隔（ms）
    pollingWhenHidden: true, // 页面隐藏时是否继续轮询

    // 缓存
    cacheKey: '',            // 缓存 key
    staleTime: 0,            // 缓存过期时间（ms）

    // 重试
    retryCount: 0,           // 重试次数
    retryInterval: 0,        // 重试间隔（ms）

    // 回调
    onBefore: (params) => {},     // 请求前
    onSuccess: (data, params) => {}, // 成功后
    onError: (error, params) => {},  // 失败后
    onFinally: (params, data, error) => {}, // 完成后
  }
)
```

## 通用类型

```typescript
// 已提供（src/services/http/types.ts）
ResponseData<T> // API 响应
PageData<T>     // 分页数据
PageParams      // 分页参数
```

## 命名规范

```typescript
// API 方法
getList()       // 列表
getDetail()     // 详情
create()        // 创建
update()        // 更新
delete()        // 删除
search()        // 搜索

// 类型
Product              // 实体
ProductListParams    // 查询参数
CreateProductParams  // 创建参数
ProductResponse      // 响应数据
```

## 错误处理

```typescript
// 已自动处理：
// 401 → 跳转登录
// 403 → 权限提示
// 404 → 资源不存在
// 500 → 服务器错误
// 超时/断网 → 网络提示

// ahooks 方式
const { error } = useRequest(productApi.create, {
  onError: (error) => {
    console.error('创建失败:', error)
    // 错误已自动显示 Toast
  },
})

// 原生方式
try {
  await productApi.create(data)
} catch (error) {
  console.error(error)
}
```

## 文件上传

```typescript
// API 定义
export const uploadApi = {
  uploadImage: (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    return request.post<{ url: string }>('/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
}

// 组件使用（ahooks）
function ImageUpload() {
  const { run: upload, loading } = useRequest(
    (file: File) => uploadApi.uploadImage(file),
    {
      manual: true,
      onSuccess: (data) => {
        Toast.show('上传成功')
        console.log('图片地址:', data.url)
      },
    }
  )

  const handleFileChange = (file: File) => {
    upload(file)
  }

  return <ImagePicker onChange={handleFileChange} loading={loading} />
}
```

## ✅ 检查清单

- [ ] 定义完整类型（.d.ts 文件）
- [ ] JSDoc 注释
- [ ] 语义化方法名
- [ ] 正确 HTTP 方法（GET/POST/PUT/DELETE）
- [ ] 使用 ahooks useRequest（推荐）
- [ ] 配置 loading 状态
- [ ] 配置错误处理
- [ ] 根据需要添加防抖/节流/轮询
- [ ] 导出到 services/index.ts

## 🎯 最佳实践

### ✅ 推荐做法

```typescript
// 1. 使用 ahooks
const { data, loading } = useRequest(fetchData)

// 2. 合理配置
const { data } = useRequest(searchAPI, {
  debounceWait: 300,  // 搜索防抖
  refreshDeps: [keyword],
})

// 3. 使用回调处理副作用
const { run } = useRequest(createAPI, {
  manual: true,
  onSuccess: () => Toast.show('成功'),
})
```

### ❌ 避免做法

```typescript
// 1. 过度手动管理状态
const [loading, setLoading] = useState(false) // ahooks 自动管理

// 2. 重复的 try-catch
try { ... } catch { ... } finally { ... } // ahooks 自动处理

// 3. 复杂的 useEffect 依赖
useEffect(() => { ... }, [dep1, dep2, dep3]) // 用 refreshDeps
```

---

**项目已集成 ahooks，强烈推荐使用 useRequest 简化代码！**
