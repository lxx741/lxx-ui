// 类型
export type AlertType = 'success' | 'info' | 'warning' | 'danger'
// 属性
export interface AlertProps {
  title?: string
  type?: AlertType
  description?: string
  effect?: 'light' | 'dark'
  closable?: boolean
  center?: boolean
  showIcon?: boolean
}
// 触发事件
export interface AlertEmits {
  (e: 'close'): void
}
// 实例方法
export interface AlertInstance {
  open(): void
  close(): void
}
