---
name: enum-standard
description: 枚举定义规范。包含文件命名规范、枚举模板、TitleMap/TypeMap/List 配套导出。MUST be used when creating .enum.ts files or working with enums/ directory. Always export TitleMap and List.
---

# Enum 规范

## 🎯 使用原则

同一个字段不同的固定判断条件使用 `enum` 枚举。

### 何时必须抽成 Enum（满足任一条即需抽离）

- 组件内出现 **固定键到文案的映射**：`Record<string, string>`、`const map = { a: 'A', b: 'B' }`、或 `function fn(type: string) { switch(type) { case 'a': return 'A' ... } }`
- 组件内出现 **固定键到标签类型/颜色的映射**：`Record<string, 'success' | 'info' | 'danger'>` 或带 `label` + `type` 的配置对象
- 同一字段在多个地方用字符串字面量做分支判断（如 `status === 'available'`、`type === 'base'`）

## 📁 文件组织

### 目录结构

- 文件创建在 `src/enums/` 文件夹下面
- 子应用内枚举放在该子应用的 `enums/` 下
- 如果有需要文本显示的 `enum` 使用创建对应的 `*TitleMap` 和 `*List`

### 文件命名

命名格式：`业务含义.enum.ts`

示例：
- `memberUserStatus.enum.ts` - 会员用户状态
- `cardType.enum.ts` - 卡片类型
- `couponStatus.enum.ts` - 优惠券状态
- `questionnaire.enum.ts` - 问卷相关枚举

## 📝 抽离步骤（必须按此执行）

1. 在 **当前模块的 `enums/` 目录** 下新建文件，命名：`业务含义.enum.ts`
2. 定义 **枚举**：
   - 若与接口一致用数字枚举
   - 否则用字符串枚举（如 `export enum CardTypeEnum { Base = 'base', Regional = 'regional' }`）
3. 导出 **TitleMap**（用于展示文案）：
   ```ts
   export const XxxEnumTitleMap: Record<XxxEnum, string> = {
     [XxxEnum.A]: '文案',
     // ...
   }
   ```
4. 若用于 Tag 的 type、颜色等，再导出 **TypeMap**：
   ```ts
   export const XxxEnumTypeMap: Record<XxxEnum, 'success' | 'info' | 'warning' | 'danger'> = {
     // ...
   }
   ```
5. 若用于下拉、Tab 等选项，再导出 **List**：
   ```ts
   export const XxxEnumList: { value: XxxEnum; label: string }[] = [
     // ...
   ]
   ```
6. 在组件中 **删除** 内联的 map/function/config，改为从 `enums/xxx.enum.ts` **import** 并使用 `XxxEnumTitleMap[value]`、`XxxEnumTypeMap[value]` 等

## 💡 完整示例

### 基础枚举示例

```ts
// enums/cardType.enum.ts

/**
 * 卡片类型枚举
 */
export enum CardTypeEnum {
  Base = 'base',
  Regional = 'regional',
  Benefit = 'benefit',
  Shared = 'shared',
}

/**
 * 卡片类型标题映射
 */
export const CardTypeEnumTitleMap: Record<CardTypeEnum, string> = {
  [CardTypeEnum.Base]: '基础卡',
  [CardTypeEnum.Regional]: '区域卡',
  [CardTypeEnum.Benefit]: '权益卡',
  [CardTypeEnum.Shared]: '共享卡',
}

/**
 * 卡片类型列表
 */
export const CardTypeEnumList: { value: CardTypeEnum; label: string }[] = [
  { value: CardTypeEnum.Base, label: '基础卡' },
  { value: CardTypeEnum.Regional, label: '区域卡' },
  { value: CardTypeEnum.Benefit, label: '权益卡' },
  { value: CardTypeEnum.Shared, label: '共享卡' },
]
```

### 带状态映射的枚举示例

