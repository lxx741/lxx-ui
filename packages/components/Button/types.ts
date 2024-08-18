// 从vue库中引入类型
import type { Component, ComputedRef, Ref } from 'vue'
// 定义按钮的类型
export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
// 定义按钮的原生类型
export type NativeType = 'button' | 'submit' | 'reset'
// 定义按钮的尺寸
export type ButtonSize = 'default' | 'large' | 'small'
// 定义按钮的属性接口
export interface ButtonProps {
  tag?: string | Component // 按钮的标签可能是button或a标签
  type?: ButtonType // 类型
  size?: ButtonSize // 尺寸
  plain?: boolean // 纯文本
  round?: boolean // 圆角
  circle?: boolean // 圆形
  disabled?: boolean // 禁用
  autofocus?: boolean // 自动聚焦
  nativeType?: NativeType // 原生类型
  icon?: string // 图标
  loading?: boolean // 加载中
  loadingIcon?: string // 加载中图标
  useThrottle?: boolean // 节流
  throttleDuration?: number // 节流时间
}
// 定义button组属性接口
export interface ButtonGroupProps {
  size?: ButtonSize
  type?: ButtonType
  disabled?: boolean
}
// 定义button组上下文接口
export interface ButtonGroupContext {
  size?: ButtonSize
  type?: ButtonType
  disabled?: boolean
}
// 定义button事件接口
export interface ButtonEmits {
  (e: 'click', value: MouseEvent): void
}
// 定义button实例
export interface ButtonInstance {
  ref: Ref<HTMLButtonElement | void>
  disabled: ComputedRef<boolean>
  size: ComputedRef<string>
  type: ComputedRef<string>
}
