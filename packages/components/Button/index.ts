import Button from './Button.vue'
import ButtonGroup from './ButtonGroup.vue'
import { withInstall } from '@lxx-ui/utils'

// 将组件转换成插件
export const LxxButton = withInstall(Button)
export const LxxButtonGroup = withInstall(ButtonGroup)
