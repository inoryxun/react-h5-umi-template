---
name: umi-h5-api
description: Umi H5 项目 API 请求规范 - Axios + TypeScript
tags: [API, Axios, TypeScript, HTTP]
---

# Umi H5 API 请求规范

定义项目中所有 API 请求的标准写法。

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

## 组件中使用

```typescript
import { useState, useEffect } from 'react'
import { productApi } from '@/services'
import type { Product } from '@/services'

function MyComponent() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const data = await productApi.getList({ pageNum: 1, pageSize: 20 })
      setProducts(data.list)
    }
    catch (error) {
      console.error('获取失败:', error)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return <div>{/* 渲染 */}</div>
}
```

## 通用类型

```typescript
// 已提供（src/services/http/types.ts）
ResponseData<T> // API 响应
PageData<T> // 分页数据
PageParams // 分页参数
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

try {
  await productApi.create(data)
} catch (error) {
  // 错误已显示 Toast
  console.error(error)
}
```

## 文件上传

```typescript
export const uploadApi = {
  uploadImage: (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    return request.post<{ url: string }>('/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
}
```

## ✅ 检查清单

- [ ] 定义完整类型
- [ ] JSDoc 注释
- [ ] 语义化方法名
- [ ] 正确 HTTP 方法
- [ ] 错误处理
- [ ] loading 状态
- [ ] 导出到 services/index.ts

---

**确保 API 请求一致性！**
