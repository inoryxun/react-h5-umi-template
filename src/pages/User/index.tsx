import { Button, Card, List, Toast } from 'antd-mobile'
import { RightOutline, UserOutline } from 'antd-mobile-icons'
import { history } from 'umi'
import { useUserStore } from '@/stores'
import styles from './index.less'

export default function UserPage() {
  const { userInfo, isLogin, clearUser } = useUserStore()

  const handleLogout = () => {
    clearUser()
    Toast.show({
      icon: 'success',
      content: '已退出登录',
    })
    history.push('/login')
  }

  if (!isLogin) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <UserOutline fontSize={48} />
          <p>未登录</p>
          <Button
            color="primary"
            onClick={() => history.push('/login')}
          >
            去登录
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          {userInfo?.avatar
            ? (
                <img src={userInfo.avatar} alt="avatar" />
              )
            : (
                <UserOutline fontSize={48} />
              )}
        </div>
        <h2>{userInfo?.username || '用户'}</h2>
        <p>{userInfo?.phone || '未设置手机号'}</p>
      </div>

      <div className={styles.content}>
        <Card title="个人信息">
          <List>
            <List.Item extra={userInfo?.username || '未设置'}>
              用户名
            </List.Item>
            <List.Item extra={userInfo?.phone || '未设置'}>
              手机号
            </List.Item>
            <List.Item extra={userInfo?.email || '未设置'}>
              邮箱
            </List.Item>
          </List>
        </Card>

        <Card title="设置">
          <List>
            <List.Item
              clickable
              arrow={<RightOutline />}
              onClick={() => Toast.show('功能开发中')}
            >
              修改密码
            </List.Item>
            <List.Item
              clickable
              arrow={<RightOutline />}
              onClick={() => Toast.show('功能开发中')}
            >
              关于我们
            </List.Item>
          </List>
        </Card>

        <div className={styles.buttonGroup}>
          <Button block color="danger" onClick={handleLogout}>
            退出登录
          </Button>
        </div>
      </div>
    </div>
  )
}
