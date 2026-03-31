---
name: umi-h5-types
description: Umi H5 项目 TypeScript 类型定义规范 - 全局类型声明
tags: [TypeScript, Types, Interface, Declaration]
---

# Umi H5 TypeScript 类型定义规范

统一的 TypeScript 类型定义规范，使用 `.d.ts` 文件进行全局类型声明。

## 🎯 核心原则

⚠️ **重要规范**：

- ✅ **类型定义统一放在 `src/types/*.d.ts` 文件中**
- ✅ **`.d.ts` 文件中的类型自动全局可用**
- ✅ **不需要 `export` 导出，不需要 `import` 导入**
- ✅ **按模块/功能划分不同的 `.d.ts` 文件**

## 📁 类型文件组织

```
src/types/
├── user.d.ts        # 用户相关类型
├── product.d.ts     # 产品相关类型
├── order.d.ts       # 订单相关类型
├── api.d.ts         # API 通用类型
└── common.d.ts      # 公共类型
```

## 📝 类型定义规范

### 1. 全局类型（`.d.ts` 文件）

```typescript
// src/types/user.d.ts
/** 用户信息 */
interface UserInfo {
  id: string
  username: string
  avatar: string
  phone: string
  email?: string
}

/** 登录参数 */
interface LoginParams {
  username: string
  password: string
}

/** 登录响应 */
interface LoginResponse {
  token: string
  userInfo: UserInfo
}
```

**注意**：

- ❌ 不要使用 `export`
- ❌ 不要使用 `import`
- ✅ 类型自动全局可用
- ✅ 添加 JSDoc 注释

### 2. 在代码中使用

```typescript
// src/services/modules/user.ts
import { request } from '../http'

// 直接使用全局类型，无需 import
export const userApi = {
  login: (params: LoginParams) => {
    return request.post<LoginResponse>('/user/login', params)
  },

  getUserInfo: () => {
    return request.get<UserInfo>('/user/info')
  },
}
```

```typescript
// src/stores/userStore.ts
import { create } from 'zustand'

// 直接使用全局类型，无需 import
interface UserState {
  userInfo: UserInfo | null // ← 自动识别
  token: string | null
  setUserInfo: (info: UserInfo) => void
}
```

```typescript
// src/pages/User/index.tsx
import { useUserStore } from '@/stores'

// 直接使用全局类型
function UserPage() {
  const { userInfo } = useUserStore()  // userInfo: UserInfo | null

  return <div>{userInfo?.username}</div>
}
```

## 🗂️ 类型文件划分

### user.d.ts - 用户相关

```typescript
/** 用户信息 */
interface UserInfo {
  id: string
  username: string
  avatar: string
  phone: string
}

/** 用户登录参数 */
interface LoginParams {
  username: string
  password: string
}

/** 用户注册参数 */
interface RegisterParams {
  username: string
  password: string
  phone: string
  code: string
}
```

### product.d.ts - 产品相关

```typescript
/** 产品信息 */
interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  imageUrl: string
  category: string
}

/** 产品列表查询参数 */
interface ProductListParams extends PageParams {
  keyword?: string
  category?: string
  minPrice?: number
  maxPrice?: number
}

/** 创建产品参数 */
interface CreateProductParams {
  name: string
  description: string
  price: number
  stock: number
  category: string
}
```

### api.d.ts - API 通用类型

```typescript
/** 通用 API 响应 */
interface ResponseData<T = any> {
  code: number
  data: T
  message: string
  timestamp?: number
}

/** 分页数据 */
interface PageData<T = any> {
  list: T[]
  total: number
  pageNum: number
  pageSize: number
}

/** 分页参数 */
interface PageParams {
  pageNum: number
  pageSize: number
}
```

### common.d.ts - 公共类型

```typescript
/** 选项类型 */
interface Option<T = string> {
  label: string
  value: T
}

/** ID 参数 */
interface IdParams {
  id: string
}

/** 批量操作参数 */
interface BatchParams {
  ids: string[]
}

/** 状态枚举 */
type Status = 'pending' | 'success' | 'failed'

/** 性别枚举 */
type Gender = 'male' | 'female' | 'unknown'
```

## 🔄 命名规范

### Interface 命名

