import path from 'node:path'
import { defineConfig } from 'umi'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  // 启用 Vite 构建
  vite: {
    plugins: [
      UnoCSS(),
    ],
  },

  // 包管理器
  npmClient: 'pnpm',

  // 路由配置
  routes: [
    {
      path: '/',
      component: '@/layouts/BasicLayout',
      routes: [
        { path: '/', component: '@/pages/Home' },
        { path: '/user', component: '@/pages/User' },
        { path: '/uno-example', component: '@/pages/UnoExample' },
      ],
    },
    {
      path: '/login',
      component: '@/layouts/BlankLayout',
      routes: [
        { path: '/login', component: '@/pages/Login' },
      ],
    },
  ],

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
    '/api': {
      target: 'https://dev-api.example.com',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
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
