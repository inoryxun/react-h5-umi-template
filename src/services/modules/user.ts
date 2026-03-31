import { request } from '../http'

/**
 * 用户相关 API
 * 类型定义见 src/types/user.d.ts
 */
export const userApi = {
  /**
   * 用户登录
   */
  login: (params: LoginParams) => {
    return request.post<LoginResponse>('/user/login', params)
  },

  /**
   * 获取用户信息
   */
  getUserInfo: () => {
    return request.get<UserInfo>('/user/info')
  },

  /**
   * 更新用户信息
   */
  updateUserInfo: (data: Partial<UserInfo>) => {
    return request.put<UserInfo>('/user/info', data)
  },

  /**
   * 退出登录
   */
  logout: () => {
    return request.post('/user/logout')
  },
}
