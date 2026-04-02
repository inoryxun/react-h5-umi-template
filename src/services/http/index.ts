import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import { Toast } from 'antd-mobile'
import axios from 'axios'
import { handleError } from './errorHandler'

/**
 * 创建 axios 实例
 */
const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API || '',
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * 请求拦截器
 */
http.interceptors.request.use(
  (config) => {
    // 从 localStorage 获取 token
    const userStorage = localStorage.getItem('user-storage')
    if (userStorage) {
      try {
        const { state } = JSON.parse(userStorage)
        const token = state?.token
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
      } catch (error) {
        console.error('Failed to parse user storage:', error)
      }
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

/**
 * 响应拦截器
 */
http.interceptors.response.use(
  (response: AxiosResponse<ResponseData>) => {
    const { code, data, message } = response.data

    // 成功响应
    if (code === 200 || code === 0) {
      return data
    }

    // 业务错误
    Toast.show({
      icon: 'fail',
      content: message || '请求失败',
    })

    return Promise.reject(new Error(message || '请求失败'))
  },
  (error) => {
    handleError(error)
    return Promise.reject(error)
  },
)

/**
 * 封装请求方法
 */
export const request = {
  /**
   * GET 请求
   */
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return http.get(url, config)
  },

  /**
   * POST 请求
   */
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return http.post(url, data, config)
  },

  /**
   * PUT 请求
   */
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return http.put(url, data, config)
  },

  /**
   * DELETE 请求
   */
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return http.delete(url, config)
  },

  /**
   * PATCH 请求
   */
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return http.patch(url, data, config)
  },
}

export default http
