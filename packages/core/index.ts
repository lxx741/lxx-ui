import { makeInstaller } from '@lxx-ui/utils'
import components from './components'
import '@lxx-ui/theme/index.css'
const installer = makeInstaller(components)

// 分别导出，使用时可以按需导入并注册
export * from '@lxx-ui/components'
// 默认导出，使用时就将所有组件都注册
export default installer
