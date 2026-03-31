/**
 * 通用组件 Props 类型定义
 *
 * 注意：
 * - 此文件中的类型自动全局可用
 * - 不需要 export，不需要 import
 * - 组件中可直接使用这些类型
 */

/** 产品卡片组件 Props */
interface ProductCardProps {
  product: Product
  onBuy?: (id: string) => void
  className?: string
}

/** 用户头像组件 Props */
interface UserAvatarProps {
  user: UserInfo
  size?: 'small' | 'medium' | 'large'
  onClick?: () => void
}

/** 加载组件 Props */
interface LoadingProps {
  text?: string
  fullScreen?: boolean
}

/** 空状态组件 Props */
interface EmptyProps {
  image?: string
  description?: string
  action?: React.ReactNode
}
