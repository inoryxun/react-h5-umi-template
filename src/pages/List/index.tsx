import { List } from 'antd-mobile'
import styles from './index.less'

export default function ListPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>列表页面</h1>
      </div>

      <div className={styles.content}>
        <List header="示例列表">
          <List.Item>列表项 1</List.Item>
          <List.Item>列表项 2</List.Item>
          <List.Item>列表项 3</List.Item>
          <List.Item>列表项 4</List.Item>
          <List.Item>列表项 5</List.Item>
        </List>
      </div>
    </div>
  )
}
