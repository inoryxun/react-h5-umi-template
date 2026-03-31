import { defineConfig, presetAttributify, presetIcons, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  // 预设
  presets: [
    // 默认预设（包含 Tailwind CSS 兼容的工具类）
    presetUno(),

    // 属性化模式（可选）
    // 允许使用 <div text="red-500 sm:blue-500">
    presetAttributify(),

    // 图标预设
    // 使用方式：<div class="i-carbon-sun" /> 或 <div i-carbon-sun />
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],

  // 转换器
  transformers: [
    // 启用 @apply、@screen 等指令
    transformerDirectives(),

    // 启用变体组简写
    // 例如：hover:(bg-blue-500 text-white) 代替 hover:bg-blue-500 hover:text-white
    transformerVariantGroup(),
  ],

  // 快捷方式
  shortcuts: [
    // 常用组合
    {
      'flex-center': 'flex items-center justify-center',
      'flex-between': 'flex items-center justify-between',
      'flex-col-center': 'flex flex-col items-center justify-center',

      // 按钮样式
      'btn': 'px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 disabled:bg-gray-400',
      'btn-primary': 'btn bg-blue-500 hover:bg-blue-600',
      'btn-danger': 'btn bg-red-500 hover:bg-red-600',
      'btn-success': 'btn bg-green-500 hover:bg-green-600',

      // 卡片
      'card': 'p-4 rounded-lg shadow bg-white',

      // 文本省略
      'text-ellipsis': 'truncate',
      'text-ellipsis-2': 'line-clamp-2',
      'text-ellipsis-3': 'line-clamp-3',
    },
  ],

  // 主题定制
  theme: {
    colors: {
      primary: {
        DEFAULT: '#1677ff',
        light: '#4096ff',
        dark: '#0958d9',
      },
      success: '#00b578',
      warning: '#ff8f1f',
      danger: '#ff3141',
    },
    breakpoints: {
      xs: '320px',
      sm: '375px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },

  // 安全列表（强制包含的工具类）
  safelist: [
    // 动态类名需要添加到安全列表
    // 例如：className={`text-${color}-500`}
  ],

  // 排除的文件
  exclude: [
    'node_modules',
    '.git',
    'dist',
    '.umi',
    '.umi-production',
  ],
})
