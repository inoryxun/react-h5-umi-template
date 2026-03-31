import { Toast } from 'antd-mobile'
import { history } from 'umi'

/**
 * 统一错误处理
 */
export function handleError(error: any) {
  // 请求已发送，服务器返回状态码
  if (error.response) {
    const { status, data } = error.response

    switch (status) {
      case 401:
        Toast.show({ icon: 'fail', content: '登录已过期，请重新登录' })
        // 清除用户信息并跳转登录页
        localStorage.removeItem('user-storage')
        history.push('/login')
        break

      case 403:
        Toast.show({ icon: 'fail', content: '没有权限访问' })
        break

      case 404:
        Toast.show({ icon: 'fail', content: '请求的资源不存在' })
        break

      case 500:
        Toast.show({ icon: 'fail', content: '服务器错误' })
        break

      case 502:
      case 503:
      case 504:
        Toast.show({ icon: 'fail', content: '服务器暂时不可用，请稍后重试' })
        break

      default:
        Toast.show({
          icon: 'fail',
          content: data?.message || '请求失败，请稍后重试',
        })
    }
  }
  // 请求超时
  else if (error.code === 'ECONNABORTED') {
    Toast.show({ icon: 'fail', content: '请求超时，请检查网络' })
  }
  // 网络断开
  else if (!window.navigator.onLine) {
    Toast.show({ icon: 'fail', content: '网络连接已断开' })
  }
  // 其他错误
  else {
    Toast.show({ icon: 'fail', content: error.message || '网络错误，请稍后重试' })
  }
}
