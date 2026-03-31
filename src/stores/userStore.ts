import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

/**
 * 用户状态接口
 * UserInfo 类型见 src/types/user.d.ts
 */
interface UserState {
  // 状态
  token: string | null
  userInfo: UserInfo | null
  isLogin: boolean

  // 操作方法
  setToken: (token: string) => void
  setUserInfo: (userInfo: UserInfo) => void
  clearUser: () => void
}

/**
 * 用户状态管理
 */
export const useUserStore = create<UserState>()(
  persist(
    immer(set => ({
      // 初始状态
      token: null,
      userInfo: null,
      isLogin: false,

      // 设置 token
      setToken: token =>
        set((state) => {
          state.token = token
          state.isLogin = true
        }),

      // 设置用户信息
      setUserInfo: userInfo =>
        set((state) => {
          state.userInfo = userInfo
        }),

      // 清除用户信息
      clearUser: () =>
        set({
          token: null,
          userInfo: null,
          isLogin: false,
        }),
    })),
    {
      name: 'user-storage', // localStorage key
      partialize: state => ({
        // 只持久化 token 和 userInfo
        token: state.token,
        userInfo: state.userInfo,
      }),
    },
  ),
)
