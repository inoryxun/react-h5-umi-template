import antfu from '@antfu/eslint-config'

export default antfu({
  // TypeScript 和 React 支持
  typescript: true,
  react: true,

  // UnoCSS 支持
  unocss: true,

  // 格式化配置
  formatters: {
    css: true,
    html: true,
    markdown: 'prettier',
  },

  // 忽略文件
  ignores: [
    '**/dist',
    '**/node_modules',
    '**/.umi',
    '**/.umi-production',
    '**/coverage',
    '**/*.md',
    '.claude/**',
  ],

  // 自定义规则
  rules: {
    // React 相关
    'react/prefer-destructuring-assignment': 'off',
    'react-refresh/only-export-components': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-dom/no-dangerously-set-innerhtml': 'off', // 使用 DOMPurify 净化后安全

    // TypeScript 相关
    'ts/no-explicit-any': 'off', // 通用工具函数允许使用 any
    'ts/no-unused-vars': ['warn', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    }],

    // 通用规则
    'no-console': 'off',
    'unused-imports/no-unused-imports': 'error',
    'antfu/if-newline': 'off',
    'style/brace-style': ['error', '1tbs'],
  },
})
