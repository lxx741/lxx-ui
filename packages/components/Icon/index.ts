// 导入Icon组件
import Icon from './Icon.vue'
// 导入转换组件为插件的方法
import { withInstall } from '@lxx-ui/utils'
// 将组件转换为插件，即给组件添加install方法
export const LxxIcon = withInstall(Icon)
// 导出icon组件的类型定义
export * from './types'
