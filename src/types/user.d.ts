/**
 * 用户相关类型定义
 */

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
