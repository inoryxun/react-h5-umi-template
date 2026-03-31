import { Button, Card, Toast } from 'antd-mobile'
import { SmileOutline } from 'antd-mobile-icons'
import { useUserStore } from '@/stores'
import styles from './index.less'

export default function HomePage() {
  const { userInfo, isLogin } = useUserStore()

  const handleClick = () => {
    Toast.show({
      icon: 'success',
      content: '欢迎使用 Umi + Vite + React H5 模板',
    })
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <SmileOutline fontSize={48} color="var(--adm-color-primary)" />
        <h1>Umi + Vite H5</h1>
        <p>基于 Umi 4 + Vite + React + antd-mobile 的 H5 项目模板</p>
      </div>

      <div className={styles.content}>
        <Card title="功能特性">
          <ul>
            <li>✅ Vite 构建工具</li>
            <li>✅ 移动端适配（px 转 vw）</li>
            <li>✅ Zustand 状态管理</li>
            <li>✅ antd-mobile UI 组件库</li>
            <li>✅ Axios 网络请求封装</li>
            <li>✅ TypeScript 类型支持</li>
            <li>✅ antfu/eslint-config 代码规范</li>
          </ul>
        </Card>

        <Card title="用户信息">
          {isLogin
            ? (
                <div>
                  <p>
                    用户名:
                    {userInfo?.username || '未设置'}
                  </p>
                  <p>
                    手机号:
                    {userInfo?.phone || '未设置'}
                  </p>
                </div>
              )
            : (
                <p>未登录</p>
              )}
        </Card>

        <div className={styles.buttonGroup}>
          <Button block color="primary" onClick={handleClick}>
            测试 Toast
          </Button>
        </div>
      </div>
    </div>
  )
}
