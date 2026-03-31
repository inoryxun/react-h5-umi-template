# 项目开发规范 Skills

本目录包含项目级别的 Claude Code Skills，用于规范团队开发。

## 📦 已配置的 Skills

| Skill                | 说明                    | 调用方式            |
| -------------------- | ----------------------- | ------------------- |
| **umi-h5-component** | React 组件开发规范      | `/umi-h5-component` |
| **umi-h5-api**       | API 请求封装规范        | `/umi-h5-api`       |
| **umi-h5-state**     | Zustand 状态管理规范    | `/umi-h5-state`     |
| **umi-h5-style**     | UnoCSS + Less 样式规范  | `/umi-h5-style`     |
| **umi-h5-types**     | TypeScript 类型定义规范 | `/umi-h5-types`     |
| **umi-h5-workflow**  | 完整开发工作流程        | `/umi-h5-workflow`  |

## 🚀 快速开始

### 新成员入职

1. **了解项目结构**

   ```
   查看项目结构和技术栈
   ```

2. **查看开发规范**

   ```bash
   cat .claude/skills/umi-h5-workflow/skill.md
   ```

3. **开始第一个功能**
   ```
   我要开发一个用户列表页面，请按照 umi-h5-workflow 的流程进行
   ```

### 日常开发

#### 创建新组件

```
请创建一个产品卡片组件，用于展示产品信息
# 自动应用 umi-h5-component 规范
```

#### 添加 API 接口

```
请为订单模块添加 API 接口：获取列表、创建订单、取消订单
# 自动应用 umi-h5-api 规范
```

#### 管理状态

```
请创建一个购物车状态管理
# 自动应用 umi-h5-state 规范
```

#### 编写样式

```
请为这个组件添加样式，使用 UnoCSS
# 自动应用 umi-h5-style 规范
```

## 📖 Skill 详细说明

### umi-h5-component - 组件开发规范

**适用场景**：

- 创建页面组件
- 创建通用组件
- 优化组件性能
- 重构组件

**主要内容**：

- React + TypeScript 组件模板
- Props 类型定义规范
- UnoCSS 样式优先策略
- antd-mobile 组件集成
- 移动端优化（安全区域、触摸）
- 性能优化（memo、useMemo、useCallback）

**示例**：

```tsx
import type { FC } from 'react'

interface Props {
  title: string
  onClick?: () => void
}

const MyComponent: FC<Props> = ({ title, onClick }) => {
  return (
    <div className="flex-center card p-4" onClick={onClick}>
      <h2 className="text-lg font-bold">{title}</h2>
    </div>
  )
}

export default MyComponent
```

---

### umi-h5-api - API 请求规范

**适用场景**：

- 创建新的 API 模块
- 封装请求方法
- 定义接口类型
- 处理错误

**主要内容**：

- API 模块标准结构
- Axios request 方法使用
- TypeScript 类型完整定义
- 错误处理最佳实践
- 文件上传处理
- 请求取消

**示例**：

```typescript
import { request } from '../http'

export interface User {
  id: string
  username: string
}

export const userApi = {
  getList: () => request.get<User[]>('/users'),
  getDetail: (id: string) => request.get<User>(`/users/${id}`),
  create: (data: Partial<User>) => request.post<User>('/users', data),
}
```

---

### umi-h5-state - 状态管理规范

**适用场景**：

- 创建全局状态
- 管理用户状态
- 跨组件数据共享
- 状态持久化

**主要内容**：

- Zustand Store 创建模板
- immer 中间件使用
- persist 持久化配置
- 异步操作处理
- 性能优化（选择性订阅）
- 常见模式（loading、分页、表单）

**示例**：

```typescript
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface State {
  count: number
  increment: () => void
}

export const useCountStore = create<State>()(
  immer(set => ({
    count: 0,
    increment: () => set((state) => {
      state.count++
    }),
  })),
)
```

---

### umi-h5-style - 样式规范

**适用场景**：

- 编写组件样式
- 页面布局
- 响应式设计
- 主题定制

**主要内容**：

