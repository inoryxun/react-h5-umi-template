# 项目 Skills 配置指南

本文档说明项目中可用的 Claude Code Skills 和推荐的开源 Skills。

## 🎯 已配置的项目级 Skills

以下 skills 已为本项目量身定制，自动规范开发流程：

### 1. **umi-h5-component** - 组件开发规范

**触发场景**：创建、修改组件时自动应用

**功能**：

- ✅ React 组件开发模板
- ✅ TypeScript 类型规范
- ✅ antd-mobile 组件集成
- ✅ UnoCSS 样式规范
- ✅ 移动端优化指南

**使用方式**：

```bash
# 自动触发，或手动调用
/umi-h5-component
```

---

### 2. **umi-h5-api** - API 请求规范

**触发场景**：创建 API 接口、处理网络请求

**功能**：

- ✅ API 模块标准模板
- ✅ Axios 请求封装规范
- ✅ TypeScript 类型定义
- ✅ 错误处理最佳实践
- ✅ 文件上传示例

**使用方式**：

```bash
/umi-h5-api
```

---

### 3. **umi-h5-state** - 状态管理规范

**触发场景**：创建 Store、管理全局状态

**功能**：

- ✅ Zustand Store 模板
- ✅ 持久化配置
- ✅ 异步操作处理
- ✅ 性能优化技巧
- ✅ 常见模式（loading、分页、表单）

**使用方式**：

```bash
/umi-h5-state
```

---

### 4. **umi-h5-style** - 样式规范

**触发场景**：编写样式、页面布局

**功能**：

- ✅ UnoCSS 优先策略
- ✅ Less 混合使用
- ✅ 移动端适配方案
- ✅ 响应式设计
- ✅ 主题定制

**使用方式**：

```bash
/umi-h5-style
```

---

### 5. **umi-h5-types** - TypeScript 类型定义规范

**触发场景**：定义类型、创建 `.d.ts` 文件

**功能**：

- ✅ 全局类型声明规范（`.d.ts` 文件）
- ✅ 不使用 export/import
- ✅ 类型文件组织结构
- ✅ 命名规范和最佳实践

**使用方式**：

```bash
/umi-h5-types
```

---

### 6. **umi-h5-workflow** - 开发工作流程

**触发场景**：开发新功能、修复 Bug、重构

**功能**：

- ✅ 完整开发流程（需求→设计→开发→测试→优化→提交）
- ✅ 每个阶段检查清单
- ✅ 功能开发完整示例
- ✅ Commit 规范
- ✅ 测试清单

**使用方式**：

```bash
/umi-h5-workflow
```

---

## 🌟 推荐的开源 Skills

### 已安装的系统 Skills

这些 skills 已经在您的环境中可用：

| Skill               | 说明                      | 何时使用                   |
| ------------------- | ------------------------- | -------------------------- |
| **antfu**           | Anthony Fu 的工具链和约定 | ESLint、项目配置、monorepo |
| **unocss**          | UnoCSS 配置和使用         | 原子化 CSS、工具类         |
| **vite**            | Vite 构建工具配置         | Vite 配置、插件开发        |
| **pnpm**            | pnpm 包管理器             | 依赖管理、workspace        |
| **vitest**          | Vitest 测试框架           | 单元测试、集成测试         |
| **frontend-design** | 前端设计指南              | UI/UX 设计、高质量界面     |

### 推荐安装的开源 Skills

#### 1. TypeScript 最佳实践

```bash
npx skills add -g -y 0xbigboss/claude-code@typescript-best-practices
```

**用途**：TypeScript 代码质量、类型设计

#### 2. 移动端 UI 开发

```bash
npx skills add -g -y alinaqi/claude-bootstrap@ui-mobile
```

**用途**：移动端 UI 组件开发、响应式设计

#### 3. Web Haptics（触觉反馈）

```bash
npx skills add -g -y lochie/web-haptics@web-haptics
```

**用途**：为 H5 应用添加触觉反馈，提升用户体验

---

## 📖 Skills 使用指南

### 如何调用 Skills

#### 方式 1：自动触发

Skills 会根据您的代码上下文自动触发。例如：

- 创建 React 组件 → 自动应用 `umi-h5-component`
- 添加 API → 自动应用 `umi-h5-api`

#### 方式 2：手动调用

```bash
# 使用斜杠命令
/umi-h5-component
/umi-h5-api

# 或在对话中提及
"请按照 umi-h5-component 规范创建一个用户卡片组件"
```

### 查看所有可用 Skills

```bash
# 列出已安装的 skills
ls ~/.claude/skills/

# 搜索新的 skills
npx skills find "关键词"

# 查看 skills 详情
cat ~/.claude/skills/umi-h5-component/skill.md
```

### 安装新的 Skills

```bash
# 全局安装
npx skills add -g -y owner/repo@skill-name

# 项目级安装
npx skills add owner/repo@skill-name
```

---

## 🔧 项目开发最佳实践

### 开发新功能时

1. **调用 workflow skill**：

   ```
   我要开发一个产品列表页，请按照 umi-h5-workflow 的流程进行
   ```

2. **自动应用规范**：
   - 创建组件 → `umi-h5-component`
   - 添加 API → `umi-h5-api`
   - 管理状态 → `umi-h5-state`
   - 编写样式 → `umi-h5-style`

### 代码审查时

```bash
# 使用 simplify skill 检查代码质量
/simplify
```

### 遇到问题时

```bash
# 搜索相关 skills
npx skills find "您的问题关键词"
```

---

## 📋 Skills 检查清单

开发前确认：

- [ ] 了解项目级 skills（umi-h5-\*）
- [ ] 知道如何调用 skills
- [ ] 安装推荐的开源 skills

开发中确认：

- [ ] 遵循 workflow 流程
- [ ] 自动应用相关规范
- [ ] 使用 skills 提供的模板

开发后确认：

- [ ] 代码符合规范
- [ ] 运行代码检查
- [ ] 提交信息规范

---

## 🚀 快速开始

### 1. 查看项目 Skills

```bash
ls ~/.claude/skills/ | grep umi-h5
```

输出：

```
umi-h5-api/
umi-h5-component/
umi-h5-state/
umi-h5-style/
umi-h5-workflow/
```

### 2. 开发第一个功能

```
我要创建一个产品列表页面，包含：
1. 产品卡片展示
2. 分页加载
3. 搜索功能

请按照 umi-h5-workflow 的标准流程进行开发。
```

### 3. 安装推荐 Skills

```bash
# TypeScript 最佳实践
npx skills add -g -y 0xbigboss/claude-code@typescript-best-practices

# 移动端 UI
npx skills add -g -y alinaqi/claude-bootstrap@ui-mobile

# Web Haptics
npx skills add -g -y lochie/web-haptics@web-haptics
```

---

## 📚 相关文档

- [Claude Code Skills 官方文档](https://skills.sh/)
- [Skills 市场](https://skills.sh/browse)
- [创建自定义 Skill](https://skills.sh/docs/creating-skills)

---

## 💡 提示

- Skills 会在相关上下文中自动触发
- 可以通过 `/skill-name` 手动调用
- 项目级 skills 优先于全局 skills
- 定期更新 skills：`npx skills update`

---

**使用 Skills 规范开发，提升代码质量！** 🎯
