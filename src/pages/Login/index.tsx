import { Button, Form, Input, Toast } from 'antd-mobile'
import { useState } from 'react'
import { history } from 'umi'
import { userApi } from '@/services'
import { useUserStore } from '@/stores'
import styles from './index.less'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const { setToken, setUserInfo } = useUserStore()

  const onFinish = async (values: LoginParams) => {
    setLoading(true)
    try {
      // 调用登录接口（这里需要根据实际 API 调整）
      const response = await userApi.login(values)
      setToken(response.token)
      setUserInfo(response.userInfo)

      Toast.show({
        icon: 'success',
        content: '登录成功',
      })

      // 跳转到首页
      history.push('/')
    } catch (error) {
      console.error('登录失败:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>欢迎登录</h1>
        <p>Umi + Vite H5 模板</p>
      </div>

      <div className={styles.form}>
        <Form
          onFinish={onFinish}
          footer={(
            <Button
              block
              type="submit"
              color="primary"
              size="large"
              loading={loading}
            >
              登录
            </Button>
          )}
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入用户名" clearable />
          </Form.Item>

          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input type="password" placeholder="请输入密码" clearable />
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
