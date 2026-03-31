import { TabBar } from 'antd-mobile'
import { AppOutline, UnorderedListOutline, UserOutline } from 'antd-mobile-icons'
import { history, Outlet, useLocation } from 'umi'
import styles from './index.less'

/**
 * 基础布局 - 带底部导航栏
 */
export default function BasicLayout() {
  const location = useLocation()
  const { pathname } = location

  const tabs = [
    {
      key: '/',
      title: '首页',
      icon: <AppOutline />,
    },
    {
      key: '/list',
      title: '列表',
      icon: <UnorderedListOutline />,
    },
    {
      key: '/user',
      title: '我的',
      icon: <UserOutline />,
    },
  ]

  const handleTabChange = (key: string) => {
    history.push(key)
  }

  return (
    <div className={styles.layout}>
      <div className={styles.content}>
        <Outlet />
      </div>

      <div className={styles.tabBar}>
        <TabBar activeKey={pathname} onChange={handleTabChange}>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  )
}
