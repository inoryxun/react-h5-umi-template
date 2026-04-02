import path from 'node:path'
import process from 'node:process'
import { config } from 'dotenv'
import { defineConfig } from 'umi'
import UnoCSS from 'unocss/vite'
import routes from './config/routes'

// 根据 NODE_ENV 加载对应的环境变量文件
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
config({ path: path.resolve(__dirname, envFile) })

export default defineConfig({
  // 启用 Vite 构建
  vite: {
    plugins: [
      UnoCSS(),
    ],
  },

  // 包管理器
  npmClient: 'pnpm',

  // 路由配置（从独立文件导入）
  routes,

  // HTML 配置
  title: 'H5应用',
  metas: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover',
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black-translucent',
    },
  ],

  // 样式配置
  lessLoader: {
    modifyVars: {
      'primary-color': '#1677ff',
    },
  },

  // 开发服务器代理配置
  proxy: {
    ...(process.env.VITE_APP_BASE_API && process.env.VITE_API_BASE_URL
      ? {
          [process.env.VITE_APP_BASE_API]: {
            target: process.env.VITE_API_BASE_URL,
            changeOrigin: true,
            pathRewrite: { [`^${process.env.VITE_APP_BASE_API}`]: '' },
          },
        }
      : {}),
  },
  // 路径别名
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },

  // 构建配置
  esbuildMinifyIIFE: true,
  jsMinifier: 'esbuild',
  cssMinifier: 'esbuild',

  // 代码分割策略
  codeSplitting: {
    jsStrategy: 'granularChunks',
  },

  // 兼容性配置
  targets: {
    ios: 9,
    android: 4.4,
  },
})
