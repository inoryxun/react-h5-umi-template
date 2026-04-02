/**
 * HTML 相关工具函数
 */
import DOMPurify from 'dompurify'

/**
 * 净化 HTML 字符串，防止 XSS 攻击
 * 保留安全的标签：加粗、斜体、下划线、换行等
 */
export function sanitizeHTML(html: string): string {
  return DOMPurify.sanitize(html, {
    // 允许的标签
    ALLOWED_TAGS: [
      'b',
      'i',
      'u',
      'strong',
      'em',
      'br',
      'p',
      'span',
      'div',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'ul',
      'ol',
      'li',
      'a',
    ],
    // 允许的属性（只允许安全的属性）
    ALLOWED_ATTR: ['class', 'href', 'target'],
  })
}

/**
 * 安全的渲染 HTML 对象
 * 用于 React 的 dangerouslySetInnerHTML
 */
export function safeHTML(html: string): { __html: string } {
  return { __html: sanitizeHTML(html) }
}