- UnoCSS 优先策略
- 快捷方式使用
- Less 混合使用
- 移动端适配（px → vw、安全区域、1px 边框）
- 响应式断点
- 主题颜色

**示例**：

```tsx
// UnoCSS
<div className="flex-center p-4 bg-white rounded shadow">
  <button className="btn-primary">按钮</button>
</div>

// Less
.component {
  @apply rounded-lg shadow;
  padding: @spacing-lg;
}
```

---

### umi-h5-workflow - 开发工作流程

**适用场景**：

- 开发新功能
- 修复 Bug
- 代码重构
- 技术优化

**主要内容**：

- 完整开发流程（6 个阶段）
- 每个阶段的检查清单
- 功能开发完整示例
- Commit 规范
- 测试策略

**流程**：

1. 需求分析 → 2. 设计 → 3. 开发 → 4. 测试 → 5. 优化 → 6. 提交

---

## 🔄 Skills 工作原理

### 自动触发

Claude Code 会根据上下文自动应用相关 skills：

```
用户: 创建一个用户信息组件
Claude: 检测到组件开发需求
      → 自动加载 umi-h5-component skill
      → 按照规范创建组件
```

### 手动调用

也可以手动调用特定 skill：

```
用户: /umi-h5-api
Claude: 加载 API 请求规范
      → 展示 API 开发模板和示例
```

### 组合使用

多个 skills 可以组合使用：

```
用户: 开发一个完整的产品列表功能
Claude: 自动应用以下 skills：
      1. umi-h5-workflow (工作流程)
      2. umi-h5-api (创建 API)
      3. umi-h5-state (状态管理，如需要)
      4. umi-h5-component (页面组件)
      5. umi-h5-style (样式编写)
```

## 📝 团队协作

### Skills 版本控制

这些 skills 已放在项目 `.claude/skills/` 目录中，会随项目一起版本控制：

```bash
# 查看 skills
git status .claude/skills/

# 提交 skills 更新
git add .claude/skills/
git commit -m "docs: 更新开发规范 skills"
```

### 更新 Skills

当规范需要更新时：

1. 修改对应的 `skill.md` 文件
2. 提交到 git
3. 团队成员 pull 后自动生效

### 添加新 Skills

1. 在 `.claude/skills/` 下创建新目录
2. 创建 `skill.md` 文件
3. 提交到 git

## ✅ 使用检查清单

### 开发前

- [ ] 熟悉项目 skills（至少阅读 workflow）
- [ ] 了解如何调用 skills
- [ ] 知道每个 skill 的用途

### 开发中

- [ ] 遵循 workflow 流程
- [ ] 让 Claude 自动应用规范
- [ ] 使用 skills 提供的模板

### 开发后

- [ ] 检查代码是否符合规范
- [ ] 运行 `pnpm lint` 和 `pnpm type-check`
- [ ] 提交符合规范的 commit

## 🎯 最佳实践

### 1. 明确指定 Skills

```
✅ 请按照 umi-h5-component 规范创建一个用户卡片组件
❌ 创建一个组件
```

### 2. 参考 Skills 文档

开发前先查看相关 skill 的文档：

```bash
cat .claude/skills/umi-h5-component/skill.md
```

### 3. 保持 Skills 更新

定期审查和更新 skills，确保规范与项目演进保持同步。

## 📚 扩展学习

### 全局 Skills

除了项目级 skills，还可以安装全局 skills：

```bash
# TypeScript 最佳实践
npx skills add -g -y 0xbigboss/claude-code@typescript-best-practices

# 移动端 UI 开发
npx skills add -g -y alinaqi/claude-bootstrap@ui-mobile
```

### Skills 市场

浏览更多 skills：https://skills.sh/browse

---

## 💡 提示

- 📁 项目级 skills 在 `.claude/skills/` 目录
- 🔄 随项目 git 一起版本控制
- 🤖 自动应用，也可手动调用
- 📝 可随时查看和更新
- 👥 团队共享开发规范

---

**使用项目 Skills，确保团队代码一致性！** 🎯