```typescript
// ✅ 实体类型：名词（PascalCase）
interface User { }
interface Product { }
interface Order { }

// ✅ 请求参数：动作 + Params
interface LoginParams { }
interface CreateUserParams { }
interface UpdateProductParams { }
interface DeleteOrderParams { }

// ✅ 响应数据：名词 + Response
interface LoginResponse { }
interface UserInfoResponse { }
interface ProductDetailResponse { }

// ✅ 查询参数：实体 + ListParams 或 QueryParams
interface UserListParams { }
interface ProductQueryParams { }

// ✅ 状态类型：名词 + State
interface UserState { }
interface AppState { }
```

### Type 命名

```typescript
// ✅ 联合类型：名词（PascalCase）
type Status = 'pending' | 'success' | 'failed'
type Theme = 'light' | 'dark'
type SortOrder = 'asc' | 'desc'

// ✅ 工具类型：描述性名称
type Nullable<T> = T | null
type Optional<T> = T | undefined
type WithId<T> = T & { id: string }
```

## 🎯 最佳实践

### 1. 按功能模块划分

```
src/types/
├── user.d.ts      # 用户模块所有类型
├── product.d.ts   # 产品模块所有类型
├── order.d.ts     # 订单模块所有类型
├── api.d.ts       # API 通用类型
└── common.d.ts    # 全局公共类型
```

### 2. 类型复用

```typescript
// user.d.ts
interface UserInfo {
  id: string
  username: string
  avatar: string
}

// 复用基础类型
interface UserDetail extends UserInfo {
  phone: string
  email: string
  address: string
}

// Partial 复用
type UpdateUserParams = Partial<UserInfo>
```

### 3. 泛型使用

```typescript
// api.d.ts
interface ResponseData<T = any> {
  code: number
  data: T
  message: string
}

// 使用
const response: ResponseData<UserInfo> = await api.getUserInfo()
const products: ResponseData<Product[]> = await api.getProducts()
```

## ⚠️ 注意事项

### 1. 避免循环依赖

```typescript
// ❌ 避免：在 .d.ts 中导入其他模块
import { SomeType } from './other'

// ✅ 推荐：所有类型都在 .d.ts 中独立定义
interface MyType {
  // ...
}
```

### 2. 使用命名空间（可选）

```typescript
// src/types/user.d.ts
declare namespace User {
  interface Info {
    id: string
    username: string
  }

  interface LoginParams {
    username: string
    password: string
  }
}

// 使用
const user: User.Info = { ... }
const params: User.LoginParams = { ... }
```

### 3. 扩展第三方类型

```typescript
// src/types/global.d.ts
declare global {
  // 扩展 Window 对象
  interface Window {
    __APP_CONFIG__: AppConfig
  }
}

export {}
```

## 🔧 TSConfig 配置

确保 `tsconfig.json` 包含 types 目录：

```json
{
  "include": [
    "src/**/*",
    "src/types/**/*.d.ts"
  ]
}
```

## ✅ 类型定义检查清单

创建类型前检查：

- [ ] 使用 `.d.ts` 文件
- [ ] 不使用 `export` 和 `import`
- [ ] 添加 JSDoc 注释
- [ ] 按模块划分文件
- [ ] 使用语义化命名
- [ ] 考虑类型复用
- [ ] 避免 `any` 类型

## 🚫 错误示例

```typescript
// ❌ 错误：在 .ts 文件中导出类型
// src/services/modules/user.ts
// ❌ 错误：导入全局类型
import type { UserInfo } from '@/types/user'

export interface UserInfo { }

// ❌ 错误：在 .d.ts 中使用 export
// src/types/user.d.ts
export interface UserInfo { }
```

## ✅ 正确示例

```typescript
// ✅ 正确：在 .d.ts 中定义全局类型
// src/types/user.d.ts
interface UserInfo {
  id: string
  username: string
}

// ✅ 正确：直接使用全局类型
// src/services/modules/user.ts
export const userApi = {
  getUserInfo: () => {
    return request.get<UserInfo>('/user/info')
  },
}

// ✅ 正确：在组件中直接使用
// src/components/UserCard.tsx
interface Props {
  user: UserInfo // 无需 import
}
```

## 📚 参考资源

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Declaration Files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)

---

**使用全局类型声明，简化类型管理！**