```ts
// enums/couponStatus.enum.ts

/**
 * 优惠券状态枚举
 */
export enum CouponStatusEnum {
  Available = 'available',
  Used = 'used',
  Expired = 'expired',
}

/**
 * 优惠券状态标题映射
 */
export const CouponStatusEnumTitleMap: Record<CouponStatusEnum, string> = {
  [CouponStatusEnum.Available]: '可用',
  [CouponStatusEnum.Used]: '已使用',
  [CouponStatusEnum.Expired]: '已过期',
}

/**
 * 优惠券状态类型映射（用于 Tag 组件）
 */
export const CouponStatusEnumTypeMap: Record<CouponStatusEnum, 'success' | 'info' | 'danger'> = {
  [CouponStatusEnum.Available]: 'success',
  [CouponStatusEnum.Used]: 'info',
  [CouponStatusEnum.Expired]: 'danger',
}

/**
 * 优惠券状态列表
 */
export const CouponStatusEnumList: { value: CouponStatusEnum; label: string }[] = [
  { value: CouponStatusEnum.Available, label: '可用' },
  { value: CouponStatusEnum.Used, label: '已使用' },
  { value: CouponStatusEnum.Expired, label: '已过期' },
]
```

### 数字枚举示例

```ts
// enums/memberUserStatus.enum.ts

/**
 * 会员用户状态枚举
 */
export enum MemberUserStatusEnum {
  /** 待激活 */
  Pending = 0,
  /** 已激活 */
  Active = 1,
  /** 已停用 */
  Inactive = 2,
  /** 已注销 */
  Deleted = 3,
}

/**
 * 会员用户状态标题映射
 */
export const MemberUserStatusEnumTitleMap: Record<MemberUserStatusEnum, string> = {
  [MemberUserStatusEnum.Pending]: '待激活',
  [MemberUserStatusEnum.Active]: '已激活',
  [MemberUserStatusEnum.Inactive]: '已停用',
  [MemberUserStatusEnum.Deleted]: '已注销',
}

/**
 * 会员用户状态类型映射
 */
export const MemberUserStatusEnumTypeMap: Record<MemberUserStatusEnum, 'warning' | 'success' | 'info' | 'danger'> = {
  [MemberUserStatusEnum.Pending]: 'warning',
  [MemberUserStatusEnum.Active]: 'success',
  [MemberUserStatusEnum.Inactive]: 'info',
  [MemberUserStatusEnum.Deleted]: 'danger',
}

/**
 * 会员用户状态列表
 */
export const MemberUserStatusEnumList: { value: MemberUserStatusEnum; label: string }[] = [
  { value: MemberUserStatusEnum.Pending, label: '待激活' },
  { value: MemberUserStatusEnum.Active, label: '已激活' },
  { value: MemberUserStatusEnum.Inactive, label: '已停用' },
  { value: MemberUserStatusEnum.Deleted, label: '已注销' },
]
```

## 🔨 组件中使用

### 使用 TitleMap

```tsx
import { CardTypeEnumTitleMap } from '@/enums/cardType.enum'

// 显示文案
<div>{CardTypeEnumTitleMap[card.cardType]}</div>
```

### 使用 TypeMap

```tsx
import { CouponStatusEnumTypeMap, CouponStatusEnumTitleMap } from '@/enums/couponStatus.enum'

// Tag 组件
<Tag type={CouponStatusEnumTypeMap[coupon.status]}>
  {CouponStatusEnumTitleMap[coupon.status]}
</Tag>
```

### 使用 List

```tsx
import { CardTypeEnumList } from '@/enums/cardType.enum'

// 下拉选择
<Select options={CardTypeEnumList} />

// Tab 切换
{CardTypeEnumList.map(item => (
  <Tab key={item.value} value={item.value}>
    {item.label}
  </Tab>
))}
```

## ⚠️ 注意事项

1. **枚举命名**：使用 `XxxEnum` 格式，如 `CardTypeEnum`、`CouponStatusEnum`
2. **Map 命名**：使用 `XxxEnumTitleMap`、`XxxEnumTypeMap` 格式
3. **List 命名**：使用 `XxxEnumList` 格式
4. **类型安全**：使用 `Record<XxxEnum, string>` 确保所有枚举值都有对应的映射
5. **导出顺序**：枚举定义 -> TitleMap -> TypeMap -> List
6. **注释完整**：每个枚举值都应该有清晰的注释说明
7. **避免重复**：不要在组件内重复定义 map 或 function，统一使用枚举文件
