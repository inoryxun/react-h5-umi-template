import { ConfigProvider } from 'antd-mobile'
import zhCN from 'antd-mobile/es/locales/zh-CN'
import VConsole from 'vconsole'
import 'uno.css'

/**
 * 初始化移动端调试工具
 */
if (import.meta.env.VITE_ENABLE_VCONSOLE === 'true') {
  // eslint-disable-next-line no-new
  new VConsole()
}

/**
 * 全局配置 - 包裹应用根组件
 */
export function rootContainer(container: React.ReactNode) {
  return (
    <ConfigProvider locale={zhCN}>
      {container}
    </ConfigProvider>
  )
}

/**
 * 布局配置
 */
export function layout() {
  return {
    // 禁用默认 layout
    pure: true,
  }
}
