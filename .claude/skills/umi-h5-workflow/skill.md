---
name: umi-h5-workflow
description: Umi H5 项目开发工作流程 - 从需求到上线的完整流程
tags: [Workflow, Umi, H5, Development, Process]
---

# Umi H5 项目开发工作流程

完整的开发流程规范，确保代码质量和开发效率。

## 🎯 何时使用

当用户要求开发新功能、修复 Bug 或进行重构时，遵循此工作流程。

## 📋 开发流程

### 1️⃣ 需求分析阶段

**目标**：理解需求，明确技术方案

**步骤**：

1. 确认功能需求和验收标准
2. 评估技术难度和工作量
3. 确定涉及的技术栈和组件
4. 检查是否有可复用的组件或工具

**输出**：

- 功能清单
- 技术方案
- 工作量评估

### 2️⃣ 设计阶段

**目标**：设计实现方案

**步骤**：

1. 设计组件结构和目录
2. 设计 API 接口和数据流
3. 设计状态管理方案
4. 设计页面布局和交互

**输出**：

- 目录结构设计
- API 接口定义
- 状态管理设计
- 页面原型（可选）

### 3️⃣ 开发阶段

**目标**：编码实现功能

**步骤顺序**：

#### A. 创建类型定义

```typescript
// 1. 定义数据类型
export interface Product {
  id: string
  name: string
  price: number
}

// 2. 定义 API 参数类型
export interface ProductListParams {
  pageNum: number
  pageSize: number
}
```

#### B. 创建 API 服务

```typescript
// src/services/modules/product.ts
export const productApi = {
  getList: (params: ProductListParams) => {
    return request.get<PageData<Product>>('/products', { params })
  },
}
```

#### C. 创建状态管理（如需要）

```typescript
// src/stores/productStore.ts
export const useProductStore = create<ProductState>()(
  immer(set => ({
    products: [],
    fetchProducts: async () => { },
  })),
)
```

#### D. 创建组件

```typescript
// 1. 创建目录
src/pages/Product/
├── index.tsx
├── index.less
└── components/

// 2. 实现组件
export default function ProductPage() {
  // 实现逻辑
}
```

#### E. 配置路由

```typescript
// .umirc.ts
routes: [
  { path: '/product', component: '@/pages/Product' },
]
```

### 4️⃣ 测试阶段

**目标**：确保功能正常

**测试清单**：

- [ ] 功能测试：所有功能正常工作
- [ ] 移动端测试：不同设备适配正常
- [ ] 网络测试：处理加载、错误、超时
- [ ] 兼容性测试：iOS Safari、Android Chrome、微信浏览器
- [ ] 性能测试：页面加载快，交互流畅
- [ ] 类型检查：`pnpm type-check` 通过
- [ ] 代码检查：`pnpm lint` 通过

### 5️⃣ 优化阶段

**目标**：性能和代码质量优化

**优化项**：

- [ ] 组件性能：memo、useMemo、useCallback
- [ ] 包大小：按需导入、代码分割
- [ ] 加载优化：懒加载、预加载
- [ ] 样式优化：减少重复样式
- [ ] 代码质量：消除 ESLint 警告

### 6️⃣ 提交阶段

**目标**：规范提交代码

**步骤**：

1. 代码审查：自查代码质量
2. 运行检查：`pnpm lint && pnpm type-check`
3. 提交代码：遵循 Commit 规范
4. 推送代码：`git push`

**Commit 规范**：

```bash
<type>(<scope>): <subject>

# type: feat/fix/docs/style/refactor/perf/test/chore
# scope: 影响范围（可选）
# subject: 简短描述

# 示例
feat(product): 添加产品列表页面
fix(user): 修复登录状态丢失问题
```

## 🔄 功能开发完整示例

### 场景：开发产品列表页

#### Step 1: 创建类型

```typescript
// src/services/modules/product.ts
export interface Product {
  id: string
  name: string
  price: number
  imageUrl: string
}
```

#### Step 2: 创建 API

```typescript
export const productApi = {
  getList: (params: PageParams) => {
    return request.get<PageData<Product>>('/products', { params })
  },
}
```

#### Step 3: 创建页面

```typescript
// src/pages/ProductList/index.tsx
import { useState, useEffect } from 'react'
import { Card } from 'antd-mobile'
import { productApi } from '@/services'
import type { Product } from '@/services'

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const data = await productApi.getList({ pageNum: 1, pageSize: 20 })
      setProducts(data.list)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  if (loading) {
    return <div className="flex-center h-screen">加载中...</div>
  }

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-2 gap-4">
        {products.map(product => (
          <Card key={product.id} className="overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-3">
              <h3 className="font-bold text-ellipsis">{product.name}</h3>
              <p className="text-red-500 text-lg font-bold mt-2">
                ¥{product.price}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
```

#### Step 4: 配置路由

```typescript
// .umirc.ts
routes: [
  {
    path: '/',
    component: '@/layouts/BasicLayout',
    routes: [
      { path: '/products', component: '@/pages/ProductList' },
    ],
  },
]
```

#### Step 5: 测试

- 访问 http://localhost:8000/products
- 检查数据加载、渲染、样式
- 测试不同设备适配

#### Step 6: 优化和提交

```bash
pnpm lint:fix
pnpm type-check
git add .
git commit -m "feat(product): 添加产品列表页面"
git push
```

## ✅ 每个阶段检查清单

### 开发前

- [ ] 需求明确
- [ ] 技术方案确定
- [ ] 复用性检查

### 开发中

- [ ] 类型完整
- [ ] 代码规范（ESLint）
- [ ] 注释清晰
- [ ] 性能考虑

### 开发后

- [ ] 功能测试
- [ ] 移动端测试
- [ ] 代码审查
- [ ] 类型检查
- [ ] 提交规范

## 🚫 常见问题

### 问题 1：忘记类型定义

**解决**：先定义类型再写代码

### 问题 2：API 错误处理缺失

**解决**：统一使用 try-catch

### 问题 3：状态管理混乱

**解决**：遵循单一数据源原则

### 问题 4：样式不规范

**解决**：优先使用 UnoCSS 工具类

### 问题 5：提交信息不规范

**解决**：遵循 Commit 规范

## 📚 相关 Skills

开发时可调用的 skills：

- `umi-h5-component` - 组件开发规范
- `umi-h5-api` - API 请求规范
- `umi-h5-state` - 状态管理规范
- `umi-h5-style` - 样式编写规范

---

**遵循工作流程，确保开发质量！**
