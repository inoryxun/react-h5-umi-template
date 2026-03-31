import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

/**
 * 应用状态接口
 */
interface AppState {
  // 状态
  loading: boolean
  theme: 'light' | 'dark'

  // 操作方法
  setLoading: (loading: boolean) => void
  setTheme: (theme: 'light' | 'dark') => void
}

/**
 * 应用状态管理
 */
export const useAppStore = create<AppState>()(
  immer(set => ({
    // 初始状态
    loading: false,
    theme: 'light',

    // 设置加载状态
    setLoading: loading =>
      set((state) => {
        state.loading = loading
      }),

    // 设置主题
    setTheme: theme =>
      set((state) => {
        state.theme = theme
      }),
  })),
)
