/**
 * 路由配置文件
 * @description 统一管理应用的路由配置
 */

export default [
  // 基础布局路由 - 包含底部导航的页面
  {
    path: '/',
    component: '@/layouts/BasicLayout',
    routes: [
      { path: '/', component: '@/pages/Home' },
      { path: '/list', component: '@/pages/List' },
      { path: '/user', component: '@/pages/User' },
      { path: '/uno-example', component: '@/pages/UnoExample' },
    ],
  },

  // 空白布局路由 - 登录页面
  {
    path: '/login',
    component: '@/layouts/BlankLayout',
    routes: [
      { path: '/login', component: '@/pages/Login' },
    ],
  },
]
