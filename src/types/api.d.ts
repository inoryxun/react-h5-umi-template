/**
 * API 相关类型定义
 */

/** 通用 API 响应数据结构 */
interface ResponseData<T = any> {
  code: number
  data: T
  message: string
  timestamp?: number
}

/** 分页数据结构 */
interface PageData<T = any> {
  list: T[]
  total: number
  pageNum: number
  pageSize: number
}

/** 分页请求参数 */
interface PageParams {
  pageNum: number
  pageSize: number
}
