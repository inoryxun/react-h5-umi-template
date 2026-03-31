import { Button, Card, Toast } from 'antd-mobile'

/**
 * UnoCSS 使用示例页面
 */
export default function UnoExamplePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* 标题区域 */}
      <div className="mb-6 flex-center">
        <h1 className="text-2xl text-gray-800 font-bold">
          UnoCSS 示例
        </h1>
      </div>

      {/* 布局示例 */}
      <div className="mb-4 card">
        <h2 className="mb-4 text-lg font-bold">布局工具类</h2>

        <div className="space-y-3">
          {/* Flex 居中 */}
          <div className="h-20 flex-center rounded bg-blue-100">
            <span className="text-blue-600">flex-center</span>
          </div>

          {/* Flex 两端对齐 */}
          <div className="h-20 flex-between rounded bg-green-100 px-4">
            <span className="text-green-600">左侧</span>
            <span className="text-green-600">右侧</span>
          </div>

          {/* Grid 布局 */}
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="h-16 flex-center rounded bg-purple-100"
              >
                <span className="text-purple-600">{i}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 颜色示例 */}
      <div className="mb-4 card">
        <h2 className="mb-4 text-lg font-bold">颜色系统</h2>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded bg-primary p-3 text-white">
            primary
          </div>
          <div className="rounded bg-success p-3 text-white">
            success
          </div>
          <div className="rounded bg-warning p-3 text-white">
            warning
          </div>
          <div className="rounded bg-danger p-3 text-white">
            danger
          </div>
        </div>
      </div>

      {/* 按钮示例 */}
      <div className="mb-4 card">
        <h2 className="mb-4 text-lg font-bold">按钮快捷方式</h2>

        <div className="space-y-2">
          <button
            className="w-full btn-primary"
            onClick={() => Toast.show('Primary 按钮')}
          >
            Primary 按钮
          </button>
          <button
            className="w-full btn-danger"
            onClick={() => Toast.show('Danger 按钮')}
          >
            Danger 按钮
          </button>
          <button
            className="w-full btn-success"
            onClick={() => Toast.show('Success 按钮')}
          >
            Success 按钮
          </button>
        </div>
      </div>

      {/* 文本省略示例 */}
      <div className="mb-4 card">
        <h2 className="mb-4 text-lg font-bold">文本省略</h2>

        <div className="space-y-3">
          <div>
            <p className="mb-1 text-sm text-gray-500">单行省略：</p>
            <p className="text-ellipsis border rounded p-2">
              这是一段很长的文本，用于演示单行省略效果。当文本超出容器宽度时会自动显示省略号。
            </p>
          </div>

          <div>
            <p className="mb-1 text-sm text-gray-500">两行省略：</p>
            <p className="text-ellipsis-2 border rounded p-2">
              这是一段很长的文本，用于演示多行省略效果。当文本超出指定行数时会自动显示省略号。UnoCSS 让这一切变得非常简单。
            </p>
          </div>
        </div>
      </div>

      {/* 响应式示例 */}
      <div className="mb-4 card">
        <h2 className="mb-4 text-lg font-bold">响应式设计</h2>

        <div className="rounded from-blue-500 to-purple-500 bg-gradient-to-r p-4 text-white">
          <p className="text-sm lg:text-xl md:text-lg sm:text-base">
            调整浏览器窗口大小查看效果
          </p>
          <p className="mt-2 text-xs opacity-80">
            xs: 320px | sm: 375px | md: 768px | lg: 1024px
          </p>
        </div>
      </div>

      {/* 交互效果示例 */}
      <div className="mb-4 card">
        <h2 className="mb-4 text-lg font-bold">交互效果</h2>

        <div className="grid grid-cols-2 gap-3">
          <div className="cursor-pointer rounded bg-blue-500 p-4 text-white transition-all active:scale-95 hover:(scale-105 bg-blue-600)">
            Hover 我
          </div>
          <div className="cursor-pointer rounded bg-purple-500 p-4 text-white transition-all hover:(transform shadow-lg -translate-y-1)">
            Hover 阴影
          </div>
        </div>
      </div>

      {/* 与 antd-mobile 混用 */}
      <Card title="与 antd-mobile 组件混用" className="mb-4">
        <div className="space-y-3">
          <Button
            block
            color="primary"
            className="shadow transition-shadow hover:shadow-lg"
          >
            antd-mobile + UnoCSS
          </Button>

          <div className="flex-between rounded bg-gray-50 p-3">
            <span className="text-gray-600">组件库</span>
            <span className="text-primary font-bold">antd-mobile</span>
          </div>

          <div className="flex-between rounded bg-gray-50 p-3">
            <span className="text-gray-600">原子化 CSS</span>
            <span className="text-purple-600 font-bold">UnoCSS</span>
          </div>
        </div>
      </Card>

      {/* 底部说明 */}
      <div className="py-4 text-center text-sm text-gray-500">
        <p>查看 UNOCSS.md 获取完整使用指南</p>
      </div>
    </div>
  )
}
