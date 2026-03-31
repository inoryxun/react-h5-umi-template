module.exports = {
  plugins: {
    'autoprefixer': {
      overrideBrowserslist: [
        'Android >= 4.4',
        'iOS >= 9',
      ],
    },
    'postcss-px-to-viewport-8-plugin': {
      viewportWidth: 375, // 设计稿宽度
      viewportHeight: 667, // 设计稿高度
      unitPrecision: 5, // 转换精度
      viewportUnit: 'vw', // 使用 vw 单位
      selectorBlackList: ['.ignore', '.hairline'], // 不转换的类名
      minPixelValue: 1, // 小于1px不转换
      mediaQuery: false, // 是否转换媒体查询
      exclude: [/node_modules/, /antd-mobile/], // 排除第三方库和 UI 组件库
    },
  },
}
